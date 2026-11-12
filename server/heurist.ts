import { createHash, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';
export class ProviderError extends Error {constructor(public status:number,message:string){super(message);}}
export function authorized(given:string|undefined,expected:string|undefined){if(!given||!expected||expected.length<24)return false;const a=Buffer.from(given);const b=Buffer.from('Bearer '+expected);return a.length===b.length&&timingSafeEqual(a,b);}
const inputSchema=z.object({objective:z.string().min(10).max(1000)}).strict();
const MAX=64000;
export async function boundedResponse(res:Response):Promise<string>{
 if(Number(res.headers.get('content-length')||0)>MAX)throw new ProviderError(502,'Provider response exceeds the demo limit.');
 if(!res.body)throw new ProviderError(502,'Empty provider response.');
 const reader=res.body.getReader();let bytes=0;const parts:Uint8Array[]=[];
 try{for(;;){const {done,value}=await reader.read();if(done)break;bytes+=value.length;if(bytes>MAX)throw new ProviderError(502,'Provider response exceeds the demo limit.');parts.push(value);}}finally{await reader.cancel();}
 return Buffer.concat(parts).toString('utf8');
}
export async function getJSON(url:string,init:RequestInit,fetcher:typeof fetch=fetch,timeoutMs=18000){
 let res:Response;
 try{res=await fetcher(url,{...init,redirect:'error',signal:AbortSignal.timeout(timeoutMs)});}catch{throw new ProviderError(504,'Heurist request timed out or could not connect. No automatic execution retry was made.');}
 if(!res.ok){if(res.status===401||res.status===403)throw new ProviderError(502,'Heurist credentials were refused.');if(res.status===402)throw new ProviderError(402,'Heurist credits are required.');throw new ProviderError(502,`Heurist returned HTTP ${res.status}.`);}
 const body=await boundedResponse(res);let value:unknown;try{value=JSON.parse(body);}catch{throw new ProviderError(502,'Heurist returned malformed JSON.');}return {value,body,requestId:res.headers.get('x-request-id')};
}
// Schema can be wrapped per agent; traverse only to locate the documented function.
export function findTool(value:unknown):Record<string,unknown>|undefined{
 if(!value||typeof value!=='object')return;
 const obj=value as Record<string,unknown>;
 if(obj.name==='exa_web_search'&&obj.parameters&&typeof obj.parameters==='object')return obj;
 for(const v of Object.values(obj)){const result=findTool(v);if(result)return result;}
}
export function researchRequest(schema:unknown,objective:string){
 const tool=findTool(schema);
 const parameters=tool?.parameters as {type?:unknown;properties?:Record<string,{type?:unknown;minimum?:unknown;maximum?:unknown}>;required?:unknown}|undefined;
 const required=parameters?.required;
 const properties=parameters?.properties;
 // Support the current published name and the previously supported query schema.
 // Never guess an unknown required argument or silently bypass schema validation.
 const field=properties?.search_term?.type==='string'?'search_term':properties?.query?.type==='string'?'query':undefined;
 if(parameters?.type!=='object'||!field||!Array.isArray(required)||!required.includes(field)||required.some(k=>typeof k!=='string'||k!==field))throw new ProviderError(502,'The published Heurist tool schema differs from this adapter. Review it before executing.');
 const args:Record<string,string|number>={[field]:objective};
 if(properties?.limit?.type==='integer'&&properties.limit.minimum===6&&properties.limit.maximum===10)args.limit=6;
 return {agent_id:'ExaSearchDigestAgent',input:{tool:'exa_web_search',tool_arguments:args}};
}
export async function research(input:unknown,key:string|undefined,fetcher:typeof fetch=fetch){
 if(!key)throw new ProviderError(503,'Live Heurist execution is not configured. Add HEURIST_API_KEY on the server.');
 const {objective}=inputSchema.parse(input);
 const schema=await getJSON('https://mesh.heurist.xyz/mesh_schema?agent_id=ExaSearchDigestAgent',{method:'GET',headers:{Authorization:`Bearer ${key}`}},fetcher,10000);
 const request=researchRequest(schema.value,objective);
 // Exactly one paid request: never retry a POST with an uncertain delivery status.
 const response=await getJSON('https://mesh.heurist.xyz/mesh_request',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify(request)},fetcher,40000);
 if(!response.value||typeof response.value!=='object'||Array.isArray(response.value)||Object.keys(response.value).length===0)throw new ProviderError(502,'Heurist returned an invalid response shape.');
 const value=response.value as Record<string,unknown>;
 if(value.error||value.status==='error'||value.status==='payment_pending')throw new ProviderError(502,'Heurist did not deliver a successful research response.');
 return {mode:'live',provider:'Heurist Mesh',agentId:request.agent_id,tool:'exa_web_search',receivedAt:new Date().toISOString(),requestId:response.requestId,request,rawBody:response.body,rawSha256:createHash('sha256').update(response.body).digest('hex'),schemaSha256:createHash('sha256').update(schema.body).digest('hex'),response:value};
}
