import {it,expect} from 'vitest';
import {receiptStatus,successful} from '../src/chain';
it('distinguishes successful finality, failed execution and unknown execution',()=>{
 expect(receiptStatus({status:7,consensus_data:{leader_receipt:[{execution_result:'SUCCESS'}]}})).toBe('FINALIZED · SUCCESS');
 expect(receiptStatus({status:7,consensus_data:{leader_receipt:[{execution_result:'ERROR'}]}})).toBe('FINALIZED · EXECUTION ERROR');
 expect(receiptStatus({status:7})).toBe('FINALIZED · EXECUTION UNVERIFIED');
 expect(receiptStatus({statusName:'PROPOSING'})).toBe('PROPOSING');
});
it('explicit execution errors override conflicting nested success in either direction',()=>{
 for(const receipt of [
  {status:7,txExecutionResultName:'ERROR',consensus_data:{leader_receipt:[{execution_result:'SUCCESS'}]}},
  {status:7,txExecutionResultName:'SUCCESS',consensus_data:{leader_receipt:{execution_result:'ERROR'}}},
  {status:7,consensus_data:{leader_receipt:[{execution_result:'SUCCESS'},{execution_result:'ERROR'}]}},
  {status:7,txExecutionResultName:'ERROR'},
 ]){
  expect(successful(receipt)).toBe(false);expect(receiptStatus(receipt)).toBe('FINALIZED · EXECUTION ERROR');
 }
 expect(successful({status:7,txExecutionResultName:'SUCCESS'})).toBe(true);
 expect(successful({statusName:'ACCEPTED',txExecutionResultName:'SUCCESS'})).toBe(false);
});
