from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps
import textwrap,json,subprocess
root=Path(__file__).resolve().parents[3]; base=root/'evidence/e2e'; out=Path(__file__).resolve().parent
sans='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def font(n,b=False): return ImageFont.truetype(bold if b else sans,n)
bg='#090f1b'; fg='#edf4ff'; muted='#9eacc5'; mint='#66e2cc'; amber='#ffd180'
def wrap(draw,text,x,y,width=1700,size=32,color=fg):
 line=''
 for word in text.split():
  candidate=(line+' '+word).strip()
  if draw.textlength(candidate,font=font(size))>width:
   draw.text((x,y),line,font=font(size),fill=color);y+=int(size*1.5);line=word
  else:line=candidate
 draw.text((x,y),line,font=font(size),fill=color);return y+int(size*1.5)
scenes=[
 (5,'ProofPilot','Internet Court  /  Heurist  /  GenLayer','00-dashboard.jpg','Verification preview. The live partner demo is still incomplete.'),
 (7,'01—02 / Agreement first','OFFLINE WALKTHROUGH + REAL BROWSER MANDATE','02-mandate-review.jpg','Aave assignment entered. A separate real mandate finalized successfully.'),
 (8,'03 / Provider execution','BLOCKED — NO HEURIST API KEY','03-agent-ready.jpg','This screenshot shows an offline fixture. No genuine provider run occurred.'),
 (10,'04—05 / Commit and dispute','REAL STUDIONET · CHAIN 61999',None,'Mandate, delivery and dispute finalized with successful execution.'),
 (10,'06 / Verify the outcome','FINALIZED TRANSACTION ≠ SUCCESSFUL VERDICT',None,'AI adjudication finalized with execution ERROR. Final state remains DISPUTED.'),
 (5,'ProofPilot / Reproducible evidence','46 TESTS PASSED · VERCEL PRODUCTION','16-live-browser-transaction.jpg','Next: secure Heurist credentials and successful semantic adjudication.')]
for i,(dur,title,label,shot,caption) in enumerate(scenes):
 im=Image.new('RGB',(1920,1080),bg);d=ImageDraw.Draw(im)
 d.rounded_rectangle((60,35,1860,85),radius=16,fill='#152332');d.text((82,43),'VERIFICATION PREVIEW  •  NOT THE FINAL MISSION SUBMISSION',font=font(22,True),fill=amber)
 d.text((70,110),title,font=font(48,True),fill=fg);d.text((74,181),label,font=font(24,True),fill=mint)
 if shot:
  pic=Image.open(base/'screenshots'/shot).convert('RGB');pic.thumbnail((1760,690),Image.Resampling.LANCZOS);im.paste(pic,((1920-pic.width)//2,233))
 else:
  d.rounded_rectangle((70,250,1850,915),radius=25,fill='#101c2e',outline='#254157',width=2)
  run=json.loads((base/'network/run.json').read_text())
  if i==3:
   for j,row in enumerate(run['transactions'][:3]):
    y=295+j*175;d.text((105,y),row['method'],font=font(34,True),fill=fg);d.text((105,y+55),'FINALIZED  /  SUCCESS',font=font(27,True),fill=mint);d.text((105,y+104),row['hash'],font=font(22),fill=muted)
   d.text((105,840),'LOCAL RESEARCH FIXTURE — NOT HEURIST OUTPUT',font=font(24,True),fill=amber)
  else:
   d.text((110,295),'No verdict applied',font=font(60,True),fill=amber)
   wrap(d,'The bounded validator attempt rolled back: invalid grounded decision. No unsupported verdict was substituted.',110,400,1600,36)
   d.text((110,550),'Finalized contract state: DISPUTED',font=font(36,True),fill=fg)
   d.text((110,625),'Adjudication transaction',font=font(27),fill=muted);d.text((110,675),run['transactions'][3]['hash'],font=font(22),fill=muted)
   d.text((110,790),'ACCEPTED / REJECTED / INCONCLUSIVE: fixture tests only',font=font(27),fill=fg)
 d.rectangle((0,940,1920,1080),fill='#111e30');wrap(d,caption,72,961,1760,30)
 d.text((72,1041),'proofpilot-anza0x.vercel.app   |   github.com/haris4587/ProofPilot',font=font(21),fill=muted)
 d.rectangle((0,1073,int(1920*sum(s[0] for s in scenes[:i+1])/45),1080),fill=mint)
 im.save(out/f'scene-{i+1:02}.png')
 # Frame transitions and a gentle 0.2-second fade preserve readable static evidence.
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-loop','1','-i',str(out/f'scene-{i+1:02}.png'),'-t',str(dur),'-vf',f'fps=24,format=yuv420p,fade=t=in:st=0:d=0.2,fade=t=out:st={dur-0.2}:d=0.2','-c:v','libx264','-preset','veryfast','-crf','20',str(out/f'clip-{i+1:02}.mp4')],check=True)
(out/'concat.txt').write_text(''.join(f"file 'clip-{i+1:02}.mp4'\n" for i in range(len(scenes))))
voice='Proof Pilot connects research agreements, evidence, and dispute review. This is a verification preview, not a completed mission submission. The Aave assignment was tested through all six offline stages. A separate browser mandate finalized successfully on Studio net. Heurist execution is blocked because its secure API key is missing. No fixture is presented as provider output. Real mandate, delivery, and dispute transactions finalized successfully. But A I adjudication finalized with an execution error. The contract remains disputed, with no verdict applied. Forty six tests passed. The website is live on Vercel. Genuine provider evidence and successful adjudication are still required.'
(out/'narration.txt').write_text(voice)
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','lavfi','-i',f"flite=textfile='{out/'narration.txt'}':voice=slt",str(out/'narration.wav')],check=True)
seconds=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(out/'narration.wav')]))
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',str(out/'concat.txt'),'-i',str(out/'narration.wav'),'-af',f'atempo={seconds/43:.6f},apad,afade=t=out:st=44:d=1','-c:v','copy','-c:a','aac','-b:a','160k','-t','45','-movflags','+faststart',str(root.parent/'ProofPilot-verification-preview.mp4')],check=True)
# Six-stage contact sheet from unaltered browser screenshots, labeled for inspection.
contact=Image.new('RGB',(1800,1390),bg);cd=ImageDraw.Draw(contact)
for j,name in enumerate(['01-assignment.jpg','02-mandate-review.jpg','03-agent-ready.jpg','04-evidence.jpg','05-dispute.jpg','06-review.jpg']):
 pic=Image.open(base/'screenshots'/name).convert('RGB');pic.thumbnail((580,605),Image.Resampling.LANCZOS);x=10+(j%3)*600;y=65+(j//3)*680;contact.paste(pic,(x,y));cd.text((x,y-35),f'{j+1:02} / '+name.split('-',1)[1].replace('.jpg',''),font=font(22,True),fill=fg)
contact.save(base/'screenshots/six-stages-contact-sheet.jpg',quality=90)
print('Rendered 45-second narrated preview')
