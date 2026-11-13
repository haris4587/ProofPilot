import {transactionsStatusNumberToName,type TransactionHash,type CalldataEncodable} from 'genlayer-js/types';
export const explorer='https://explorer-studio.genlayer.com';
export const contractAddress=import.meta.env.VITE_CONTRACT_ADDRESS || '0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f';
export async function devClient(){
 const [{createAccount,createClient,generatePrivateKey},{studionet}]=await Promise.all([import('genlayer-js'),import('genlayer-js/chains')]);
 let key=sessionStorage.getItem('proofpilot-dev-key') as `0x${string}`|null;
 if(!key){key=generatePrivateKey();sessionStorage.setItem('proofpilot-dev-key',key);}
 const account=createAccount(key);return {account,client:createClient({chain:studionet,account})};
}
export function statusName(t:Record<string,unknown>):string{const raw=t.statusName??t.status;return typeof raw==='number'?(transactionsStatusNumberToName[String(raw) as keyof typeof transactionsStatusNumberToName]||'UNKNOWN'):String(raw||'UNKNOWN');}
export function successful(t:Record<string,unknown>){
 const status=statusName(t);
 const result=t.txExecutionResultName;
 const consensus=t.consensus_data as {leader_receipt?:Array<{execution_result?:string}>|{execution_result?:string}}|undefined;
 const leaders=consensus?.leader_receipt;
 const leader=Array.isArray(leaders)?leaders[0]:leaders;
 return status==='FINALIZED' && (result==='SUCCESS' || leader?.execution_result==='SUCCESS');
}
export async function write(functionName:string,args:CalldataEncodable[],onHash:(hash:string)=>void){
 if(!/^0x[0-9a-fA-F]{40}$/.test(contractAddress))throw new Error('A deployed ProofPilot contract is not configured.');
 const [{client},{TransactionStatus}]=await Promise.all([devClient(),import('genlayer-js/types')]);
 const hash:string=await client.writeContract({address:contractAddress as `0x${string}`,functionName,args,value:0n,leaderOnly:false,consensusMaxRotations:2});
 if(!/^0x[0-9a-fA-F]{64}$/.test(hash))throw new Error('The node did not return a transaction hash.');
 onHash(hash);
 const receipt=await client.waitForTransactionReceipt({hash:hash as TransactionHash,status:TransactionStatus.FINALIZED,interval:4000,retries:25});
 if(!successful(receipt as Record<string,unknown>))throw new Error('Transaction not confirmed as finalized and successful. Keep its hash and inspect Studio before retrying.');
 return receipt;
}
export async function readTask(id:string){
 const [{client},{TransactionHashVariant}]=await Promise.all([devClient(),import('genlayer-js/types')]);
 const result=await client.readContract({address:contractAddress as `0x${string}`,functionName:'get_task',args:[id],transactionHashVariant:TransactionHashVariant.LATEST_FINAL});
 if(typeof result!=='string')throw new Error('Unexpected task response.');return JSON.parse(result) as Record<string,unknown>;
}
export async function inspect(hash:string){
 if(!/^0x[0-9a-fA-F]{64}$/.test(hash))throw new Error('Invalid transaction hash.');
 const {client}=await devClient();return client.getTransaction({hash:hash as TransactionHash});
}

export function receiptStatus(t:Record<string,unknown>):string{
 if(successful(t))return 'FINALIZED · SUCCESS';
 const status=statusName(t);
 if(status!=='FINALIZED')return status;
 const data=t.consensus_data as {leader_receipt?:Array<{execution_result?:string}>|{execution_result?:string}}|undefined;
 const rows=data?.leader_receipt;const leader=Array.isArray(rows)?rows[0]:rows;
 return leader?.execution_result==='ERROR'?'FINALIZED · EXECUTION ERROR':'FINALIZED · EXECUTION UNVERIFIED';
}
