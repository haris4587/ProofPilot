import {describe,it,expect} from 'vitest';
import mandate from '../evidence/object-protocol-2026-11-14/mandate-state.json';
import delivered from '../evidence/object-protocol-2026-11-14/delivery-state.json';
import disputed from '../evidence/object-protocol-2026-11-14/dispute-state.json';
import {canonical,sha256} from '../src/domain';
import {auditContract,auditTaskId,collectPacket,comparePackets,makePacket,MAX_AUDIT_READS,MAX_PACKET_BYTES,parsePacket,verifyPacket,type AuditEvent,type AuditPacket} from '../src/auditDesk';

async function fixture(states:unknown[]=[mandate,delivered,disputed]){
 const events:AuditEvent[]=[];let previous='';
 for(let i=0;i<states.length;i++){
  const task=states[i] as typeof disputed;
  const body={taskId:auditTaskId,action:task.status as AuditEvent['action'],sequence:i,previousHash:previous,stateHash:await sha256(canonical({...task,auditHead:previous}))};
  previous=await sha256(canonical(body));events.push({...body,hash:previous});
 }
 return makePacket(auditTaskId,states.at(-1),events);
}
async function rehash(packet:AuditPacket){return makePacket(packet.taskId,packet.task,packet.auditEvents);}
describe('review packets and contract-bound audit verification',()=>{
 it('verifies the actual archived three-event chain without inventing a verdict',async()=>{
  const packet=await fixture();const result=await verifyPacket(packet);
  expect(packet.task.auditHead).toBe(disputed.auditHead);expect(result.integrity).toBe(true);expect(result.verdict).toBeNull();
  expect(result.checks.every(c=>c.ok)).toBe(true);
 });
 it('exports and imports a deterministic packet without accepting claimed verification labels',async()=>{
  const packet=await fixture();expect(await parsePacket(JSON.stringify(packet,null,2))).toEqual(packet);
  await expect(parsePacket(JSON.stringify({...packet,verified:true}))).rejects.toThrow();
  expect((await fixture()).packetHash).toBe(packet.packetHash);
 });
 it('rejects edited bytes retaining the old envelope hash',async()=>{
  const packet=await fixture();packet.task.dispute='Replaced dispute';
  await expect(parsePacket(canonical(packet))).rejects.toThrow('hash mismatch');
 });
 it.each(['mandate','bundle','evidenceHash','client','dispute'] as const)('detects edited %s even if attacker recalculates the packet hash',async field=>{
  const packet=await fixture();
  if(field==='mandate')packet.task.mandate.objective='Injected replacement objective';
  else if(field==='bundle')packet.task.bundle=packet.task.bundle.replace('Aave','FAKE');
  else if(field==='evidenceHash')packet.task.evidenceHash='0'.repeat(64);
  else if(field==='client')packet.task.client='0x'+'1'.repeat(40);
  else packet.task.dispute='Replaced dispute';
  expect((await verifyPacket(await rehash(packet))).integrity).toBe(false);
 });
 it('does not accept an incomplete audit prefix or an altered event',async()=>{
  for(const mutation of ['drop','hash','order','duplicate'] as const){
   const packet=await fixture();
   if(mutation==='drop')packet.auditEvents.shift();
   if(mutation==='hash')packet.auditEvents[0].stateHash='0'.repeat(64);
   if(mutation==='order')packet.auditEvents.reverse();
   if(mutation==='duplicate')packet.auditEvents.push(packet.auditEvents[2]);
   expect((await verifyPacket(await rehash(packet))).integrity).toBe(false);
  }
 });
 it('never treats a nonterminal decision as a successful verdict',async()=>{
  const packet=await fixture();packet.task.decision={outcome:'ACCEPTED'};
  const result=await verifyPacket(await rehash(packet));expect(result.integrity).toBe(false);expect(result.verdict).toBeNull();
 });
 it('binds a synthetic terminal receipt to task, commitments and audit head',async()=>{
  // Synthetic terminal record; the real archived task remains DISPUTED.
  const packet=await fixture();const task=packet.task;
  const body={taskId:auditTaskId,mandateHash:task.mandateHash,evidenceHash:task.evidenceHash,
   previousHash:task.auditHead,reviewedActionIds:[task.evidenceHash],reviewDecision:'escalate',decision:{outcome:'INCONCLUSIVE'}};
  task.decision={...body,decisionHash:await sha256(canonical(body))};task.status='DECIDED';
  const event={taskId:auditTaskId,action:'DECIDED' as const,sequence:3,previousHash:task.auditHead,stateHash:await sha256(canonical(task))};
  task.auditHead=await sha256(canonical(event));packet.auditEvents.push({...event,hash:task.auditHead});
  expect((await verifyPacket(await rehash(packet))).verdict).toBe('INCONCLUSIVE');
  task.decision.decisionHash='0'.repeat(64);
  expect((await verifyPacket(await rehash(packet))).verdict).toBeNull();
 });
 it('rejects oversized, malformed and wrong-deployment packets',async()=>{
  await expect(parsePacket(' '.repeat(MAX_PACKET_BYTES+1))).rejects.toThrow('128 KiB');
  await expect(parsePacket('{broken')).rejects.toThrow();
  const packet=await fixture();packet.contract='0x'+'1'.repeat(40);
  await expect(parsePacket(canonical(packet))).rejects.toThrow();
 });
 it('reads only views, stops at the matching head and validates task IDs before reading',async()=>{
  const packet=await fixture();const calls:string[]=[];
  const collected=await collectPacket(auditTaskId,async(method,args)=>{calls.push(method);return canonical(method==='get_task'?packet.task:packet.auditEvents[Number(args[0])]);});
  expect(collected).toEqual(packet);expect(calls).toEqual(['get_task','get_audit','get_audit','get_audit']);
  await expect(collectPacket('../bad',async()=>{throw new Error('Must not run');})).rejects.toThrow();
 });
 it('fails incomplete when RPC audit reads fail, rather than presenting authenticity',async()=>{
  const packet=await fixture();
  const result=await collectPacket(auditTaskId,async method=>{if(method==='get_task')return canonical(packet.task);throw new Error('Network error');});
  expect((await verifyPacket(result)).integrity).toBe(false);
 });
 it('bounds global scans and permits valid interleaved task sequences',async()=>{
  const packet=await fixture();let reads=0;
  const collected=await collectPacket(auditTaskId,async(method,args)=>{
   if(method==='get_task')return canonical(packet.task);
   reads++;return canonical({...packet.auditEvents[0],taskId:'another-task',sequence:args[0]});
  });
  expect(reads).toBe(MAX_AUDIT_READS);expect((await verifyPacket(collected)).integrity).toBe(false);
  const interleaved=await fixture();let previous='';
  for(const [index,event] of interleaved.auditEvents.entries()){
   event.sequence=event.sequence*2;event.previousHash=previous;
   event.stateHash=await sha256(canonical({...([mandate,delivered,disputed][index]),auditHead:previous}));
   const {hash:unused,...body}=event;void unused;
   event.hash=await sha256(canonical(body));previous=event.hash;
  }
  interleaved.task.auditHead=previous;
  expect((await verifyPacket(await rehash(interleaved))).integrity).toBe(true);
 });
 it('compares snapshots and refuses cross-task comparisons',async()=>{
  const before=await fixture([mandate]);const after=await fixture();
  expect(comparePackets(before,after).find(c=>c.field==='status')).toMatchObject({changed:true,before:'"AGREED"',after:'"DISPUTED"'});
  expect(comparePackets(after,after).every(c=>!c.changed)).toBe(true);
  expect(()=>comparePackets(before,{...after,taskId:'different-task'})).toThrow('same task');
  expect(auditContract).toBe('0xf0EE634ab77Bdc99B7905E227569A5A96b8dd3ff');
 });
});
