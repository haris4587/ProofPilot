"""Synthetic model behaviors against authentic archived bytes, NOT network consensus."""
import copy,json,unittest
from pathlib import Path
from unittest.mock import patch
import test_adjudication_diagnostics as archive
import test_contract as support
v3=archive.load('object_protocol_candidate','contracts/proof_pilot_v4.py')
state=json.loads(Path('evidence/corrected-lifecycle-2026-11-13/adjudication-state.json').read_text())
bundle=json.loads(state['bundle'])
corpus=[bundle['report']]+[raw.decode() for raw in archive.sources.values()]
catalog=v3.source_catalog(corpus)
external=next(x['id'] for x in catalog if x['source']==1 and 'pooled' in x['quote'])
def rows(state='UNKNOWN',refs=None):return [['C'+str(i+1),state,copy.deepcopy(refs if refs is not None else [])] for i in range(9)]
class StructuredTests(unittest.TestCase):
 def setUp(self):support.gl.message.sender_address=state['client']
 def execute(self,answers,web=None,mutate=None):
  p=v3.ProofPilotV4();p.tasks={'candidate-task':v3.canonical(state)};p.audit=[];p.__init__()
  if mutate:mutate(p)
  iterator=iter(answers);calls=[]
  def prompt(text,**kwargs):
   calls.append(text);answer=next(iterator)
   if isinstance(answer,Exception):raise answer
   return copy.deepcopy(answer if isinstance(answer, dict) or isinstance(answer, str) else ({'checks':answer} if text.startswith('Verify each proposed') else {'assessments':answer}))
  web=web or (lambda url:support.SimpleNamespace(status=200,body=archive.sources[url]))
  with patch.object(support.gl.nondet,'exec_prompt',prompt),patch.object(support.gl.nondet.web,'get',web):p.adjudicate('candidate-task')
  return json.loads(p.get_task('candidate-task')),calls
 def test_named_model_behavior_fixtures(self):
  fixtures=json.loads(Path('tests/fixtures/structured-model-behaviors.json').read_text())
  for fixture in fixtures['cases']:
   with self.subTest(behavior=fixture['behavior']):
    answers=[fixture['leader'],fixture['validator'],fixture['relevance']]
    for i,answer in enumerate(answers):
     if isinstance(answer,str):answers[i]=json.dumps({'checks' if i==2 else 'assessments':json.loads(answer)})
    result,_=self.execute(answers);self.assertEqual(result['decision']['decision']['outcome'],'INCONCLUSIVE')
 def test_authentic_commitments(self):
  self.assertEqual(len(state['bundle'].encode()),4935)
  self.assertEqual(v3.digest(state['bundle']),'63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500')
  self.assertEqual(v3.digest(v3.canonical(state['mandate'])),'ea0c7ee8300f76a9eee5a06794a5c393c79b734c8945a872b4d78f88ba580c73')
 def test_grounded_unknown_and_distinct_references(self):
  a=rows();a[0]=['C1','SATISFIED',[external]];b=copy.deepcopy(a);b[0][2]=[0,external]
  result,calls=self.execute([a,json.dumps({'assessments':b}),['VALID']*9]);self.assertEqual(len(calls),3)
  self.assertNotIn('proposedAssessments',calls[1]);self.assertIn('proposedAssessments',calls[2])
  self.assertEqual(result['decision']['decision']['outcome'],'INCONCLUSIVE')
 def test_unicode_quotes_exact_utf8_spans(self):
  item=catalog[external];self.assertIn('“',item['quote'])
  for span in catalog:self.assertEqual(corpus[span['source']].encode()[span['start']:span['end']].decode(),span['quote'])
  result,_=self.execute([rows('UNKNOWN',[external]),rows(),['VALID']*9]);quote=result['decision']['decision']['citations'][0]['quote'];self.assertIn('“',quote)
 def test_long_unicode_source_catalog_roundtrip(self):
  text=('é🙂'+('x'*400)+'\n')*20;spans=v3.source_catalog([text]);self.assertEqual(''.join(s['quote'] for s in spans),text)
  for span in spans:self.assertEqual(text.encode()[span['start']:span['end']].decode(),span['quote'])
 def test_deterministic_three_outcomes_and_reason_bound(self):
  for statuses,outcome in [(['SATISFIED']*9,'ACCEPTED'),(['VIOLATED']+['SATISFIED']*8,'REJECTED'),(['VIOLATED','UNKNOWN']+['SATISFIED']*7,'INCONCLUSIVE')]:
   a=[['C'+str(i+1),s,[external]] for i,s in enumerate(statuses)];d=v3.format_decision(a,catalog)
   self.assertEqual(d['outcome'],outcome);self.assertTrue(d['reason'].isascii());self.assertLess(len(d['reason']),240)
 def test_malformed_matrix(self):
  bad=[None,{},'',[],rows()[:8],rows()+[['C10','UNKNOWN',[]]],'```json\n[]\n```','{broken',True]
  for index,value in [(0,'C0'),(1,'ACCEPTED'),(1,'UNKNOWN🙂'),(2,[True]),(2,[-1]),(2,[len(catalog)]),(2,[external]*2),(2,list(range(5)))]:
   a=rows();a[0][index]=value;bad.append(a)
  a=rows();a[0].append('x'*301);bad.append(a)
  a=rows('SATISFIED',[0]);bad.append(a)
  for answer in bad:
   with self.subTest(answer=str(answer)[:60]),self.assertRaises((support.UserError,TypeError)):self.execute([answer])
 def test_extra_prose_or_quotation_fields_rejected(self):
  for answer in [{'assessments':rows(),'quote':'x'*4000}, {'outcome':'ACCEPTED','reason':'é'*2000},' '*4097]:
   with self.assertRaises(support.UserError):self.execute([answer])
 def test_provider_exception_no_retry_or_secret_leak(self):
  with self.assertRaisesRegex(support.UserError,'PROVIDER_ERROR') as error:self.execute([TimeoutError('SECRET')])
  self.assertNotIn('SECRET',str(error.exception))
 def test_validator_disagreement_blocks(self):
  a=rows();b=rows();b[0]=['C1','VIOLATED',[external]]
  with self.assertRaisesRegex(support.UserError,'INDEPENDENT_DISAGREEMENT'):self.execute([a,b])
 def test_irrelevant_existing_span_rejected(self):
  a=rows('SATISFIED',[external]);verification=['VALID']*9;verification[1]='INVALID'
  with self.assertRaisesRegex(support.UserError,'CITATION_RELEVANCE'):self.execute([a,a,verification])
 def test_unsupported_and_contradictory_decisions_blocked(self):
  # Mocks model independent recognition of missing evidence/contradictions;
  # does NOT claim a Python mock proves LLM semantic correctness.
  for independent in [rows(),rows('VIOLATED',[external])]:
   with self.assertRaisesRegex(support.UserError,'INDEPENDENT_DISAGREEMENT'):self.execute([rows('SATISFIED',[external]),independent])
 def test_synthetic_contradictory_source_is_supplied_to_both_models(self):
  # Deliberately synthetic modified source and commitment; archived files stay intact.
  contradictory=b'Contradictory test source: variable rates are NEVER based on utilization.'
  changed=copy.deepcopy(bundle);changed['sources'][2]['sha256']=v3.hashlib.sha256(contradictory).hexdigest()
  def mutate(p):
   t=json.loads(p.tasks['candidate-task']);t['bundle']=v3.canonical(changed);t['evidenceHash']=v3.digest(t['bundle']);p.tasks['candidate-task']=v3.canonical(t)
  def web(url):return support.SimpleNamespace(status=200,body=contradictory if url==changed['sources'][2]['url'] else archive.sources[url])
  result,prompts=self.execute([rows(),rows(),['VALID']*9],web,mutate)
  self.assertEqual(result['decision']['decision']['outcome'],'INCONCLUSIVE')
  self.assertTrue(all('variable rates are NEVER based on utilization' in p for p in prompts))
  # Acceptance against that independent UNKNOWN assessment must abort.
  with self.assertRaisesRegex(support.UserError,'INDEPENDENT_DISAGREEMENT'):self.execute([rows('SATISFIED',[external]),rows()],web,mutate)
 def test_relevance_malformed_or_provider_failure(self):
  for bad in [[],['VALID']*8,['VALID']*8+['MAYBE'],[True]*9,TimeoutError()]:
   with self.assertRaises(support.UserError):self.execute([rows(),rows(),bad])
 def test_source_integrity_failures_no_llm_calls(self):
  for web in [lambda u:support.SimpleNamespace(status=200,body=b'substituted'),lambda u:support.SimpleNamespace(status=500,body=b''),lambda u:support.SimpleNamespace(status=200,body=b'x'*8193)]:
   result,calls=self.execute([],web);self.assertEqual(calls,[]);self.assertEqual(result['decision']['decision']['outcome'],'INCONCLUSIVE');self.assertEqual(result['decision']['decision']['evidenceError'],'SOURCE_INTEGRITY')
 def test_authorization_and_terminal_replay(self):
  support.gl.message.sender_address='attacker'
  with self.assertRaisesRegex(support.UserError,'Only commissioning client'):self.execute([])
  support.gl.message.sender_address=state['client']
  def decided(p):t=json.loads(p.tasks['candidate-task']);t['status']='DECIDED';p.tasks['candidate-task']=v3.canonical(t)
  with self.assertRaisesRegex(support.UserError,'Dispute required'):self.execute([],mutate=decided)
 def test_audit_and_decision_hash(self):
  result,_=self.execute([rows(),rows(),['VALID']*9]);receipt=result['decision'];expected=receipt.pop('decisionHash');self.assertEqual(v3.digest(v3.canonical(receipt)),expected)
 def test_v3_reproduces_failure_on_documented_object_response(self):
  old=archive.load('historical_v3_object_regression','contracts/proof_pilot_v3.py')
  with self.assertRaisesRegex(support.UserError,'ASSESSMENT_COUNT'):
   old.assess({'assessments':rows()},catalog)
  self.assertEqual(v3.assess(v3.schema_rows({'assessments':rows()},'assessments'),catalog),rows())
 def test_bare_arrays_rejected_at_json_object_boundary(self):
  for key in ['assessments','checks']:
   with self.assertRaisesRegex(support.UserError, 'RESPONSE_OBJECT_'):
    v3.schema_rows(rows(),key)
 def test_exact_object_schema_and_nine_count_required(self):
  for bad in [{}, {'rows':rows()}, {'assessments':rows(),'outcome':'ACCEPTED'}, {'assessments':rows()[:8]}, {'assessments':rows()+[rows()[0]]}, {'assessments':None}]:
   with self.assertRaises(support.UserError):v3.schema_rows(bad,'assessments')
  self.assertEqual(v3.schema_rows({'assessments':rows()},'assessments'),rows())
 def test_prompt_schema_requests_objects_for_both_calls(self):
  result,prompts=self.execute([rows(),rows(),['VALID']*9])
  self.assertIn('JSON object with exactly one key, "assessments"',prompts[0])
  self.assertIn('JSON object with exactly one key "checks"',prompts[2])
  self.assertEqual(result['status'],'DECIDED')
if __name__=='__main__':unittest.main()
