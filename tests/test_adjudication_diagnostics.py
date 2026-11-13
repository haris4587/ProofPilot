"""Synthetic response replays against authentic nine-criterion input; never live LLM calls."""
import copy, importlib.util, json, unittest
from pathlib import Path
from unittest.mock import patch
import test_contract as support
ROOT=Path(__file__).resolve().parents[1]
def load(name,path):
 spec=importlib.util.spec_from_file_location(name,ROOT/path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
v1=load('actual_deployed','evidence/adjudication-diagnosis/deployed-source.py')
v2=load('diagnostic_v2','contracts/proof_pilot_v2.py')
state=json.loads((ROOT/'evidence/final-adjudication-2026-11-12/state-before.json').read_text())
bundle=json.loads(state['bundle']);criteria=state['mandate']['requiredFacts']+state['mandate']['rubric']+[state['mandate']['deliveryConditions']]
sources={s['url']:(ROOT/'evidence/heurist-funded-attempt-2026-11-12/sources'/s['url'].split('/')[-1]).read_bytes() for s in bundle['sources']}
corpus=[bundle['report']]+[raw.decode() for raw in sources.values()]
def decision():return {'outcome':'INCONCLUSIVE','reason':'The bounded source excerpts do not establish all report claims and reference six is not listed.','criteria':['UNKNOWN']*9,'citations':[{'source':3,'quote':'Interest rates are determined algorithmically'}]}
def instance(module):
 p=(module.ProofPilot if module is v1 else module.ProofPilotV2)();p.tasks={'pp-recovery-18ec1e64ccb747d8':module.canonical(state)};p.audit=[];p.__init__();return p
class DiagnosticTests(unittest.TestCase):
 def setUp(self):support.gl.message.sender_address=state['client']
 def execute(self,module,prompt,web=None):
  p=instance(module);web=web or (lambda url:support.SimpleNamespace(status=200,body=sources[url]))
  with patch.object(support.gl.nondet,'exec_prompt',prompt),patch.object(support.gl.nondet.web,'get',web):p.adjudicate('pp-recovery-18ec1e64ccb747d8')
  return json.loads(p.get_task('pp-recovery-18ec1e64ccb747d8'))
 def test_authentic_nine_criteria_four_corpus_and_exact_prompt(self):
  seen=[]
  def prompt(text,**config):seen.append(text);self.assertEqual(config,{'response_format':'json'});return decision()
  result=self.execute(v1,prompt);self.assertEqual(result['status'],'DECIDED');self.assertEqual(len(criteria),9);self.assertEqual(len(corpus),4);self.assertEqual(len(seen),2)
  self.assertEqual(seen[0],(ROOT/'evidence/adjudication-diagnosis/exact-v1-prompt.txt').read_text())
 def test_valid_dict_and_exact_json_string_supported_in_both_versions(self):
  for module in [v1,v2]:
   for value in [decision(),json.dumps(decision())]:
    with self.subTest(module=module.__name__,type=type(value).__name__):self.assertEqual(self.execute(module,lambda *a,**k:copy.deepcopy(value))['decision']['decision']['outcome'],'INCONCLUSIVE')
 def test_validation_failure_matrix_unchanged(self):
  cases=[]
  def add(code,fn):d=decision();fn(d);cases.append((code,d))
  add('OBJECT_FIELDS',lambda d:d.update(extra=True));add('OBJECT_FIELDS',lambda d:d.pop('reason'))
  add('OUTCOME',lambda d:d.update(outcome='APPROVED'))
  add('CRITERIA_COUNT',lambda d:d.update(criteria=['UNKNOWN']*8));add('CRITERIA_COUNT',lambda d:d.update(criteria=['UNKNOWN']*10))
  add('CRITERIA_STATE',lambda d:d['criteria'].__setitem__(0,'MAYBE'))
  add('OUTCOME_DERIVATION',lambda d:d.update(outcome='ACCEPTED'))
  add('REASON_ASCII_LENGTH',lambda d:d.update(reason='A reason with a curly apostrophe: it’s unknown.'))
  add('REASON_ASCII_LENGTH',lambda d:d.update(reason='a'*1201))
  add('CITATIONS_COUNT',lambda d:d.update(citations=[]))
  add('CITATION_INDEX',lambda d:d['citations'][0].update(source=4));add('CITATION_INDEX',lambda d:d['citations'][0].update(source=-1));add('CITATION_INDEX',lambda d:d['citations'][0].update(source=True))
  add('QUOTE_ASCII_LENGTH',lambda d:d['citations'][0].update(quote='These supplied assets are “pooled”'))
  add('QUOTE_NOT_FOUND',lambda d:d['citations'][0].update(quote='a perfectly plausible but absent quotation'))
  for code,d in cases:
   with self.subTest(code=code):
    self.assertFalse(v1.validate_decision(d,corpus,9));self.assertFalse(v2.validate_decision(d,corpus,9));self.assertEqual(v2.decision_error(d,corpus,9),code)
    with self.assertRaisesRegex(support.UserError,code):self.execute(v2,lambda *a,**k:copy.deepcopy(d))
 def test_unknown_wrappers_and_response_types_not_silently_coerced(self):
  for response in [{'data':decision()},[decision()],b'{}',None,42]:
   with self.subTest(responseType=type(response).__name__):
    with self.assertRaisesRegex(support.UserError,'OBJECT_FIELDS'):self.execute(v2,lambda *a,**k:response)
 def test_malformed_json_and_fences_are_diagnosed_without_repair(self):
  for text in ['{invalid','```json\n'+json.dumps(decision())+'\n```']:
   with self.assertRaisesRegex(support.UserError,'JSON_PARSE'):self.execute(v2,lambda *a,**k:text)
 def test_provider_exception_does_not_leak_message(self):
  def prompt(*a,**k):raise TimeoutError('secret-provider-message')
  with self.assertRaisesRegex(support.UserError,'PROMPT_EXCEPTION_TimeoutError') as e:self.execute(v2,prompt)
  self.assertNotIn('secret-provider-message',str(e.exception))
  with self.assertRaisesRegex(support.UserError,'Invalid grounded decision'):self.execute(v1,prompt)
 def test_response_bound_and_attempt_bound(self):
  count=[]
  def prompt(*a,**k):count.append(1);return ' '*12001
  with self.assertRaisesRegex(support.UserError,'RESPONSE_SIZE'):self.execute(v2,prompt)
  self.assertEqual(len(count),2)
 def test_source_failure_paths_are_bounded_and_never_call_llm(self):
  def unused(*a,**k):raise AssertionError('LLM must not run')
  def throw(url):raise ConnectionError('untrusted message')
  for web in [throw,lambda url:support.SimpleNamespace(status=503,body=b''),lambda url:support.SimpleNamespace(status=200,body=None),lambda url:support.SimpleNamespace(status=200,body=b'x'*8193),lambda url:support.SimpleNamespace(status=200,body=b'substituted')]:
   for module in [v1,v2]:self.assertEqual(self.execute(module,unused,web)['decision']['decision']['outcome'],'INCONCLUSIVE')
 def test_independent_validator_disagreement_still_fails(self):
  count=[]
  def prompt(*a,**k):
   d=decision();count.append(1)
   if len(count)==2:d['outcome']='REJECTED';d['criteria']=['VIOLATED']*9
   return d
  with self.assertRaisesRegex(support.UserError,'Independent validator disagrees'):self.execute(v2,prompt)
 def test_response_diagnostics_hash_not_raw_content(self):
  with patch('builtins.print') as output:v2.response_diagnostic({'untrusted':'DO NOT PRINT THIS'},0,'OBJECT_FIELDS')
  log=output.call_args.args[0];self.assertIn('responseHash',log);self.assertNotIn('DO NOT PRINT THIS',log)
