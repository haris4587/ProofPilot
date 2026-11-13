import {useState} from 'react';
import {ExternalLink,Download,RefreshCw} from 'lucide-react';
import record from '../evidence/v2-lifecycle-2026-11-13/summary.json';
import state from '../evidence/v2-lifecycle-2026-11-13/adjudication-state.json';
import diagnostics from '../evidence/v2-lifecycle-2026-11-13/diagnostics.json';
import {canonical,download,sha256,type Bundle} from './domain';
import {reviewedArchive,reviewedProviderReceipt,archiveLimitations} from './recovery';
import {explorer} from './chain';

const repository='https://github.com/haris4587/ProofPilot';
const bundle=JSON.parse(state.bundle) as Bundle;
export default function VerifiedDemo(){
 const [checking,setChecking]=useState(false);
 const [status,setStatus]=useState('Archived finalized snapshot · verified 13 November 2026');
 const refresh=async()=>{
  setChecking(true);
  try{
   // Public read only: this does not create a wallet or request a provider run.
   const [{createClient},{studionet},{TransactionHashVariant}]=await Promise.all([import('genlayer-js'),import('genlayer-js/chains'),import('genlayer-js/types')]);
   const client=createClient({chain:studionet});
   const raw=await client.readContract({address:record.contract as `0x${string}`,functionName:'get_task',args:[record.taskId],transactionHashVariant:TransactionHashVariant.LATEST_FINAL});
   if(typeof raw!=='string')throw new Error('Unexpected finalized response.');
   const current=JSON.parse(raw);
   if(current.mandateHash!==record.mandateHash||await sha256(canonical(current.mandate))!==record.mandateHash||current.bundle!==reviewedArchive()||await sha256(current.bundle)!==record.evidenceHash||current.evidenceHash!==record.evidenceHash||current.client.toLowerCase()!==record.owner.toLowerCase())throw new Error('Finalized commitment or owner differs from this archive.');
   if(current.status!==record.state||Object.keys(current.decision||{}).length)throw new Error('Chain state changed. Review the explorer before updating this archive.');
   setStatus('Live finalized read verified · DISPUTED · no verdict');
  }catch(e){setStatus('Read not verified: '+(e instanceof Error?e.message:'Network unavailable.'));}
  finally{setChecking(false);}
 };
 return <section className="panel verified-demo" id="verified-demo" aria-label="Verified partner demonstration">
  <div className="section-heading"><div><p className="eyebrow">GENUINE PARTNER EXECUTION · ARCHIVED EVIDENCE</p><h3>Aave V3 research review</h3><p>Heurist succeeded. V2 mandate, delivery and dispute finalized successfully.</p></div><span className="status-tag amber">DISPUTED · NO VERDICT</span></div>
  <div className="info-strip"><div><strong>Adjudication FINALIZED · execution ERROR</strong><p>Strict validation rejected criteria entries and an inexact quotation. The transaction rolled back; it produced no ACCEPTED, REJECTED or INCONCLUSIVE decision. Decision hash: not created.</p></div></div>
  <p className="help" role="status">{status}</p>
  <p>Research received {record.researchReceivedAt}. It ran after the original V1 mandate and before this disclosed V2 recovery mandate. No new Heurist request was made during migration.</p>
  <dl className="demo-commitments"><dt>V2 task</dt><dd>{record.taskId}</dd><dt>Mandate SHA-256</dt><dd>{record.mandateHash}</dd><dt>Evidence SHA-256 · 4,935 bytes</dt><dd>{record.evidenceHash}</dd><dt>V2 contract · Studionet 61999</dt><dd><a href={`${explorer}/address/${record.contract}`} target="_blank" rel="noreferrer">{record.contract} <ExternalLink size={12}/></a></dd></dl>
  <div className="demo-transactions">{record.transactions.map(t=><div className="tx-row" key={t.hash}><div><strong>{t.method}</strong><small>{t.status} · {t.execution==='SUCCESS'?'SUCCESS':'EXECUTION ERROR'}</small></div><a href={`${explorer}/transactions/${t.hash}`} target="_blank" rel="noreferrer">{t.hash.slice(0,10)}…{t.hash.slice(-6)} <ExternalLink size={13}/></a></div>)}</div>
  <details><summary>Locked mandate, genuine report and source limitations</summary><p>{state.mandate.objective}</p><ul>{[...state.mandate.requiredFacts,...state.mandate.rubric].map(x=><li key={x}>{x}</li>)}</ul><p>{state.mandate.deliveryConditions}</p><p>{archiveLimitations}</p><pre className="demo-report">{bundle.report}</pre><ul>{bundle.sources.map((s:{url:string;sha256:string})=><li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.url.split('/').pop()}</a> · <code>{s.sha256}</code></li>)}</ul></details>
  <details><summary>Actual bounded consensus diagnostics</summary><p>Five prompt responses failed CRITERIA_STATE; one failed QUOTE_NOT_FOUND across the initial leader and two rotations. Only diagnostic codes and response hashes are archived, not the rejected model text.</p><pre className="demo-report">{JSON.stringify(diagnostics.rounds,null,2)}</pre></details>
  <div className="button-row"><button className="button secondary" onClick={()=>void refresh()} disabled={checking}><RefreshCw size={14}/>{checking?'Reading finalized state…':'Verify finalized state (read only)'}</button><button className="button secondary" onClick={()=>download('authentic-delivery.json',reviewedArchive())}><Download size={14}/>Authentic bundle</button><button className="button secondary" onClick={()=>download('genuine-provider-receipt.json',reviewedProviderReceipt())}><Download size={14}/>Heurist receipt</button><button className="button secondary" onClick={()=>download('v2-finalized-task.json',state)}><Download size={14}/>Finalized task</button></div>
  <p className="help">This archive does not change session counters or authorize transactions. <a href={`${repository}/tree/main/evidence/v2-lifecycle-2026-11-13`} target="_blank" rel="noreferrer">Receipts and diagnostics</a> · <a href={`${explorer}/address/0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f`} target="_blank" rel="noreferrer">Preserved V1 contract</a>. Mission submission remains blocked by successful adjudication.</p>
 </section>;
}
