// Public finalized reads only. No account, key, signing or transaction submission.
// Run after npm ci: npx --no-install vite-node scripts/verify-audit-live.ts [task-id]
import {auditTaskId,readAuditPacket,verifyPacket} from '../src/auditDesk';
try{
 const packet=await readAuditPacket(process.argv[2]||auditTaskId);
 const result=await verifyPacket(packet);
 console.log(JSON.stringify({checkedAt:new Date().toISOString(),source:'public latest-final reads',
  chainId:packet.chainId,contract:packet.contract,taskId:packet.taskId,status:packet.task.status,
  packetHash:packet.packetHash,auditHead:packet.task.auditHead,auditEvents:packet.auditEvents.length,
  ...result},null,2));
 process.exitCode=result.integrity?0:1;
}catch(error){console.error(error instanceof Error?error.message:'Public verification failed');process.exitCode=1;}
