import type {VercelRequest,VercelResponse} from '@vercel/node';
export default function handler(_req:VercelRequest,res:VercelResponse){res.setHeader('Cache-Control','no-store');res.status(200).json({heuristConfigured:!!process.env.HEURIST_API_KEY,operatorConfigured:!!process.env.PROOFPILOT_OPERATOR_TOKEN&&process.env.PROOFPILOT_OPERATOR_TOKEN.length>=24,network:'studionet',chainId:61999});}
