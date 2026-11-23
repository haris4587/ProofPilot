import {z} from 'zod';
import {bundleSchema,canonical,mandateSchema,sha256} from './domain';

// This reader is deliberately bound to the existing V4 deployment, independently
// of the historical workflow's VITE_CONTRACT_ADDRESS write configuration.
export const auditContract='0xf0EE634ab77Bdc99B7905E227569A5A96b8dd3ff' as const;
export const auditTaskId='pp-object-20261114';
export const MAX_PACKET_BYTES=131072;
export const MAX_AUDIT_READS=32;
const hash=z.string().regex(/^[a-f0-9]{64}$/);
const optionalHash=z.union([hash,z.literal('')]);
const taskIdSchema=z.string().regex(/^[A-Za-z0-9_-]{3,64}$/);
const phase=z.enum(['AGREED','DELIVERED','DISPUTED','DECIDED']);
const taskSchema=z.object({client:z.string().regex(/^0x[a-fA-F0-9]{40}$/),mandate:mandateSchema,
 mandateHash:hash,status:phase,evidenceHash:optionalHash,bundle:z.string().max(24000),
 dispute:z.string().max(600),decision:z.record(z.string(),z.unknown()),auditHead:hash}).strict();
const eventSchema=z.object({taskId:taskIdSchema,action:phase,sequence:z.number().int().min(0),
 previousHash:optionalHash,stateHash:hash,hash}).strict();
export type AuditTask=z.infer<typeof taskSchema>;
export type AuditEvent=z.infer<typeof eventSchema>;
const packetSchema=z.object({version:z.literal('proofpilot/audit-packet/1'),chainId:z.literal(61999),
 contract:z.string().refine(v=>v.toLowerCase()===auditContract.toLowerCase(),'Unexpected contract'),
 taskId:taskIdSchema,task:taskSchema,auditEvents:z.array(eventSchema).max(MAX_AUDIT_READS),packetHash:hash}).strict();
export type AuditPacket=z.infer<typeof packetSchema>;
export type AuditCheck={label:string;ok:boolean;detail:string};
export type AuditResult={checks:AuditCheck[];integrity:boolean;verdict:string|null};

function byteSize(text:string){return new TextEncoder().encode(text).length;}
export function parseTask(value:unknown):AuditTask{
 if(typeof value==='string'){
  if(byteSize(value)>65536)throw new Error('Task response exceeds 64 KiB.');
  value=JSON.parse(value);
 }
 return taskSchema.parse(value);
}
export async function makePacket(taskId:string,task:unknown,auditEvents:unknown[]):Promise<AuditPacket>{
 const content={version:'proofpilot/audit-packet/1' as const,chainId:61999 as const,contract:auditContract,
  taskId:taskIdSchema.parse(taskId),task:parseTask(task),auditEvents:z.array(eventSchema).max(MAX_AUDIT_READS).parse(auditEvents)};
 return {...content,packetHash:await sha256(canonical(content))};
}
export async function parsePacket(raw:string):Promise<AuditPacket>{
 if(byteSize(raw)>MAX_PACKET_BYTES)throw new Error('Review packet exceeds 128 KiB.');
 const packet=packetSchema.parse(JSON.parse(raw));
 const {packetHash,...content}=packet;
 if(await sha256(canonical(content))!==packetHash)throw new Error('Review packet hash mismatch. The file changed.');
 return packet;
}

export async function verifyPacket(packet:AuditPacket):Promise<AuditResult>{
 // Recheck the envelope even when called directly rather than through the importer.
 packet=await parsePacket(canonical(packet));
 const t=packet.task;const checks:AuditCheck[]=[];
 const check=(label:string,ok:boolean,detail:string)=>checks.push({label,ok,detail});
 check('Mandate commitment',await sha256(canonical(t.mandate))===t.mandateHash,'SHA-256 of the canonical locked mandate.');
 check('Nine locked criteria',t.mandate.requiredFacts.length+t.mandate.rubric.length+1===9,'V4 requires exactly nine criteria.');
 let deliveryOK=false;
 try{
  if(t.status==='AGREED')deliveryOK=t.bundle===''&&t.evidenceHash==='';
  else{
   const b=bundleSchema.parse(JSON.parse(t.bundle));
   deliveryOK=canonical(b)===t.bundle&&await sha256(t.bundle)===t.evidenceHash;
  }
 }catch{/* Invalid bundle remains a failed check. */}
 check('Delivery commitment',deliveryOK,t.status==='AGREED'?'No delivery is committed at this phase.':'Exact canonical delivery bytes match the locked SHA-256.');
 check('Lifecycle consistency',t.status==='AGREED'||t.status==='DELIVERED'?t.dispute==='':t.dispute.length>=10,'Dispute text agrees with the recorded phase.');
 const events=packet.auditEvents;
 let links=events.length>0,previous='',sequence=-1;
 const expected=['AGREED','DELIVERED','DISPUTED','DECIDED'];
 for(let i=0;i<events.length;i++){
  const event=events[i];const {hash:eventHash,...body}=event;
  if(event.taskId!==packet.taskId||event.previousHash!==previous||event.sequence<=sequence||event.action!==expected[i]||await sha256(canonical(body))!==eventHash)links=false;
  previous=event.hash;sequence=event.sequence;
 }
 const last=events.at(-1);
 links=links&&events.length===expected.indexOf(t.status)+1&&last?.hash===t.auditHead&&last?.action===t.status;
 check('Complete audit linkage',links,'Events must start at AGREED, link in order and end at this task’s audit head. Gaps fail verification.');
 const stateHashOK=!!last&&await sha256(canonical({...t,auditHead:last.previousHash}))===last.stateHash;
 check('Latest state binding',stateHashOK,'Reconstructs the contract’s pre-save state hash for the final event.');
 let verdict:string|null=null,decisionOK=false;
 if(t.status!=='DECIDED')decisionOK=Object.keys(t.decision).length===0;
 else{
  const d=t.decision;const inner=d.decision;
  if(inner&&typeof inner==='object'&&!Array.isArray(inner)){
   const result=inner as Record<string,unknown>;
   const {decisionHash,...body}=d;
   const outcome=result.outcome;
   decisionOK=typeof decisionHash==='string'&&decisionHash===await sha256(canonical(body))&&
    d.taskId===packet.taskId&&d.mandateHash===t.mandateHash&&d.evidenceHash===t.evidenceHash&&
    d.previousHash===last?.previousHash&&Array.isArray(d.reviewedActionIds)&&canonical(d.reviewedActionIds)===canonical([t.evidenceHash])&&
    typeof outcome==='string'&&['ACCEPTED','REJECTED','INCONCLUSIVE'].includes(outcome)&&
    d.reviewDecision===({ACCEPTED:'continue',REJECTED:'warn',INCONCLUSIVE:'escalate'} as Record<string,string>)[String(outcome)];
   if(decisionOK)verdict=String(outcome);
  }
 }
 check('Decision receipt',decisionOK,t.status==='DECIDED'?'Checks the decision hash, task, commitments, prior audit head and routing.':'No verdict is inferred from a disputed or unfinished task.');
 const integrity=checks.every(c=>c.ok);
 return {checks,integrity,verdict:integrity?verdict:null};
}

export type ReadView=(method:'get_task'|'get_audit',args:(string|number)[])=>Promise<unknown>;
export async function collectPacket(taskId:string,read:ReadView):Promise<AuditPacket>{
 taskIdSchema.parse(taskId);
 const task=parseTask(await read('get_task',[taskId]));
 const events:AuditEvent[]=[];
 // Global sequence numbers may interleave other tasks. Read a bounded prefix;
 // incomplete history is reported as incomplete, never silently "verified".
 for(let i=0;i<MAX_AUDIT_READS;i++){
  let raw:unknown;
  try{raw=await read('get_audit',[i]);}catch{break;}
  if(typeof raw==='string'&&byteSize(raw)>4096)throw new Error('Audit event exceeds 4 KiB.');
  const event=eventSchema.parse(typeof raw==='string'?JSON.parse(raw):raw);
  if(event.sequence!==i)throw new Error('Audit sequence differs from requested index.');
  if(event.taskId===taskId){events.push(event);if(event.hash===task.auditHead)break;}
 }
 return makePacket(taskId,task,events);
}

export async function readAuditPacket(taskId:string):Promise<AuditPacket>{
 const [{createClient},{studionet},{TransactionHashVariant}]=await Promise.all([import('genlayer-js'),import('genlayer-js/chains'),import('genlayer-js/types')]);
 const client=createClient({chain:studionet});
 const read:ReadView=(functionName,args)=>client.readContract({address:auditContract,functionName,args,transactionHashVariant:TransactionHashVariant.LATEST_FINAL});
 let timer:ReturnType<typeof setTimeout>|undefined;
 try{return await Promise.race([collectPacket(taskId,read),new Promise<never>((_,reject)=>{timer=setTimeout(()=>reject(new Error('Public finalized read timed out. No live verification is claimed.')),25000);})]);}
 finally{if(timer)clearTimeout(timer);}
}

export function comparePackets(before:AuditPacket,after:AuditPacket){
 if(before.taskId!==after.taskId||before.contract.toLowerCase()!==after.contract.toLowerCase()||before.chainId!==after.chainId)throw new Error('Compare two snapshots of the same task and deployment.');
 const keys=['client','status','mandateHash','evidenceHash','bundle','dispute','auditHead','decision'] as const;
 return keys.map(field=>({field,changed:canonical(before.task[field])!==canonical(after.task[field]),
  before:field==='bundle'?before.task.evidenceHash:canonical(before.task[field]),after:field==='bundle'?after.task.evidenceHash:canonical(after.task[field])}));
}
