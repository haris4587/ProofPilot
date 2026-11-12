import {bundleSchema,canonical,mandateSchema,sha256,type Mandate} from './domain';
import originalState from '../evidence/heurist-funded-attempt-2026-11-12/finalized-state-before.json';
import receipt from '../evidence/heurist-funded-attempt-2026-11-12/provider-receipt.json';
import sourceChecks from '../evidence/heurist-funded-attempt-2026-11-12/pinned-source-verification.json';
import reviewedBytes from '../evidence/heurist-funded-attempt-2026-11-12/delivery-prepared.json?raw';
export const originalTaskId='pp-b6fafae9-9d2';
export const originalMandateHash='15817685c3278b18b84d040264e0c5313675ff0236c9eaed58f7a61e57b921f4';
export const archiveHash='63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500';
export const responseHash='f28bd1f3b05b34087f1a4bcb798f27b30240088a232608f740575f64151fb544';
export const archiveReceivedAt=receipt.receivedAt;
export const archiveLimitations='Original provider cites [6] but lists only five source URLs. Three bounded excerpts do not establish every claim. Import success proves integrity, not factual acceptance. INCONCLUSIVE remains valid.';
const recoveryNote=' Recovery review: the archived Heurist research was received on 2026-11-12 at 10:53:59.523 UTC before this replacement mandate. Review that prior result; no new agent execution is claimed.';
export function replacementMandate():Mandate{return mandateSchema.parse({...originalState.mandate,deliveryConditions:originalState.mandate.deliveryConditions+recoveryNote});}
export function reviewedArchive(){return reviewedBytes;}
export function reviewedProviderReceipt():Record<string,unknown>{return JSON.parse(JSON.stringify(receipt));}
export async function validateArchivedDelivery(raw:string,mandate:Mandate){
 if(new TextEncoder().encode(raw).length>24000)throw new Error('Import exceeds the 24 KB delivery limit.');
 let value:unknown;try{value=JSON.parse(raw);}catch{throw new Error('Import is not valid JSON.');}
 const bundle=bundleSchema.parse(value);
 if(canonical(bundle)!==raw)throw new Error('Import must contain the exact canonical JSON bytes; whitespace or duplicate keys are not accepted.');
 if(await sha256(raw)!==archiveHash)throw new Error('Import SHA-256 does not match the reviewed authentic archive.');
 const original=mandateSchema.parse(originalState.mandate);
 if(await sha256(canonical(original))!==originalMandateHash)throw new Error('Recorded original mandate integrity failed.');
 const current=canonical(mandateSchema.parse(mandate));
 if(current!==canonical(original)&&current!==canonical(replacementMandate()))throw new Error('The active mandate is incompatible with this archived research.');
 if(await sha256(receipt.rawBody)!==responseHash||receipt.rawSha256!==responseHash||canonical(JSON.parse(receipt.rawBody))!==canonical(receipt.response)||bundle.report!==canonical(receipt.response))throw new Error('Original provider response integrity verification failed.');
 if(receipt.request.input.tool_arguments.search_term!==original.objective||receipt.agentId!=='ExaSearchDigestAgent'||bundle.provenance.rawSha256!==responseHash||bundle.provenance.receivedAt!==archiveReceivedAt)throw new Error('Provider provenance does not match the original mandate.');
 if(bundle.sources.length!==3||bundle.sources.some((s,i)=>s.url!==sourceChecks[i].url||s.sha256!==sourceChecks[i].sha256))throw new Error('Import must preserve all three reviewed commit-pinned sources.');
 return {raw,bundle,hash:archiveHash,limitations:archiveLimitations};
}
export async function verifyArchiveSources(fetcher:typeof fetch=fetch){
 for(const source of sourceChecks){
  const res=await fetcher(source.url,{redirect:'error',signal:AbortSignal.timeout(10000)});
  if(!res.ok||!res.body)throw new Error('A pinned source is unavailable. No transaction was sent.');
  const reader=res.body.getReader();const chunks:Uint8Array[]=[];let size=0;
  try{for(;;){const part=await reader.read();if(part.done)break;size+=part.value.length;if(size>8192)throw new Error('Pinned source exceeds the contract limit.');chunks.push(part.value);}}finally{await reader.cancel();}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(n=>n.toString(16).padStart(2,'0')).join('');
  if(digest!==source.sha256)throw new Error('Pinned source SHA-256 mismatch. No transaction was sent.');
 }
}
