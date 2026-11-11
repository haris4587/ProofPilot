# Production end-to-end audit — 11 November 2026

**Result: partially verified; NOT ready for a completed three-partner mission submission.** No paid requests, real funds or private-key exports were used. Existing project and contract were preserved.

## Automated checks

46 checks passed locally (24 JavaScript and 22 Python), plus TypeScript, ESLint and production build. GitHub Actions independently passed on the deployed source: https://github.com/haris4587/ProofPilot/actions/runs/43065220076 . The contract tests mock GenVM; ACCEPTED, REJECTED and INCONCLUSIVE there are fixtures, not network verdicts.

## Actual production browser walkthrough

All six stages were exercised on https://proofpilot-anza0x.vercel.app/ using the requested Aave title, objective, three facts, five criteria, minimum two sources and review requirement. The title prefixes the objective because the existing immutable schema has no separate title field. The requested review rule is in delivery conditions; the protocol's fixed dispute rules remain visible.

1. Assignment: empty-field validation, exact criteria entry, navigation and session tracking checked.
2. Lock: offline immutable mandate and SHA-256 exported. Editing then requires a new assignment.
3. Execute: clearly labeled offline output loaded. It intentionally lacks adequate sources and is NOT a Heurist response.
4. Delivery: malformed JSON error checked, corrected manifest accepted, exact evidence bytes and hash exported.
5. Dispute: offline dispute transition checked; duplicate opening prevented after fix.
6. Review: expected INCONCLUSIVE for absent evidence. Export explicitly says offline-fixture and finalized:false. No fake blockchain receipt.

Screenshots 01–08 cover the six stages and dashboard. 12–14 show fixes; 15 shows live loading; 16 shows a real finalized successful browser mandate. Exports are under exports/. Hashes independently recomputed from downloaded bytes:

- Mandate: b8131167584f7aaee3ee0405f998d6cbd14aab0f39994f8a10beea5b4ff8d0e9
- Offline delivery: 450b30b0e290d6b7418372ad7853bcf6f82e89444fb882204106a47f235ad1bf
- Aave network delivery: c27a937939424497cfa193c324f0fc8fa9b367e66dbd023eb0912a79f1bceba8

The dashboard recorded one assignment, one delivery and zero finalized verdicts after the offline run; the live mandate adds another session assignment. Offline integrity reads Local hash. Counts describe only the current browser session and include labeled offline milestones, never global platform metrics. No final verdict count increased on failed adjudication.

Desktop tested. Browser zoom reflow checked at 545 and 340 CSS pixels (not physical-device emulation): document width was 539 and 337 respectively, with no horizontal document overflow. Mobile navigation and workflow remained usable. Console capture contained zero application warnings/errors after excluding browser-extension messages. /api/status returned 200; unauthenticated POST /api/research returned 401; GET returns 405. Latest deployment runtime error/fatal query over 10 minutes returned no matching records; this is not a guarantee about all historical logs.

## Bugs fixed and deployed

- Raw schema errors replaced with readable field validation; malformed evidence JSON has a clear message.
- New assignment resets the locked draft, while Open workspace retains it.
- Session counters now record successful milestones once, survive reload and avoid duplicate recovery counts.
- Offline integrity and receipt explicitly identify local hashes, expected outcomes and no finality.
- Duplicate offline disputes disabled.
- Critical Studionet receipt mismatch: numeric status 7 is normalized with the official SDK mapping; success additionally requires SUCCESS execution. Broadcast/accepted alone never qualifies.

Fix commits: 636c150aa1729b574e2eeaf593c62952e4534621 and e932ea8afbd01d8f1f6c6565e0ac71a05a206c3f. Production deployment dpl_F6DxRyxH8dz9uPoKzqgGYeRYnMkB is READY with e932ea8 source metadata. It was uploaded through Vercel directly; automated GitHub-to-Vercel imports reported a missing installation and are not claimed working.

## Real Studionet evidence

Stable Studionet, chain 61999. Existing contract 0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f was read successfully and not redeployed. Its network source equals archived deployed-source.py (SHA-256 952b7842db7f54aad4ed9d50d571eb9d75b6f3cada81e709de2b993fcd8d49d2); current source differs only in a defensive None guard for retrieved content.

The Aave run used an ephemeral gasless developer account, locally authored research and pinned attributable summaries, NOT Heurist. Two independent publishers are attributed; the files are analyst paraphrases, not authenticated publisher snapshots. Each pinned file's actual bytes are hashed. See network/run.json and individual receipt/state files.

| Step | Transaction | Verified result |
|---|---|---|
| Create mandate | 0x0a908886c45f664fe515f4d65505de056148897e04b679a4c5cdda569658ee3f | FINALIZED / SUCCESS |
| Commit delivery | 0xdb280cda90a62e95f490995d9f3aacd7d6c50753d3e893bf243438e6a2c7db0e | FINALIZED / SUCCESS |
| Open dispute | 0xd0b2234ca2357109bcd603ba811d025566c436adfd5d8c538124046af9dbde49 | FINALIZED / SUCCESS |
| AI adjudication | 0xe67b06242e9379510ea7543337556f3a9177ba1ed42f717cdce826e4f2538a31 | FINALIZED / ERROR; no verdict applied |

Explorer URL for each is https://explorer-studio.genlayer.com/transactions/ followed by its full hash; run.json contains clickable exact URLs. The adjudication's bounded validator attempt returned a grounded-decision validation rollback (`[LLM_ERROR] Invalid grounded decision; rotate validator`). Its exact invalid model output is not exposed in the saved receipt, so no root cause is asserted. A finalized-state read confirms task aave-e2e-mwcde45j remains DISPUTED. Network consensus was attempted; successful semantic consensus was NOT obtained.

An additional synthetic run created and delivered a DemoLend fixture. Its client wait hit an RPC error, then independent getTransaction and LATEST_FINAL reads confirmed delivery finalized SUCCESS and state DELIVERED. It did not reach dispute/adjudication. The original run.json preserves the client error rather than rewriting history. Correction receipts are synthetic_delivery-transaction.json and finalized-state-reads.json. The earlier mandate-only numeric-status discovery is kept in network-initial/; its false executionVerified flag reflected the old parser, not failed chain execution.

The actual browser separately finalized task pp-3e4343ca-b1c as AGREED, transaction 0x588b72936f26043dd0728da770e430ab18a0a226b4a70da730edac38f39228bc. Screenshot 16, browser-live-result.txt, browser_mandate-transaction.json and finalized-state-reads.json agree. No owner keys are archived.

## Secure configuration and outstanding gates

PROOFPILOT_OPERATOR_TOKEN was generated strongly and saved as a sensitive production variable; VITE_CONTRACT_ADDRESS points to the existing contract. HEURIST_API_KEY is absent. /api/status confirms heuristConfigured:false and operatorConfigured:true. No provider response or provider credit use occurred.

Required user action: add HEURIST_API_KEY securely in Vercel project settings and explicitly authorize one bounded request if it consumes paid credits. Never paste the key into chat. A production redeploy must then pick up the key. A successful real Heurist receipt and successful finalized semantic adjudication still need to be captured. If diagnosis shows the contract must change, a new deployment requires separate authorization; no replacement was deployed here.

## Reproduction

1. npm ci; npm test; npm run test:contract; npm run typecheck; npm run lint; npm run build.
2. Open production, keep Offline walkthrough enabled, enter assignment fields, lock, execute fixture, commit, dispute, review and export. Inspect labels rather than treating a fixture as provider/network evidence.
3. Independently hash exported bytes with sha256sum. Public network receipts contain transaction hashes; query getTransaction and read get_task with TransactionHashVariant.LATEST_FINAL. Require FINALIZED plus SUCCESS, then verify the decision exists in final state.
4. Optional new gasless contract test (creates public test records): EVIDENCE_COMMIT=636c150aa1729b574e2eeaf593c62952e4534621 node scripts/e2e-studionet.mjs . The default Aave profile uses LOCAL report bytes. PROOFPILOT_NETWORK_PROFILE=synthetic selects the separate synthetic profile. Account keys remain process-local and are not exported; an interrupted process cannot resume ownership. A failed RPC wait does not authorize blindly repeating a write: inspect the saved hash first.
5. For a genuine partner run, securely configure credentials, use the live workflow with a fresh locked mandate before the provider call, pin the actual report and sources, then verify all four finalized successful writes and final decision. Do not relabel this existing local report as provider output.

## Video

A 45-second narrated verification preview and exact editing plan accompany this audit. It explicitly shows the missing provider key and failed adjudication. It is NOT the requested final successful mission demo. Replace those two segments only after genuine receipts exist. Official partner logos and a human-quality narration pass are also required for the polished submission version; the preview uses text names, not invented logos.
