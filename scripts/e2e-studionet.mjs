// Single gasless contract verification run. Never exports or writes the ephemeral key.
import {createAccount,createClient} from 'genlayer-js';
import {studionet} from 'genlayer-js/chains';
import {TransactionStatus,TransactionHashVariant,transactionsStatusNumberToName} from 'genlayer-js/types';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const address='0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f';
const pin=process.env.EVIDENCE_COMMIT;
if(!pin||!/^[a-f0-9]{40}$/.test(pin))throw Error('Set EVIDENCE_COMMIT to the existing source snapshot commit.');
const canonical=v=>v===null||typeof v!=='object'?JSON.stringify(v).replace(/[\u007f-\uffff]/g,c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0')):Array.isArray(v)?'['+v.map(canonical).join(',')+']':'{'+Object.keys(v).sort().map(k=>canonical(k)+':'+canonical(v[k])).join(',')+'}';
const hash=s=>createHash('sha256').update(s).digest('hex');
const serialize=v=>JSON.stringify(v,(_,v)=>typeof v==='bigint'?v.toString():v,2);
const account=createAccount();const client=createClient({chain:studionet,account});
const synthetic=process.env.PROOFPILOT_NETWORK_PROFILE==='synthetic';
const taskId=(synthetic?'synthetic-e2e-':'aave-e2e-')+Date.now().toString(36);const dir=synthetic?'evidence/e2e/network-synthetic':'evidence/e2e/network';await mkdir(dir,{recursive:true});
const mandate=JSON.parse(await readFile(synthetic?'evidence/smoke-mandate.json':'evidence/e2e/exports/offline-mandate.json','utf8'));
const files=synthetic?['demolend-source.txt']:['aave-borrowing.txt','aave-health.txt','chainlink-money-markets.txt'];
const fixtureDir=synthetic?'fixtures':'fixtures/aave-v3';
const sources=await Promise.all(files.map(async name=>({url:`https://raw.githubusercontent.com/haris4587/ProofPilot/${pin}/${fixtureDir}/${name}`,sha256:hash(await readFile(fixtureDir+'/'+name))})));
const bundle={report:await readFile(synthetic?'fixtures/demolend-report.txt':'fixtures/aave-v3/local-report.txt','utf8'),sources,provenance:{mode:'local-research-contract-test',provider:'Locally authored test report; not Heurist',sourceCommit:pin}};
const m=canonical(mandate),b=canonical(bundle);await writeFile(dir+'/mandate.json',m);await writeFile(dir+'/delivery.json',b);
const record={network:'studionet',chainId:61999,contractAddress:address,taskId,sender:account.address,mode:'real-network-local-research-fixture',heuristExecution:false,sourceCommit:pin,mandateHash:hash(m),evidenceHash:hash(b),transactions:[]};
const persist=()=>writeFile(dir+'/run.json',serialize(record));await persist();
function statusName(r){return r.statusName||(typeof r.status==='number'?transactionsStatusNumberToName[r.status]:r.status);}
function success(r){const leaders=r.consensus_data?.leader_receipt;const leader=Array.isArray(leaders)?leaders[0]:leaders;return statusName(r)==='FINALIZED'&&(r.txExecutionResultName==='SUCCESS'||leader?.execution_result==='SUCCESS');}
async function send(method,args){
 const id=await client.writeContract({address,functionName:method,args,value:0n,leaderOnly:false,consensusMaxRotations:2});
 const row={method,hash:id,status:'BROADCAST',explorer:`https://explorer-studio.genlayer.com/transactions/${id}`};record.transactions.push(row);await persist();console.log(JSON.stringify(row));
 const receipt=await client.waitForTransactionReceipt({hash:id,status:TransactionStatus.FINALIZED,interval:5000,retries:36});
 await writeFile(dir+'/'+method+'-receipt.json',serialize(receipt));row.status=String(statusName(receipt));row.executionVerified=success(receipt);await persist();console.log(JSON.stringify(row));
 if(!row.executionVerified)throw Error('Execution success could not be verified; inspect the saved receipt before any retry.');
 const state=await client.readContract({address,functionName:'get_task',args:[taskId],transactionHashVariant:TransactionHashVariant.LATEST_FINAL});
 await writeFile(dir+'/'+method+'-state.json',String(state));return JSON.parse(String(state));
}
try{
 await send('create_assignment',[taskId,m,hash(m)]);
 await send('submit_delivery',[taskId,b,hash(b)]);
 await send('open_dispute',[taskId,'Review the submitted report against the original locked mandate and require evidence-backed consensus.']);
 const state=await send('adjudicate',[taskId]);record.finalizedState=state;record.verdict=state.decision?.decision?.outcome;await writeFile(dir+'/adjudication-receipt.json',serialize(state.decision));await persist();console.log(JSON.stringify({taskId,verdict:record.verdict,status:state.status,decisionHash:state.decision?.decisionHash}));
}catch(e){record.error=e.shortMessage||e.message;await persist();console.log(JSON.stringify({taskId,error:record.error}));process.exitCode=1;}
