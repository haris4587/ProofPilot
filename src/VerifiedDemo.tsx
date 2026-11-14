import {useState} from 'react';
import {ExternalLink,Download,RefreshCw} from 'lucide-react';
import record from '../evidence/object-protocol-2026-11-14/summary.json';
import state from '../evidence/object-protocol-2026-11-14/adjudication-state.json';
import diagnostics from '../evidence/object-protocol-2026-11-14/diagnostics.json';
import {canonical,download,sha256,type Bundle} from './domain';
import {reviewedArchive,reviewedProviderReceipt,archiveLimitations,verifyArchiveSources} from './recovery';
import {explorer} from './chain';

const repository='https://github.com/haris4587/ProofPilot';
const bundle=JSON.parse(state.bundle) as Bundle;
export default function VerifiedDemo({onWalkthrough}:{onWalkthrough:()=>void}){
 const [checking,setChecking]=useState(false);
 const [localStatus,setLocalStatus]=useState('');
 const verifyLocal=async()=>{
  const bundleOK=await sha256(reviewedArchive())===record.evidenceHash;
  const mandateOK=await sha256(canonical(state.mandate))===record.mandateHash;
  setLocalStatus(bundleOK&&mandateOK?'Both archived SHA-256 commitments verified locally. This checks bytes, not factual accuracy or live consensus.':'Archive commitment mismatch. Stop and inspect the downloaded records.');
 };
 const verifySources=async()=>{
  setChecking(true);
  try{
   await verifyArchiveSources();
   setLocalStatus('All three pinned source SHA-256 hashes verified. These are limited operator-captured excerpts, not proof of every research claim.');
  }catch(e){setLocalStatus('Sources not verified: '+(e instanceof Error?e.message:'Network unavailable.'));}
  finally{setChecking(false);}
 };
 const [status,setStatus]=useState('Archived finalized snapshot · verified 14 November 2026');
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
  <div className="info-strip"><div><strong>Try the Demo · no credentials required</strong><ol><li>Verify the archived mandate and delivery hashes locally.</li><li>Inspect the genuine report, source limits and four transaction links below.</li><li>Optionally verify finalized state with a public read, or try the labeled offline lifecycle.</li></ol><div className="button-row"><button className="button secondary" onClick={()=>void verifyLocal()}>Verify archived hashes locally</button><button className="button secondary" onClick={()=>void verifySources()} disabled={checking}>Verify pinned source hashes</button><button className="button secondary" onClick={onWalkthrough}>Try offline lifecycle</button><a href={`${repository}/blob/main/REPRODUCE.md`} target="_blank" rel="noreferrer">Reproduction instructions</a></div><p role="status">{localStatus}</p></div></div>
  <div className="section-heading"><div><p className="eyebrow">GENUINE PARTNER EXECUTION · ARCHIVED EVIDENCE</p><h3>Aave V3 research review</h3><p>Heurist succeeded. V4 mandate, delivery and dispute finalized successfully.</p></div><span className="status-tag amber">DISPUTED · NO VERDICT</span></div>
  <div className="info-strip"><div><strong>Adjudication FINALIZED · execution ERROR</strong><p>The single bounded V4 adjudication failed EXTERNAL_SUPPORT_REQUIRED: a decided criterion lacked an external source-span reference. The exact response and criterion identity are unavailable. The transaction rolled back. No ACCEPTED, REJECTED or INCONCLUSIVE verdict or decision hash exists.</p></div></div>
  <p className="help" role="status">{status}</p>
  <p>Research received {record.researchReceivedAt}. It ran after the original V1 mandate and before this disclosed retrospective recovery mandate. No new Heurist request was made during migration.</p>
  <dl className="demo-commitments"><dt>Reviewed task</dt><dd>{record.taskId}</dd><dt>Mandate SHA-256</dt><dd>{record.mandateHash}</dd><dt>Evidence SHA-256 · 4,935 bytes</dt><dd>{record.evidenceHash}</dd><dt>Structured contract · Studionet 61999</dt><dd><a href={`${explorer}/address/${record.contract}`} target="_blank" rel="noreferrer">{record.contract} <ExternalLink size={12}/></a></dd></dl>
  <div className="demo-transactions">{record.transactions.map(t=><div className="tx-row" key={t.hash}><div><strong>{t.method}</strong><small>{t.status} · {t.execution==='SUCCESS'?'SUCCESS':'EXECUTION ERROR'}</small></div><a href={`${explorer}/transactions/${t.hash}`} target="_blank" rel="noreferrer">{t.hash.slice(0,10)}…{t.hash.slice(-6)} <ExternalLink size={13}/></a></div>)}</div>
  <details><summary>Locked mandate, genuine report and source limitations</summary><p>{state.mandate.objective}</p><ul>{[...state.mandate.requiredFacts,...state.mandate.rubric].map(x=><li key={x}>{x}</li>)}</ul><p>{state.mandate.deliveryConditions}</p><p>{archiveLimitations}</p><pre className="demo-report">{bundle.report}</pre><ul>{bundle.sources.map((s:{url:string;sha256:string})=><li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.url.split('/').pop()}</a> · <code>{s.sha256}</code></li>)}</ul></details>
  <details><summary>Actual bounded consensus diagnostics</summary><p>The one submitted V4 adjudication finalized with execution ERROR / MAJORITY_DISAGREE. Completed leader and validator executions reported EXTERNAL_SUPPORT_REQUIRED. Deployment and all four lifecycle submissions used full consensus with zero configured rotations. No transaction was resubmitted. Historical V3 failed the earlier JSON response shape check; V4 uses the documented JSON object protocol. No response was coerced or accepted without required external support.</p><pre className="demo-report">{JSON.stringify(diagnostics.rounds,null,2)}</pre></details>
  <div className="button-row"><button className="button secondary" onClick={()=>void refresh()} disabled={checking}><RefreshCw size={14}/>{checking?'Reading finalized state…':'Verify finalized state (read only)'}</button><button className="button secondary" onClick={()=>download('authentic-delivery.json',reviewedArchive())}><Download size={14}/>Authentic bundle</button><button className="button secondary" onClick={()=>download('genuine-provider-receipt.json',reviewedProviderReceipt())}><Download size={14}/>Heurist receipt</button><button className="button secondary" onClick={()=>download('finalized-task.json',state)}><Download size={14}/>Finalized task</button></div>
  <p><a href="https://github.com/haris4587/ProofPilot/raw/24235399698fffa4b5df4839b4de661de8feae68/evidence/final-demo-2026-11-13/ProofPilot-verified-progress.mp4" target="_blank" rel="noreferrer">Watch the historical progress demo (43.8 seconds)</a> · <a href="https://github.com/haris4587/ProofPilot/raw/24235399698fffa4b5df4839b4de661de8feae68/evidence/final-demo-2026-11-13/ProofPilot-verified-progress.mp4" download>Download MP4</a></p>
  <p className="help">This archive does not change session counters or authorize transactions. <a href={`${repository}/tree/main/evidence/object-protocol-2026-11-14`} target="_blank" rel="noreferrer">Receipts and diagnostics</a> · <a href={`${explorer}/address/0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f`} target="_blank" rel="noreferrer">Preserved V1 contract</a> · <a href={`${explorer}/address/0x8d64250Eb8c3Eafb8628482d2381799189055a90`} target="_blank" rel="noreferrer">Historical V2</a>. Mission submission remains incomplete: successful adjudication has not been demonstrated. The video records an earlier failed attempt; it does not show this V4 attempt.</p>
 </section>;
}
