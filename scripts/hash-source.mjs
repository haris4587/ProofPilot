import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const path=process.argv[2];if(!path)throw new Error('Usage: node scripts/hash-source.mjs <source-file>');
const bytes=await readFile(path);if(bytes.length>8192)throw new Error('Source exceeds the 8 KB contract limit.');
console.log(JSON.stringify({path,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')},null,2));
