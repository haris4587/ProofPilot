# ProofPilot — 45-second video package

## Current render

`ProofPilot-verification-preview.mp4` is a 1920×1080, 24 fps, 45-second H.264/AAC **verification preview**, edited from actual production screenshots and verified receipt data. It is not a screen recording and not the requested final successful mission film. English narration uses local Flite synthesis; this is intelligible draft speech, not a professional voice performance. There are no fabricated provider responses, verdicts, logos or transactions. All current frames explicitly mark the incomplete demo.

Reproduce from the repository root with `python3 evidence/e2e/video/render-preview.py`. Requirements: Python Pillow, FFmpeg with libx264 and the Flite filter, and DejaVu Sans fonts. The script creates scene PNGs, temporary clips, narration WAV and the MP4 beside the repository. The artifact package includes these editable assets. Source screenshots stay unaltered in `evidence/e2e/screenshots/`; captions live outside the screenshots.

## Exact current edit

| Time | Asset | Caption / evidence |
|---|---|---|
| 00–05 | 00-dashboard.jpg | Text names of three partners; verification-preview label |
| 05–12 | 02-mandate-review.jpg | Offline mandate screen; real separate browser mandate noted |
| 12–20 | 03-agent-ready.jpg | Heurist key missing; pictured output explicitly offline |
| 20–30 | network/run.json | Three successful finalized transaction hashes; local report provenance |
| 30–40 | network/run.json + finalized-state-reads.json | Adjudication ERROR; final state DISPUTED; no applied verdict |
| 40–45 | 16-live-browser-transaction.jpg | Passing tests, live Vercel site, remaining gates |

Fade in/out: 0.2 seconds per segment; mint progress bar; persistent preview banner; high-contrast captions; no audio/music licensing dependency. narration.txt contains exact spoken words. Captions are burned into the preview; scene PNGs allow editing. Inspecting the MP4 with ffprobe confirms duration, dimensions and streams.

## Final mission-film replacement plan (do not render as successful until evidence exists)

| Time | Required genuine asset | Suggested narration |
|---|---|---|
| 00–05 | Actual ProofPilot product + official Internet Court, Heurist and GenLayer logos | “ProofPilot turns agent research into accountable, evidence-backed delivery.” |
| 05–12 | Fresh assignment and locked on-chain mandate before agent execution | “First, lock the Aave research objective, required facts and evidence rules.” |
| 12–20 | Actual Heurist response, agent/tool, timestamp and response hash | “Heurist performs the research. Its actual response and sources are preserved.” |
| 20–30 | Commit and dispute writes, real validator consensus details | “Commit the delivery, open a dispute, and let GenLayer independently evaluate the evidence.” |
| 30–40 | Successful FINALIZED adjudication, state-read verdict, sources and exported receipt | “The finalized contract records the supported outcome, sources and tamper-evident receipt.” |
| 40–45 | Verified website and GitHub URL | “Explore ProofPilot, inspect the source, and reproduce the complete workflow.” |

Outstanding assets: authorized credentialed Heurist execution; successful finalized semantic adjudication; final-state receipt export; official partner logo files. Preserve whichever verdict the evidence supports, including INCONCLUSIVE. Never edit UI text to manufacture success. A human-quality narration replacement and optional licensed music can improve the final version. Existing technical capabilities can render video; missing external evidence, not the renderer, blocks the requested final film.
