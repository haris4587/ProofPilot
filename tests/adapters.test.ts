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
