# One bounded finishing authorization — ProofPilot

Prepared only. No network writes, deployment, funding, purchases or new Heurist request were performed. Source candidate is local; it has not been pushed to GitHub. Approval of this plan does not promise successful consensus.

## Exact candidate and immutable inputs

| Item | Exact value |
| --- | --- |
| Source commit (local) | `4a0a30266c107aaa5db2fa363720ba8438ad06c5` |
| Contract | `contracts/proof_pilot_v3.py` / `ProofPilotV3` |
| Source SHA-256 | `c0ff057d983c72ba0df0cc04021a993ffde4c0d0e97ba3aedf49d71efa293296` |
| Runner | `py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6` |
| Constructor | `[]` |
| Network / RPC | Studionet 61999 / https://studio.genlayer.com/api |
| Explorer | https://explorer-studio.genlayer.com |
| Transaction value / leaderOnly / rotations | `0` / `false` / `0` |
| Required Studio owner | `0x67Da51Fd9AC1d52F34F5d01d06da8548979fC514` |
| New task ID | `pp-structured-18ec1e64ccb747d8` |
| Canonical mandate SHA-256 | `ea0c7ee8300f76a9eee5a06794a5c393c79b734c8945a872b4d78f88ba580c73` |
| Exact delivery SHA-256 | `63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500` (4,935 bytes) |
| New contract address | Unassigned until the single approved deployment; never reuse a previous address |

Exact canonical mandate, exact original bundle and every function argument are embedded in [authorization.json](evidence/structured-candidate-2026-11-13/authorization.json). The mandate is identical to the corrected historical nine-criterion recovery mandate, including disclosure that research predates it. No extra or changed acceptance criterion. All prior tasks, contracts and evidence remain preserved.

## Evidence supporting this candidate

57 Python tests and 47 JavaScript tests passed, along with lint, production build/typechecking, GenVM AST/pinned-SDK validation and ABI extraction. Real pinned-SDK native direct mode exercised the lifecycle, captured validator and closure serialization with mocked I/O. These do not prove WASM execution or network consensus. Two desktop/mobile browser tests are prepared and discoverable, but host socket permissions prevented execution; supported CI must run them before releasing or sending chain writes. Published base commit CI is successful; candidate CI has not run because no code was pushed.

See [review](evidence/structured-candidate-2026-11-13/REVIEW.md) for why the change removes generated quotation/ASCII-prose failure points while retaining semantic consensus and a separate source relevance check. Invalid compact responses still fail closed. Model agreement, source availability, relevance reasoning and live runtime remain uncertain.

## Costs, quotas and funding boundary

Read-only RPC returned chain `0xf22f` (61999), gas price `0x0` and historical owner's balance `0x0`. These are observations, not a funding action or future fee guarantee. Expected explicit transfer is zero; require zero transaction value and zero fees at execution. Maximum authorized real-money spend is zero. No purchase, subscription, top-up, faucet, `sim_fundAccount`, account funding, paid provider execution, appeal or automatic retry is included. An exhausted development/provider/network quota stops the run. Contract adjudication uses at most one prompt per leader and two per independently verifying node per execution; zero configured rotations. Actual validator count and backend quota must be read before sending; do not reduce independent validation to save quota.

Historical `sim_fundAccount` entries have no complete archived parameters/effects. Installed SDK inspection finds an explicit funding action, not a funding call inside its inspected deployment/write paths; this does not explain Studio UI internals. A public Studio bundle GET returned 403. Do not assume UI auto-funding is absent or that a zero balance proves no historical funding. If no-funding behavior cannot be established for the sending path, stop before deployment. [Funding read-only report](evidence/structured-candidate-2026-11-13/funding-check.json).

## Ordered execution after approval

1. Verify this exact local source commit and file SHA-256, rerun input verification, and inspect the selected Studio built-in account **before any deployment**. It must be the required owner above and remain usable for all four lifecycle writes. No private key export, MetaMask requirement or silent owner substitution. If it is unavailable, stop.
2. Publish the reviewed branch to the existing public GitHub repository and run its CI, including pinned SDK and both browser projects. Do not merge/main-deploy yet. Check Vercel Git integration first: avoid automatic branch previews if they are disabled already; if Git publication automatically creates a preview, this authorization permits at most one existing-plan, zero-purchase preview. No production promotion at this stage. Fix no behavior through speculative deployments; any changed contract source invalidates this source approval.
3. Read network, fee, quota, validator and funding behavior. Confirm an execution path using the Studio built-in wallet that enforces **one outbound send per operation, zero rotations and zero automatic resends**. Existing `scripts/deploy.mjs` and `src/chain.ts` request rotations 2 and are **not** this execution procedure. genlayer-js 1.1.8 also contains an ABI-mismatch fallback send; block that with a one-send transport budget or use confirmed Studio controls with equivalent guarantees. If these controls cannot be enforced, stop. Read-only polling may repeat; signing/submission may not.
4. Deploy `ProofPilotV3` exactly once, no constructor arguments, value zero, leaderOnly false, rotations zero. Wait for FINALIZED / SUCCESS. Verify retrieved deployed source SHA-256 equals the approved source and schema has four writes/three views. Record the assigned address and explorer deployment link; no next step until verified.
5. `create_assignment` once with the exact task ID, canonical mandate string and hash in authorization.json. Require FINALIZED / SUCCESS, correct owner, AGREED and identical mandate commitment.
6. `submit_delivery` once with the exact original bundle bytes/hash. Require FINALIZED / SUCCESS, DELIVERED, exact byte count, provenance and evidence hash. No new Heurist request.
7. `open_dispute` once using the exact bounded reason in authorization.json. Require FINALIZED / SUCCESS and DISPUTED. No automatic migration of any previous task.
8. `adjudicate` **once only**, rotations zero, leaderOnly false. Wait for FINALIZED and execution SUCCESS, then read latest-final task. Require DECIDED, nine validated states, correct deterministic outcome, exact citations resolved against the pinned bytes, matching mandate/evidence hashes and recomputed decisionHash/audit chain. ACCEPTED, REJECTED or INCONCLUSIVE are honest possible decisions; a provider/runtime failure is not a verdict. No re-send, leader rotation request, new deployment, appeal or funding if it fails.
9. Only after genuine successful adjudication: update the existing frontend/archive with the actual new contract, outcome, receipt and explorer links. Keep historical records. Ensure the guided public reader works without private credentials; live writes require task ownership and live Heurist access remains operator-only. Run tests/CI and desktop/mobile/browser verification. Publish to the **existing Vercel project only**, at most one production release after verification. No alternate host, credential changes or paid plan.
10. Finish the 43-second professional film from actual interface/receipt footage, authentic three logos, synchronized English narration, captions and credited/original music. The gated storyboard and logo credits are prepared. Preserve existing honest progress video. Watch/listen to the export, verify <=45 seconds, 1080p H.264/AAC, visible logos and real outcome/hash. Save project/edit/narration/caption assets.
11. Update public README, REPRODUCE, EVIDENCE, DEPLOYMENT, SECURITY and SUBMISSION with only observed results. Verify repository public access, secret scan, final CI success and every explorer link. Prepare the mission submission; submit only when every user acceptance criterion, including professional final video, has been verified. No incomplete-success submission.

## Hard stops and total budget

Five blockchain writes maximum: one deployment plus create, delivery, dispute and one adjudication. Zero automatic retries anywhere in submission; bounded read-only receipt polling is allowed. On submission uncertainty preserve the hash, inspect reads and stop; do not resend. Stop on mismatched source/hash/owner/network/schema, failing tests, unsupported sending controls, unavailable evidence, model disagreement, invalid model output, nonzero fee, funding/payment requirement, quota error, execution error or inability to establish finality. No automatic fallback contract.

If final adjudication fails, preserve the current genuine progress film and record the new real blocker. Leave the mission incomplete. If the chain succeeds but production/video verification fails, stop publication/submission until that issue is fixed; never portray offline decisions as live consensus.

## Consolidated decision requested

Approve publishing/testing this exact candidate, then the **five zero-value/zero-fee development writes** under these gates, followed only on verified success by the existing Vercel release, final 43-second video and evidence-based mission completion. Funding, purchases, new Heurist requests, retries and further contract replacements remain excluded. Nothing in this plan has been executed remotely.
