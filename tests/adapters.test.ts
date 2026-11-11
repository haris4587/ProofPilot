import {describe,it,expect,vi} from 'vitest';
import {authorized,research,getJSON,findTool} from '../server/heurist';
import {canonical,defaultMandate,mandateSchema,bundleSchema} from '../src/domain';
const schema={ExaSearchDigestAgent:{tools:[{type:'function',function:{name:'exa_web_search',parameters:{type:'object',properties:{query:{type:'string'}},required:['query']}}}]}};
const response={data:{summary:'Research delivery',sources:['https://aave.com']}};
describe('Heurist adapter',()=>{
 it('requires configured payment before any API request',async()=>{const f=vi.fn();await expect(research({objective:'Research the lending model'},undefined,f)).rejects.toThrow('not configured');expect(f).not.toHaveBeenCalled();});
 it('checks schema and executes a single authenticated request',async()=>{const f=vi.fn().mockResolvedValueOnce(new Response(JSON.stringify(schema))).mockResolvedValueOnce(new Response(JSON.stringify(response),{headers:{'x-request-id':'real-id-in-test'}}));const r=await research({objective:'Research the Aave lending model'},'test-key',f);expect(f).toHaveBeenCalledTimes(2);expect(f.mock.calls[1][0]).toBe('https://mesh.heurist.xyz/mesh_request');expect(JSON.parse(f.mock.calls[1][1].body)).toEqual({agent_id:'ExaSearchDigestAgent',input:{tool:'exa_web_search',tool_arguments:{query:'Research the Aave lending model'}}});expect(f.mock.calls[1][1].headers.Authorization).toBe('Bearer test-key');expect(r.rawSha256).toHaveLength(64);});
 it('refuses changed schemas without executing',async()=>{const f=vi.fn().mockResolvedValue(new Response('{}'));await expect(research({objective:'Research the Aave lending model'},'test',f)).rejects.toThrow('schema differs');expect(f).toHaveBeenCalledTimes(1);});
 it('does not retry uncertain execution',async()=>{const f=vi.fn().mockResolvedValueOnce(new Response(JSON.stringify(schema))).mockRejectedValueOnce(new Error('timeout'));await expect(research({objective:'Research the Aave lending model'},'test',f)).rejects.toThrow('timed out');expect(f).toHaveBeenCalledTimes(2);});
 it.each([401,403,402,429,500])('handles HTTP %i safely',async(status)=>{const f=vi.fn().mockResolvedValue(new Response('private diagnostic',{status}));await expect(getJSON('https://mesh.heurist.xyz/mesh_request',{},f)).rejects.not.toThrow('private diagnostic');expect(f).toHaveBeenCalledOnce();});
 it('rejects malformed provider JSON',async()=>{await expect(getJSON('https://mesh.heurist.xyz/mesh_request',{},vi.fn().mockResolvedValue(new Response('not json')))).rejects.toThrow('malformed');});
 it('enforces response size',async()=>{await expect(getJSON('https://mesh.heurist.xyz/mesh_request',{},vi.fn().mockResolvedValue(new Response('x'.repeat(64001))))).rejects.toThrow('limit');});
 it('recognizes published wrapped tool schemas',()=>expect(findTool(schema)?.name).toBe('exa_web_search'));
 it('protects live execution behind a strong operator token',()=>{expect(authorized('Bearer '+'x'.repeat(24),'x'.repeat(24))).toBe(true);expect(authorized('Bearer short','short')).toBe(false);expect(authorized('Bearer wrong','x'.repeat(24))).toBe(false);});
});
describe('Commitments',()=>{
 it('canonicalizes nested JSON with Python-compatible ASCII escaping',()=>expect(canonical({z:'é😀',a:{y:2,x:1}})).toBe('{"a":{"x":1,"y":2},"z":"\\u00e9\\ud83d\\ude00"}'));
 it('validates the concrete mandate',()=>expect(mandateSchema.parse(defaultMandate)).toEqual(defaultMandate));
 it('rejects duplicate acceptance criteria',()=>expect(mandateSchema.safeParse({...defaultMandate,rubric:['same','same']}).success).toBe(false));
 it('rejects mutable evidence',()=>expect(bundleSchema.safeParse({report:'A report',sources:[{url:'https://example.com/live',sha256:'0'.repeat(64)}],provenance:{}}).success).toBe(false));
});

describe('Transaction finality boundary',()=>{
 it('rejects pending and accepted execution',async()=>{const {successful}=await import('../src/chain');expect(successful({status:'ACCEPTED',txExecutionResultName:'SUCCESS'})).toBe(false);expect(successful({status:'PENDING'})).toBe(false);});
 it('requires execution success as well as finality',async()=>{const {successful}=await import('../src/chain');expect(successful({status:'FINALIZED',txExecutionResultName:'ERROR'})).toBe(false);expect(successful({status:'FINALIZED',txExecutionResultName:'SUCCESS'})).toBe(true);});
 it('supports both stable Studio leader receipt shapes',async()=>{const {successful}=await import('../src/chain');expect(successful({status:'FINALIZED',consensus_data:{leader_receipt:{execution_result:'SUCCESS'}}})).toBe(true);expect(successful({status:'FINALIZED',consensus_data:{leader_receipt:[{execution_result:'SUCCESS'}]}})).toBe(true);});
});

describe('Session counts and offline receipts',()=>{
 it('counts only confirmed milestones and deduplicates recovery',async()=>{const {emptyCounts,recordMilestone}=await import('../src/workflowState');let c=emptyCounts();c=recordMilestone(c,'assignments','broadcast-only',false);expect(c.assignments).toHaveLength(0);c=recordMilestone(c,'assignments','final-task');c=recordMilestone(c,'assignments','final-task');c=recordMilestone(c,'assignments','second-task');expect(c.assignments).toHaveLength(2);expect(c.verdicts).toHaveLength(0);});
 it('never converts an offline review into a finalized verdict',async()=>{const {offlineReceipt}=await import('../src/workflowState');const r=offlineReceipt('task','mandate','evidence',0,2);expect(r.expectedOutcome).toBe('INCONCLUSIVE');expect(r.finalized).toBe(false);expect(r.networkTransaction).toBe(null);expect(offlineReceipt('task','m','e',2,2).expectedOutcome).toBe('NOT_EVALUATED');});
 it('formats validation failures without dumping raw Zod JSON',async()=>{const {friendlyError,mandateSchema,defaultMandate}=await import('../src/domain');const invalid=mandateSchema.safeParse({...defaultMandate,objective:'x'});if(invalid.success)throw Error('Invalid fixture');expect(friendlyError(invalid.error)).toContain('objective:');expect(friendlyError(new SyntaxError('bad JSON'))).toContain('source manifest');});
});

describe('Stable Studionet numeric status receipts',()=>{
 it('recognizes FINALIZED=7 only with execution success',async()=>{const {successful,statusName}=await import('../src/chain');expect(statusName({status:7})).toBe('FINALIZED');expect(successful({status:7,consensus_data:{leader_receipt:[{execution_result:'SUCCESS'}]}})).toBe(true);expect(successful({status:7,consensus_data:{leader_receipt:[{execution_result:'ERROR'}]}})).toBe(false);expect(successful({status:5,consensus_data:{leader_receipt:[{execution_result:'SUCCESS'}]}})).toBe(false);});
});
