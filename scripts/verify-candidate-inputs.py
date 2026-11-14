"""Offline byte/commitment verification only; does not import GenLayer or call networks."""
import hashlib,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
s=json.loads((root/'evidence/corrected-lifecycle-2026-11-13/adjudication-state.json').read_text())
canonical=lambda x:json.dumps(x,sort_keys=True,separators=(',',':'),ensure_ascii=True)
sha=lambda raw:hashlib.sha256(raw).hexdigest()
assert len(s['bundle'].encode())==4935
assert sha(s['bundle'].encode())==s['evidenceHash']=='63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500'
assert sha(canonical(s['mandate']).encode())==s['mandateHash']=='ea0c7ee8300f76a9eee5a06794a5c393c79b734c8945a872b4d78f88ba580c73'
assert len(s['mandate']['requiredFacts'])+len(s['mandate']['rubric'])+1==9
for source in json.loads(s['bundle'])['sources']:
 raw=(root/'evidence/heurist-funded-attempt-2026-11-12/sources'/source['url'].split('/')[-1]).read_bytes()
 assert sha(raw)==source['sha256']
 print(source['url'].split('/')[-1],len(raw),source['sha256'])
print('VERIFIED: exact 4935-byte delivery, nine-criterion mandate and all source commitments. No semantic judgment.')
