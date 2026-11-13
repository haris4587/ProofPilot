"""Read-only reconstruction from archived finalized state and exact deployed source."""
import ast, hashlib, json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
out=root/'evidence/adjudication-diagnosis';out.mkdir(exist_ok=True)
state=json.loads((root/'evidence/final-adjudication-2026-11-12/state-before.json').read_text())
raw=state['bundle'];assert len(raw.encode())==4935
assert hashlib.sha256(raw.encode()).hexdigest()=='63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500'
b=json.loads(raw);m=state['mandate'];criteria=m['requiredFacts']+m['rubric']+[m['deliveryConditions']]
corpus=[b['report']]
for s in b['sources']:
 data=(root/'evidence/heurist-funded-attempt-2026-11-12/sources'/s['url'].split('/')[-1]).read_bytes()
 assert hashlib.sha256(data).hexdigest()==s['sha256'];assert len(data)<=8192
 corpus.append(data.decode('utf-8'))
source=(out/'deployed-source.py') if (out/'deployed-source.py').exists() else root/'evidence/deployed-source.py'
node=ast.parse(source.read_text())
prefix=next(x.value.value for x in ast.walk(node) if isinstance(x,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='prompt' for t in x.targets) and isinstance(x.value,ast.Constant) and isinstance(x.value.value,str))
inputs={'criteria':criteria,'objective':m['objective'],'corpus':corpus}
canonical=lambda v:json.dumps(v,sort_keys=True,separators=(',',':'),ensure_ascii=True)
prompt=prefix+canonical(inputs)
(out/'input.json').write_text(canonical(inputs));(out/'exact-v1-prompt.txt').write_text(prompt)
r=json.loads((root/'evidence/final-adjudication-2026-11-12/transaction.json').read_text());rounds=[]
for row in r['consensus_history']['consensus_results']:
 leaders=[]
 for leader in row['leader_result']:
  leaders.append({'mode':leader['mode'],'execution':leader['execution_result'],'modelPolicy':leader['node_config'].get('primary_model',leader['node_config']).get('model','unknown'),'processingTimeMs':leader.get('processing_time'),'llmUsage':(leader.get('execution_stats') or {}).get('llm'),'errorBase64':leader.get('result'),'stdout':(leader.get('genvm_result') or {}).get('stdout'),'stderr':(leader.get('genvm_result') or {}).get('stderr')})
 validators=row['validator_results']
 rounds.append({'round':row['consensus_round'],'leaders':leaders,'validatorVotes':[v.get('vote') for v in validators],'validatorLLMUsage':[(v.get('execution_stats') or {}).get('llm') for v in validators]})
summary={'criteriaCount':len(criteria),'corpusCount':len(corpus),'bundleBytes':len(raw.encode()),'corpusUtf8Bytes':[len(s.encode()) for s in corpus],'promptUtf8Bytes':len(prompt.encode()),'promptSha256':hashlib.sha256(prompt.encode()).hexdigest(),'deployedSourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'rotationCount':r['rotation_count'],'resultName':r['result_name'],'rounds':rounds,'rejectedLLMResponseCaptured':False}
(out/'reconstruction.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps({k:v for k,v in summary.items() if k!='rounds'},indent=2))
print('Rounds:',[(x['round'],len(x['leaders']),x['validatorVotes']) for x in rounds])
