"""Render genuine progress evidence. Never portray execution ERROR as a verdict."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,subprocess,hashlib
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).resolve().parent
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
BG='#0a1020';FG='#eff5ff';MUTED='#9caec7';MINT='#69e2ce';AMBER='#ffc77b'
def font(size,b=False):return ImageFont.truetype(BOLD if b else FONT,size)
def wrap(d,text,x,y,width,size=30,color=FG):
 line=''
 for w in text.split():
  nextline=(line+' '+w).strip()
  if d.textlength(nextline,font=font(size))>width:
   d.text((x,y),line,font=font(size),fill=color);y+=int(size*1.4);line=w
  else:line=nextline
 d.text((x,y),line,font=font(size),fill=color);return y+int(size*1.4)
s=json.loads((ROOT/'evidence/corrected-lifecycle-2026-11-13/summary.json').read_text())
assert s['state']=='DISPUTED' and s['verdict'] is None
scenes=[
(5,'ProofPilot','INTERNET COURT × HEURIST × GENLAYER','evidence/e2e/screenshots/00-dashboard.jpg','Agree the work. Preserve evidence. Independently review delivery.'),
(7,'Agreement, preserved','ORIGINAL MANDATE → DISCLOSED CORRECTED RECOVERY','evidence/heurist-live-attempt-2026-11-12/mandate-finalized.jpg','Original mandate preceded research. The later corrected mandate discloses reuse.'),
(8,'Genuine Heurist research','EXASEARCHDIGESTAGENT · EXA_WEB_SEARCH','evidence/heurist-funded-attempt-2026-11-12/research-success.jpg','Actual archived result. Missing citation [6] and limited source support remain.'),
(10,'Three successful commitments','FINALIZED / SUCCESS · STUDIONET 61999',None,'Mandate, exact 4,935-byte delivery and dispute finalized successfully.'),
(10,'Consensus rejected invalid output','FINALIZED / EXECUTION ERROR · NO VERDICT','evidence/corrected-lifecycle-2026-11-13/execution-error.jpg','REASON_ASCII_LENGTH / OBJECT_FIELDS / QUOTE_ASCII_LENGTH. No verdict.'),
(5,'Inspect. Reproduce. Verify.','SUCCESSFUL ADJUDICATION STILL REQUIRED',None,'Verified progress report — not a completed mission submission.')]
assets=[]
for i,(dur,title,subtitle,shot,caption) in enumerate(scenes):
 im=Image.new('RGB',(1920,1080),BG);d=ImageDraw.Draw(im)
 d.rounded_rectangle((64,30,1856,80),radius=12,fill='#242335');d.text((87,42),'VERIFIED PROGRESS  •  ADJUDICATION BLOCKED',font=font(23,True),fill=AMBER)
 d.text((72,116),title,font=font(48,True),fill=FG);d.text((76,185),subtitle,font=font(25,True),fill=MINT)
 if shot:
  path=ROOT/shot;pic=Image.open(path).convert('RGB');pic.thumbnail((1776,660),Image.Resampling.LANCZOS)
  x=(1920-pic.width)//2;im.paste(pic,(x,244));assets.append({'path':shot,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'unalteredSource':True})
 else:
  d.rounded_rectangle((72,250,1848,914),radius=24,fill='#111e31',outline='#2b435e',width=2)
  if i==3:
   for j,t in enumerate(s['transactions'][:3]):
    y=281+j*143;d.text((105,y),t['method'],font=font(31,True),fill=FG);d.text((1000,y),'FINALIZED / SUCCESS',font=font(27,True),fill=MINT);d.text((105,y+48),t['hash'],font=font(22),fill=MUTED)
   d.text((105,742),'EVIDENCE SHA-256 · EXACT ORIGINAL BYTES',font=font(23,True),fill=MINT);d.text((105,791),s['evidenceHash'],font=font(23),fill=FG);d.text((105,852),'Corrected '+s['contract'],font=font(23),fill=MUTED)
  else:
   d.text((116,300),'proofpilot-anza0x.vercel.app',font=font(52,True),fill=FG);d.text((116,395),'github.com/haris4587/ProofPilot',font=font(42,True),fill=MINT)
   wrap(d,'Genuine provider result preserved. Three corrected lifecycle transactions succeeded. Strict adjudication failed; no valid verdict exists.',116,510,1630,37)
   d.text((116,740),'87 automated tests · exact receipts · reproducible evidence',font=font(29),fill=MUTED)
   d.text((116,813),'No extra Heurist call. No retry. No fabricated outcome.',font=font(29),fill=AMBER)
 d.rectangle((0,942,1920,1080),fill='#122036');wrap(d,caption,72,961,1760,30)
 d.text((72,1038),'proofpilot-anza0x.vercel.app   |   github.com/haris4587/ProofPilot',font=font(21),fill=MUTED)
 d.rectangle((0,1073,int(1920*sum(x[0] for x in scenes[:i+1])/45),1080),fill=MINT)
 im.save(OUT/f'scene-{i+1:02}.png')
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-loop','1','-i',str(OUT/f'scene-{i+1:02}.png'),'-t',str(dur),'-vf',f'fps=24,format=yuv420p,fade=t=in:st=0:d=0.18,fade=t=out:st={dur-.18}:d=0.18','-c:v','libx264','-preset','veryfast','-crf','25','-threads','2',str(OUT/f'clip-{i+1:02}.mp4')],check=True)
voice='Proof Pilot makes A I research accountable to an agreement. Internet Court supplies the mandate and dispute pattern. The original mandate preceded research. Heurist Mesh delivered a genuine Aave result, preserved with its source limitations. A later recovery mandate openly reuses that research. On Gen Layer Studio net, the mandate, exact delivery, and dispute finalized successfully. Independent adjudication then rejected reason and quotation formatting and one response shape. The transaction finalized with an execution error. The task remains disputed. No verdict or decision hash exists. Eighty seven tests passed. Explore Proof Pilot and GitHub. Successful adjudication remains required for mission completion.'
(OUT/'narration.txt').write_text(voice+'\n');(OUT/'concat.txt').write_text(''.join(f"file 'clip-{i+1:02}.mp4'\n" for i in range(6)))
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','lavfi','-i',f"flite=textfile='{OUT/'narration.txt'}':voice=slt",str(OUT/'narration.wav')],check=True)
seconds=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(OUT/'narration.wav')]))
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',str(OUT/'concat.txt'),'-i',str(OUT/'narration.wav'),'-af',f'atempo={seconds/43.5:.6f},apad,afade=t=out:st=44:d=1','-c:v','copy','-c:a','aac','-b:a','128k','-t','45','-movflags','+faststart',str(OUT/'ProofPilot-verified-progress.mp4')],check=True)
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(OUT/'ProofPilot-verified-progress.mp4')]))
(OUT/'probe.json').write_text(json.dumps(probe,indent=2)+'\n');(OUT/'assets.json').write_text(json.dumps({'status':'BLOCKED_PROGRESS_REPORT_NOT_SUCCESSFUL_MISSION_DEMO','resolution':[1920,1080],'durationSeconds':45,'fps':24,'narration':'Synthetic English (libflite slt), editorial voice-over, not partner speech','assets':assets,'transactionRecord':'evidence/corrected-lifecycle-2026-11-13/summary.json'},indent=2)+'\n')
start=0;subs=[]
for i,(dur,title,subtitle,shot,caption) in enumerate(scenes):
 def tc(t):return f'00:00:{t:02d},000'
 subs.append(f'{i+1}\n{tc(start)} --> {tc(start+dur)}\n{caption}\n');start+=dur
(OUT/'captions.srt').write_text('\n'.join(subs))
print('Rendered narrated 45-second genuine progress MP4:',(OUT/'ProofPilot-verified-progress.mp4').stat().st_size,'bytes')
