import {createAccount,createClient,generatePrivateKey} from 'genlayer-js';
import {studionet} from 'genlayer-js/chains';
import {TransactionStatus,TransactionHashVariant,type TransactionHash,type CalldataEncodable} from 'genlayer-js/types';
export const explorer='https://explorer-studio.genlayer.com';
export const contractAddress=import.meta.env.VITE_CONTRACT_ADDRESS || '';
export function devClient(){
 let key=sessionStorage.getItem('proofpilot-dev-key') as `0x${string}`|null;
 if(!key){key=generatePrivateKey();sessionStorage.setItem('proofpilot-dev-key',key);}
 const account=createAccount(key);return {account,client:createClient({chain:studionet,account})};
}
export function successful(t:Record<string,unknown>){
 const status=t.statusName||t.status;
 const result=t.txExecutionResultName;
 // Stable 1.1.8 Studio receipts carry SUCCESS in the leader receipt.
 const consensus=t.consensus_data as {leader_receipt?:Array<{execution_result?:string}>}|undefined;
 const leader=consensus?.leader_receipt?.[0];
 return status==='FINALIZED' && (result==='SUCCESS' || leader?.execution_result==='SUCCESS');
}
export async function write(functionName:string,args:CalldataEncodable[],onHash:(hash:string)=>void){
 if(!/^0x[0-9a-fA-F]{40}$/.test(contractAddress))throw new Error('A deployed ProofPilot contract is not configured.');
 const {client}=devClient();
 const hash:string=await client.writeContract({address:contractAddress as `0x${string}`,functionName,args,value:0n,leaderOnly:false,consensusMaxRotations:2});
 if(!/^0x[0-9a-fA-F]{64}$/.test(hash))throw new Error('The node did not return a transaction hash.');
 onHash(hash);
 const receipt=await client.waitForTransactionReceipt({hash:hash as TransactionHash,status:TransactionStatus.FINALIZED,interval:4000,retries:25});
 if(!successful(receipt as Record<string,unknown>))throw new Error('Transaction not confirmed as finalized and successful. Keep its hash and inspect Studio before retrying.');
 return receipt;
}
export async function readTask(id:string){const {client}=devClient();const result=await client.readContract({address:contractAddress as `0x${string}`,functionName:'get_task',args:[id],transactionHashVariant:TransactionHashVariant.LATEST_FINAL});if(typeof result!=='string')throw new Error('Unexpected task response.');return JSON.parse(result);}
