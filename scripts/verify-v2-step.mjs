// Read-only receipt/state verification. Never signs or submits transactions.
import {createClient} from 'genlayer-js';
import {studionet} from 'genlayer-js/chains';
import {TransactionHashVariant} from 'genlayer-js/types';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const [stage,hash]=process.argv.slice(2);
if(!['mandate','delivery','dispute','adjudication'].includes(stage)||!/^0x[0-9a-f]{64}$/.test(hash))throw Error('Expected stage and known transaction hash');
const address='0x8d64250Eb8c3Eafb8628482d2381799189055a90', taskId='pp-v2-review-18ec1e64ccb747d8';
const c=createClient({chain:studionet});
const r=await c.getTransaction({hash});
const stringify=v=>JSON.stringify(v,(_,x)=>typeof x==='bigint'?x.toString():x,2)+'\n';
const root='evidence/v2-lifecycle-2026-11-13/';
await writeFile(root+stage+'-receipt.json',stringify(r));
const leader=r.consensus_data?.leader_receipt?.[0];
console.log(JSON.stringify({stage,hash,status:r.statusName,execution:leader?.execution_result,result:r.result_name}));
if(r.statusName!=='FINALIZED')process.exit(2);
const raw=await c.readContract({address,functionName:'get_task',args:[taskId],transactionHashVariant:TransactionHashVariant.LATEST_FINAL});
const t=JSON.parse(raw);await writeFile(root+stage+'-state.json',raw);
console.log(JSON.stringify({state:t.status,owner:t.client,mandateHash:t.mandateHash,evidenceHash:t.evidenceHash,decision:t.decision}));
if(leader?.execution_result!=='SUCCESS')process.exit(3);
if(t.client.toLowerCase()!=='0x67Da51Fd9AC1d52F34F5d01d06da8548979fC514'.toLowerCase()||t.mandateHash!=='ea0c7ee8300f76a9eee5a06794a5c393c79b734c8945a872b4d78f88ba580c73')throw Error('Mandate/owner mismatch');
if(t.status!=={mandate:'AGREED',delivery:'DELIVERED',dispute:'DISPUTED',adjudication:'DECIDED'}[stage])throw Error('Unexpected finalized state');
const sha=s=>createHash('sha256').update(s).digest('hex');
if(stage!=='mandate'){
const bundle=await readFile('evidence/heurist-funded-attempt-2026-11-12/delivery-prepared.json','utf8');
if(t.bundle!==bundle||t.evidenceHash!==sha(bundle)||t.evidenceHash!=='63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500')throw Error('Evidence bytes/hash mismatch');
}
if(stage==='adjudication'){
const d={...t.decision};const h=d.decisionHash;delete d.decisionHash;
const canonical=x=>JSON.stringify(x&&typeof x==='object'?Array.isArray(x)?x.map(y=>JSON.parse(canonical(y))):Object.fromEntries(Object.keys(x).sort().map(k=>[k,JSON.parse(canonical(x[k]))])):x);
if(sha(canonical(d))!==h)throw Error('Decision hash mismatch');
const audit=await c.readContract({address,functionName:'get_audit',args:[3],transactionHashVariant:TransactionHashVariant.LATEST_FINAL});await writeFile(root+'final-audit.json',audit);
}
console.log('VERIFIED FINALIZED SUCCESS AND EXPECTED STATE');process.exit(0);
