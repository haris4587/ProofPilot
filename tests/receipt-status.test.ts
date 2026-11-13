import {it,expect} from 'vitest';
import {receiptStatus} from '../src/chain';
it('distinguishes successful finality, failed execution and unknown execution',()=>{
 expect(receiptStatus({status:7,consensus_data:{leader_receipt:[{execution_result:'SUCCESS'}]}})).toBe('FINALIZED · SUCCESS');
 expect(receiptStatus({status:7,consensus_data:{leader_receipt:[{execution_result:'ERROR'}]}})).toBe('FINALIZED · EXECUTION ERROR');
 expect(receiptStatus({status:7})).toBe('FINALIZED · EXECUTION UNVERIFIED');
 expect(receiptStatus({statusName:'PROPOSING'})).toBe('PROPOSING');
});
