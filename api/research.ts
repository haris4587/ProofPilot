import type { VercelRequest,VercelResponse } from '@vercel/node';
import { authorized,ProviderError,research } from '../server/heurist.js';
import { ZodError } from 'zod';
export default async function handler(req:VercelRequest,res:VercelResponse){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({error:'Use POST.'});
 if(!authorized(req.headers.authorization,process.env.PROOFPILOT_OPERATOR_TOKEN))return res.status(401).json({error:'A configured operator token is required for live research.'});
 if(JSON.stringify(req.body??{}).length>4000)return res.status(413).json({error:'Request too large.'});
 try{return res.status(200).json(await research(req.body,process.env.HEURIST_API_KEY));}catch(e){if(e instanceof ProviderError)return res.status(e.status).json({error:e.message});if(e instanceof ZodError)return res.status(400).json({error:'Invalid research objective.'});return res.status(500).json({error:'Research request failed.'});}
}
