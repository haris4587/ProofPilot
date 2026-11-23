import {useState} from 'react';
import {Download,Search,ShieldCheck,Upload,GitCompareArrows} from 'lucide-react';
import archivedState from '../evidence/object-protocol-2026-11-14/adjudication-state.json';
import {auditContract,auditTaskId,MAX_PACKET_BYTES,comparePackets,makePacket,parsePacket,readAuditPacket,verifyPacket,type AuditPacket,type AuditResult} from './auditDesk';
import {canonical,download,sha256} from './domain';
import {explorer} from './chain';

type Reviewed={packet:AuditPacket;result:AuditResult;source:'Imported file'|'Archived snapshot'|'Live finalized read'};
export default function AuditDesk(){
 const [id,setId]=useState(auditTaskId);const [busy,setBusy]=useState(false);const [error,setError]=useState('');
 const [current,setCurrent]=useState<Reviewed>();const [baseline,setBaseline]=useState<Reviewed>();
 const [comparison,setComparison]=useState<ReturnType<typeof comparePackets>>();
 const [liveMatch,setLiveMatch]=useState('');
 const run=async(action:()=>Promise<void>)=>{setBusy(true);setError('');try{await action();}catch(e){setError(e instanceof Error?e.message:'Verification failed.');}finally{setBusy(false);}};
 const load=async(packet:AuditPacket,source:Reviewed['source'])=>{
  const result=await verifyPacket(packet);setCurrent({packet,result,source});setComparison(undefined);setLiveMatch('');
 };
 const archive=()=>run(async()=>{
  const events=await Promise.all([
   import('../evidence/object-protocol-2026-11-14/mandate-state.json'),
   import('../evidence/object-protocol-2026-11-14/delivery-state.json'),
   import('../evidence/object-protocol-2026-11-14/dispute-state.json'),
  ]);
  // Reconstruct each event from its historical pre/post state, then verify the
  // resulting chain against the recorded final head. This is an archive, not RPC.
  let previous='';const audits=[];
  for(let i=0;i<events.length;i++){
   const task=events[i].default;
   const body={taskId:auditTaskId,action:task.status,sequence:i,previousHash:previous,stateHash:await sha256(canonical({...task,auditHead:previous}))};
   const hash=await sha256(canonical(body));audits.push({...body,hash});previous=hash;
  }
  await load(await makePacket(auditTaskId,archivedState,audits),'Archived snapshot');setId(auditTaskId);
 });
 const read=()=>run(async()=>{await load(await readAuditPacket(id.trim()),'Live finalized read');});
 const importFile=(file:File|undefined)=>run(async()=>{
  if(!file)return;
  if(file.size>MAX_PACKET_BYTES)throw new Error('Review packet exceeds 128 KiB.');
  const packet=await parsePacket(await file.text());await load(packet,'Imported file');setId(packet.taskId);
 });
 const verifyLive=()=>run(async()=>{
  if(!current)return;
  setLiveMatch('');
  const packet=await readAuditPacket(current.packet.taskId);const result=await verifyPacket(packet);
  const matches=result.integrity&&current.result.integrity&&canonical(packet)===canonical(current.packet);
  setLiveMatch(matches?'Snapshot matches live finalized state and complete audit history.':'Snapshot does not match a fully verified live finalized record. No authenticity claim is made.');
 });
 const compare=()=>run(async()=>{if(current&&baseline)setComparison(comparePackets(baseline.packet,current.packet));});
 return <section className="audit-desk" aria-label="Audit Desk">
  <div className="page-heading"><div><p className="eyebrow">MILESTONE V1 · PUBLIC REVIEW TOOLS</p><h1>Audit Desk</h1><p className="muted">Inspect commitments, audit history and snapshot changes.</p></div></div>
  <section className="panel audit-panel">
   <h2>Review an existing task</h2><p>No wallet or credentials required. This desk only reads the existing Studionet deployment.</p>
   <a className="audit-address" href={`${explorer}/address/${auditContract}`} target="_blank" rel="noreferrer">{auditContract}</a>
   <div className="audit-search"><label>Task ID<input value={id} onChange={e=>setId(e.target.value)} maxLength={64}/></label><button className="button primary" disabled={busy||!id.trim()} onClick={()=>void read()}><Search size={15}/>Read finalized task</button></div>
   <div className="button-row"><button className="button secondary" disabled={busy} onClick={()=>void archive()}>Load archived review</button><label className="button secondary audit-upload"><Upload size={15}/>Import review packet<input type="file" accept="application/json,.json" disabled={busy} aria-label="Import review packet" onChange={e=>{void importFile(e.target.files?.[0]);e.target.value='';}}/></label></div>
   <p className="help">Imported and archived records prove internal integrity only. A packet hash is not a signature. Use “Compare with live finalized state” to check a snapshot against public RPC. At most 32 global audit entries are read; incomplete histories fail verification.</p>
  </section>
  {busy&&<p role="status">Checking review evidence…</p>}{error&&<p className="feedback error" role="alert">{error}</p>}
  {current&&<section className="panel audit-panel" aria-label="Review verification results">
   <div className="audit-heading"><div><p className="eyebrow">{current.source}</p><h2>{current.packet.taskId}</h2></div><span className="status-tag">{current.packet.task.status} · {current.result.verdict||'NO VERIFIED VERDICT'}</span></div>
   <p role="status">{current.result.integrity?'Internal integrity verified':'Integrity checks failed or history incomplete'} · {current.source==='Live finalized read'?'Read from public latest-final state.':'Not authenticated against live chain state.'}</p>
   <ul className="audit-checks">{current.result.checks.map(c=><li key={c.label}><strong className={c.ok?'audit-pass':'audit-fail'}>{c.ok?'PASS':'FAIL'} · {c.label}</strong><span>{c.detail}</span></li>)}</ul>
   <div className="button-row"><button className="button secondary" disabled={busy||!current.result.integrity} onClick={()=>download('proofpilot-'+current.packet.taskId+'-audit.json',current.packet)}><Download size={15}/>Export review packet</button><button className="button secondary" disabled={busy} onClick={()=>void verifyLive()}><ShieldCheck size={15}/>Compare with live finalized state</button><button className="button secondary" disabled={busy||!current.result.integrity} onClick={()=>{setBaseline(current);setComparison(undefined);}}>Keep as comparison baseline</button></div>
   {liveMatch&&<p role="status">{liveMatch}</p>}
   <details><summary>Locked criteria and evidence</summary><ol>{[...current.packet.task.mandate.requiredFacts,...current.packet.task.mandate.rubric,current.packet.task.mandate.deliveryConditions].map((c,i)=><li key={i}>C{i+1}: {c}</li>)}</ol><p>Mandate: <code>{current.packet.task.mandateHash}</code></p><p>Delivery: <code>{current.packet.task.evidenceHash||'Not committed'}</code></p><pre className="demo-report">{current.packet.task.bundle||'No delivery'}</pre></details>
   <details><summary>Audit event history ({current.packet.auditEvents.length})</summary>{current.packet.auditEvents.map(e=><div className="audit-event" key={e.hash}><strong>#{e.sequence} · {e.action}</strong><code>{e.hash}</code></div>)}</details>
  </section>}
  {baseline&&<section className="panel audit-panel"><h2>Snapshot comparison</h2><p>Baseline: {baseline.packet.taskId} · {baseline.packet.task.status} · {baseline.source}. Load or import a second snapshot, then compare.</p><button className="button secondary" disabled={busy||!current||!current.result.integrity} onClick={()=>void compare()}><GitCompareArrows size={15}/>Compare snapshots</button>{comparison&&<><p role="status">{comparison.filter(c=>c.changed).length} changed fields. This compares snapshots; it does not prove a chronological transition or a new verdict.</p><div className="audit-table-wrap"><table><thead><tr><th>Field</th><th>Baseline</th><th>Current</th><th>Result</th></tr></thead><tbody>{comparison.map(c=><tr key={c.field}><th>{c.field}</th><td>{c.before}</td><td>{c.after}</td><td>{c.changed?'Changed':'Same'}</td></tr>)}</tbody></table></div></>}</section>}
 </section>;
}
