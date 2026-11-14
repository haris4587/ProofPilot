// Strictly read-only. Never creates an account, signs, funds, or submits.
import {createClient} from 'genlayer-js';
import {studionet} from 'genlayer-js/chains';
import {TransactionHashVariant} from 'genlayer-js/types';
import {readFile,writeFile} from 'node:fs/promises';import {createHash} from 'node:crypto';import {Buffer} from 'node:buffer';
const [stage,hash]=process.argv.slice(2);const root='evidence/object-protocol-2026-11-14/';
if(!['deployment','mandate','delivery','dispute','adjudication'].includes(stage)||!/^0x[0-9a-f]{64}$/.test(hash))throw Error('Known stage/hash required');
const address='0xf0EE634ab77Bdc99B7905E227569A5A96b8dd3ff',taskId='pp-object-20261114';
const c=createClient({chain:studionet});const sha=x=>createHash('sha256').update(x).digest('hex');
const json=x=>JSON.stringify(x,(_,v)=>typeof v==='bigint'?v.toString():v,2)+'\n';
const tx=await c.getTransaction({hash});await writeFile(root+stage+'-receipt.json',json(tx));
const row=tx.consensus_data?.leader_receipt;const leader=Array.isArray(row)?row[0]:row;
const status=tx.statusName;const execution=tx.txExecutionResultName||leader?.execution_result;
console.log(JSON.stringify({stage,hash,status,execution,rotations:tx.consensus_max_rotations,from:tx.from_address}));
if(status!=='FINALIZED')process.exit(2);
if(execution!=='SUCCESS')process.exit(3);
if(stage==='deployment'){
 const code=await c.getContractCode(address);const raw=Buffer.from(code);
 if(sha(raw)!=='823be7ee58545c4f84712853265ddc0e094de24b66b8ffd1d5dafb7265e8dd33')throw Error('DEPLOYED SOURCE MISMATCH');
 await writeFile(root+'deployed-source.py',raw);
 const schema=await c.getContractSchema(address);await writeFile(root+'deployed-schema.json',json(schema));
 const count=await c.readContract({address,functionName:'get_count',args:[],transactionHashVariant:TransactionHashVariant.LATEST_FINAL});if(Number(count)!==0)throw Error('Unexpected count');
 console.log(JSON.stringify({sourceHash:sha(raw),sourceBytes:raw.length,finalizedCount:Number(count)}));
}else{
 const raw=await c.readContract({address,functionName:'get_task',args:[taskId],transactionHashVariant:TransactionHashVariant.LATEST_FINAL});const t=JSON.parse(raw);await writeFile(root+stage+'-state.json',raw);
 const expected={mandate:'AGREED',delivery:'DELIVERED',dispute:'DISPUTED',adjudication:'DECIDED'}[stage];
 const plan=JSON.parse(await readFile('evidence/structured-candidate-2026-11-13/authorization.json','utf8'));
 if(t.status!==expected||t.client.toLowerCase()!==plan.owner.toLowerCase()||t.mandateHash!==plan.mandateHash)throw Error('State/owner/mandate mismatch');
 if(stage!=='mandate'&&(t.bundle!==plan.calls[2].args[1]||t.evidenceHash!==plan.evidenceHash||sha(t.bundle)!==plan.evidenceHash))throw Error('Evidence mismatch');
 if(stage==='adjudication'){
  const canonical=x=>JSON.stringify(x&&typeof x==='object'?Array.isArray(x)?x.map(v=>JSON.parse(canonical(v))):Object.fromEntries(Object.keys(x).sort().map(k=>[k,JSON.parse(canonical(x[k]))])):x);
  const receipt={...t.decision};const digest=receipt.decisionHash;delete receipt.decisionHash;if(sha(canonical(receipt))!==digest)throw Error('Decision hash mismatch');
 }
 console.log(JSON.stringify({state:t.status,owner:t.client,mandateHash:t.mandateHash,evidenceHash:t.evidenceHash,decision:t.decision}));
}
