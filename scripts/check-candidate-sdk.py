"""Real pinned SDK, native direct mode, mocked I/O. Not WASM/network consensus."""
import hashlib,json,re
from pathlib import Path
from gltest.direct import VMContext,deploy_contract
root=Path(__file__).resolve().parents[1]
state=json.loads((root/'evidence/corrected-lifecycle-2026-11-13/adjudication-state.json').read_text())
canonical=lambda x:json.dumps(x,sort_keys=True,separators=(',',':'),ensure_ascii=True)
sha=lambda x:hashlib.sha256(x.encode()).hexdigest()
vm=VMContext()
with vm.activate():
 p=deploy_contract(root/'contracts/proof_pilot_v3.py',vm)
 raw=canonical(state['mandate']);p.create_assignment('sdk-check',raw,sha(raw))
 p.submit_delivery('sdk-check',state['bundle'],sha(state['bundle']))
 p.open_dispute('sdk-check','Review the exact archived evidence against the mandate.')
 for source in json.loads(state['bundle'])['sources']:
  data=(root/'evidence/heurist-funded-attempt-2026-11-12/sources'/source['url'].split('/')[-1]).read_bytes()
  assert hashlib.sha256(data).hexdigest()==source['sha256']
  vm.mock_web(re.escape(source['url']),{'status':200,'body':data})
 vm.mock_llm('Independently evaluate',canonical([['C'+str(i+1),'UNKNOWN',[]] for i in range(9)]))
 vm.mock_llm('Verify each proposed',canonical(['VALID']*9))
 p.adjudicate('sdk-check')
 import cloudpickle
 for _, leader_fn, validator_fn in vm._captured_validators:
  cloudpickle.dumps(leader_fn);cloudpickle.dumps(validator_fn)
 assert vm.run_validator() is True
 result=json.loads(p.get_task('sdk-check'));assert result['status']=='DECIDED'
 print(json.dumps({'mode':'PINNED_SDK_NATIVE_DIRECT_MOCKED_IO_NOT_WASM_NOT_NETWORK','lifecycle':'passed','capturedValidator':'passed','closureSerialization':'passed','outcome':'INCONCLUSIVE','networkWrites':0,'providerRequests':0}))
