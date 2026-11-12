"""Offline checks against the recorded deployed source. No real GenVM/LLM or writes."""
import json, importlib.util, unittest
from pathlib import Path
import test_contract as support
spec=importlib.util.spec_from_file_location('deployed_recovery',Path('evidence/deployed-source.py'))
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
class ArchiveRecoveryTests(unittest.TestCase):
 def setUp(self):
  self.root=Path('evidence/heurist-funded-attempt-2026-11-12')
  self.raw=(self.root/'delivery-prepared.json').read_text();self.bundle=json.loads(self.raw)
  self.state=json.loads((self.root/'finalized-state-before.json').read_text())
  self.p=c.ProofPilot();self.p.tasks={'pp-b6fafae9-9d2':c.canonical(self.state)};self.p.audit=[];self.p.__init__()
  support.gl.message.sender_address=self.state['client']
 def test_authentic_delivery_and_dispute_offline(self):
  c.validate_bundle(self.bundle);self.assertEqual(c.canonical(self.bundle),self.raw)
  self.p.submit_delivery('pp-b6fafae9-9d2',self.raw,c.digest(self.raw));self.assertEqual(json.loads(self.p.get_task('pp-b6fafae9-9d2'))['evidenceHash'],'63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500')
  self.p.open_dispute('pp-b6fafae9-9d2','Review the original mandate and the genuine archived research limitations.')
  self.assertEqual(json.loads(self.p.get_task('pp-b6fafae9-9d2'))['status'],'DISPUTED')
 def test_owner_mismatch_rejected(self):
  support.gl.message.sender_address='different account'
  with self.assertRaises(support.UserError):self.p.submit_delivery('pp-b6fafae9-9d2',self.raw,c.digest(self.raw))
 def test_prior_error_boundary_reproduced_without_network(self):
  self.p.submit_delivery('pp-b6fafae9-9d2',self.raw,c.digest(self.raw));self.p.open_dispute('pp-b6fafae9-9d2','Review the archived report against the original locked mandate.')
  previous=support.gl.nondet.web.get
  support.gl.nondet.web.get=lambda url:support.SimpleNamespace(status=200,body=(self.root/'sources'/url.split('/')[-1]).read_bytes())
  support.answer={'outcome':'ACCEPTED','reason':'Invalid answer example with invented evidence.','criteria':['SATISFIED']*8,'citations':[{'source':1,'quote':'THIS QUOTE IS NOT IN THE CORPUS'}]};support.validator_answer=None;support.calls.update(prompts=0,web=0)
  try:
   with self.assertRaisesRegex(support.UserError,'Invalid grounded decision; rotate validator'):self.p.adjudicate('pp-b6fafae9-9d2')
   self.assertEqual(support.calls['prompts'],2)
   self.assertEqual(json.loads(self.p.get_task('pp-b6fafae9-9d2'))['status'],'DISPUTED')
  finally:support.gl.nondet.web.get=previous
 def test_supported_inconclusive_can_pass_strict_grounding(self):
  # This validates the format/grounding boundary, not a real network verdict.
  corpus=[self.bundle['report']]+[(self.root/'sources'/n).read_text() for n in ['aave-intro.txt','aave-reserve.txt','bank.txt']]
  d={'outcome':'INCONCLUSIVE','reason':'The bounded excerpts do not establish every factual claim; reference six has no listed URL.','criteria':['UNKNOWN']*8,'citations':[{'source':3,'quote':'Interest rates are determined algorithmically'}]}
  self.assertTrue(c.validate_decision(d,corpus,8))
  d['outcome']='ACCEPTED';self.assertFalse(c.validate_decision(d,corpus,8))
