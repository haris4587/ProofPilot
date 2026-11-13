# Prepared deployment/migration plan — NO authorization to execute

Original V1 contract stays at 0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f and original tasks, receipts and evidence are preserved. V2 has NOT been deployed. Production VITE_CONTRACT_ADDRESS remains V1. Existing DISPUTED state cannot be moved or overwritten by a repository update; V2 has no import/upgrade endpoint.

## Phase A: smallest proposed network action

One deployment of reviewed contracts/proof_pilot_v2.py on Stable Studionet chain 61999, constructor args [], transaction value 0, leaderOnly false, consensusMaxRotations 2, using an explicitly approved accessible Studio/development account. The old owner was 0x98ed19cBF7541be09f3e5EFc13bddeAd99f8dF85, but the retained Cloud Browser tab is no longer present as of the 13 November read-only inventory. The freshly opened tab has no saved task draft. Do not claim that the old owner is still accessible. If no authorized accessible account exists, approval must explicitly include creation of one empty local disposable Studionet account for V2. Never export a key or fund it. This account cannot take over the existing V1 task. Constructor initializes count only; it makes no LLM/Heurist call. Stop on unknown account, failure or uncertain finality. No automatic repeat. Wait for FINALIZED and execution SUCCESS, then read deployed code and verify the source hash in candidate.json and empty get_count=0. No website configuration change is authorized by this plan.

This action needs separate explicit user approval. Studionet transaction value is zero and no real funds, purchases or subscriptions are permitted. Development network gas/validator quotas may apply; an exact monetary fee quote is unavailable from the read-only tooling. If real funds or paid credit purchase are required, stop rather than pay. Deployment success does not prove adjudication reliability.

## Phase B: separately approved migration writes after address is known

Proposed new task ID: pp-v2-review-18ec1e64ccb747d8. The new V2 commissioning owner must be verified immediately before writes; it may differ from the inaccessible V1 owner only with explicit approval. Preserve that distinction in migration evidence. New V2 address must be included in the approval request.

1. create_assignment('pp-v2-review-18ec1e64ccb747d8', EXACT evidence/recovery-preparation-2026-11-12/replacement-mandate.json canonical bytes, 'ea0c7ee8300f76a9eee5a06794a5c393c79b734c8945a872b4d78f88ba580c73'). The logical adjudicator remains GenLayer:61999:ProofPilot, not an embedded address. The transaction recipient changes to the explicitly approved V2 address. The same delivery conditions disclose research predating replacement. No new research is requested or claimed.
2. Verify FINALIZED/SUCCESS and latest finalized AGREED state, same owner and mandateHash.
3. submit_delivery(new ID, EXACT original evidence/heurist-funded-attempt-2026-11-12/delivery-prepared.json 4,935 bytes, '63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500'). Reverify all pinned bytes; do not add diagnostic annotations to authentic delivery.
4. Verify finalized success, DELIVERED state, exact bundle bytes and evidenceHash.
5. open_dispute(new ID, 'Please independently review whether the research delivery satisfies every requirement in the original mandate.'). Verify finalized success and DISPUTED state.
6. STOP and obtain separate explicit approval for ONE bounded adjudicate(new ID), value 0, leaderOnly false, consensusMaxRotations 2, no transaction retry. If it fails, preserve codes/hashes and stop. If it succeeds, verify FINALIZED plus execution SUCCESS, DECIDED state, strict decision rules and receipt hash. Never promise ACCEPTED; no synthetic fixture may be presented as real consensus.

No production contract switch until successful source/finality checks and explicit approval. The frontend can be reviewed against V2 separately; preserved V1 evidence must stay visibly address-scoped. No network action in either phase was executed in preparing these files.
