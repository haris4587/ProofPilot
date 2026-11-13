"""Offline proposed prompt correction. Synthetic answers are not network results."""
import ast,copy,unittest
from pathlib import Path
from unittest.mock import patch
import test_adjudication_diagnostics as archived
import test_contract as support
candidate=archived.load('offline_prompt_candidate','evidence/v2-lifecycle-2026-11-13/prompt-clarification-candidate.py')
class PromptCorrectionTests(unittest.TestCase):
 def setUp(self):support.gl.message.sender_address=archived.state['client']
 def test_only_prompt_append_differs_from_deployed_source(self):
  before=ast.parse(Path('contracts/proof_pilot_v2.py').read_text());after=ast.parse(Path('evidence/v2-lifecycle-2026-11-13/prompt-clarification-candidate.py').read_text())
  class RemoveClarification(ast.NodeTransformer):
   def visit_AugAssign(self,node):
    if isinstance(node.target,ast.Name) and node.target.id=='prompt' and isinstance(node.value,ast.Constant) and 'ONLY JSON strings' in str(node.value.value):return None
    return node
  self.assertEqual(ast.dump(before),ast.dump(RemoveClarification().visit(after)))
 def execute(self,prompt):return archived.DiagnosticTests().execute(candidate,prompt)
 def test_authentic_input_and_independent_execution_keep_strict_rules(self):
  seen=[]
  def prompt(text,**kwargs):
   seen.append(text);self.assertIn('exactly 9 criteria states',text);self.assertIn('ONLY JSON strings, never objects',text);self.assertIn('exact contiguous substring',text);return archived.decision()
  result=self.execute(prompt);self.assertEqual(len(seen),2);self.assertEqual(result['status'],'DECIDED');self.assertEqual(result['decision']['decision']['outcome'],'INCONCLUSIVE')
 def test_observed_failure_categories_still_fail_closed(self):
  # Representative mocks only. The actual rejected model text was not archived.
  for bad in ['MAYBE',{'state':'UNKNOWN'},None,True]:
   d=archived.decision();d['criteria'][0]=bad
   self.assertEqual(candidate.decision_error(d,archived.corpus,9),'CRITERIA_STATE')
  d=archived.decision();d['citations'][0]['quote']='This quotation is not in the archived corpus.'
  with self.assertRaisesRegex(support.UserError,'QUOTE_NOT_FOUND'),patch('builtins.print'):self.execute(lambda *a,**k:copy.deepcopy(d))
 def test_no_extra_attempts_or_coercion(self):
  calls=[];d=archived.decision();d['criteria']=[{'state':'UNKNOWN'}]*9
  def prompt(*a,**k):calls.append(1);return copy.deepcopy(d)
  with self.assertRaisesRegex(support.UserError,'CRITERIA_STATE'),patch('builtins.print'):self.execute(prompt)
  self.assertEqual(len(calls),2)
