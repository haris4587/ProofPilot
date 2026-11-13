# Approved correction deployment — 13 November 2026

One explicitly authorized deployment, one submission, no retry. Status FINALIZED, execution SUCCESS. The source retrieved independently after finality exactly matches the approved 13,709-byte candidate. This proves deployment success and source integrity, not future adjudication reliability.

- Chain: GenLayer Studionet 61999
- Corrected contract: [0xdcDdcB1C570700Da7C3d6c98E9FCC23801608373](https://explorer-studio.genlayer.com/address/0xdcDdcB1C570700Da7C3d6c98E9FCC23801608373)
- Deployment transaction: [0x38da8445e7503ce1c0d04556a24edb4df0f9d11d48433943448a2add906ad1f7](https://explorer-studio.genlayer.com/transactions/0x38da8445e7503ce1c0d04556a24edb4df0f9d11d48433943448a2add906ad1f7)
- Source SHA-256: b68dcb73a839a53e8875d5c65e03069dab936fdfee1e45a053d9876634a9425a
- Owner/deployer retained: 0x67Da51Fd9AC1d52F34F5d01d06da8548979fC514
- Constructor [], value 0 requested through Studio's zero-value deployment default, leaderOnly false, consensusMaxRotations 2. Receipt exposes value_credited=false rather than a numeric transaction-value field.
- Latest finalized get_count: 0. No new task, delivery, dispute or adjudication exists on this contract.
- Existing Studio account was accessible; no new account, funding or key export was needed.
- Pre-deployment tests: 47 JavaScript tests and 40 Python mocked-contract tests passed, including all four correction regressions.

## Exact next approval — not executed

migration-plan.json contains all four exact method arguments for task pp-corrected-18ec1e64ccb747d8 and this new contract. Every transaction is value 0, leaderOnly false, maximum two rotations, maximum one submission. Verify the retained owner before writing. Proceed sequentially only after FINALIZED/SUCCESS and independently verified expected finalized state. Stop on failure, unknown finality, mismatched bytes/hash/owner, or purchased quota/funding requirement. Do not retry automatically or deploy another candidate if adjudication fails.

1. create_assignment with the unchanged reviewed canonical mandate; mandate SHA-256 ea0c7ee8300f76a9eee5a06794a5c393c79b734c8945a872b4d78f88ba580c73. Expected state AGREED.
2. submit_delivery with the exact authentic 4,935-byte bundle; evidence SHA-256 63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500. Verify DELIVERED state, hash and exact stored bytes.
3. open_dispute with: Please independently review whether the research delivery satisfies every requirement in the original mandate. Verify DISPUTED state and unchanged evidence hash.
4. ONE bounded adjudicate of this task. Only a FINALIZED/SUCCESS transaction, DECIDED state and verified receipt/decision hash establish a verdict. Genuine ACCEPTED, REJECTED or INCONCLUSIVE is allowed; execution ERROR is not a verdict.

The same explicit retrospective research disclosure remains in deliveryConditions. Research was received on 12 November before the later replacement mandates; it is not presented as a new agent run. The absent citation [6], five provider URLs and three limited excerpts are preserved unchanged. No Heurist request is permitted by this plan. offline-validation.json records deterministic mocks for the first three transitions; these are not network receipts or actual new task states.

## Frontend preparation and preserved history

frontend-configuration-plan.json prepares the public VITE_CONTRACT_ADDRESS value and activation gate, without applying it. Production currently targets V1; the historical V2 read-only evidence archive stays address-scoped. After a separately approved lifecycle produces a genuine successful verdict, activate the corrected address, isolate stale drafts by contract, preserve V1/V2 receipts and explorer links, then test/CI/release the existing Vercel project. HEURIST_API_KEY and PROOFPILOT_OPERATOR_TOKEN remain untouched. No frontend redesign or contract security change is made.

Original V1: https://explorer-studio.genlayer.com/address/0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f

Diagnostic V2: https://explorer-studio.genlayer.com/address/0x8d64250Eb8c3Eafb8628482d2381799189055a90

Their tasks, failed adjudications, source and receipts are preserved. The current 45-second MP4 remains an honestly labeled blocked-progress report. Mission submission and final successful demo still require the approved lifecycle to produce an actual successful adjudication. No new verdict is claimed.

## Read-only reproduction

Use genlayer-js 1.1.8 createClient({chain:studionet}); getTransaction with the deployment hash; require statusName FINALIZED and leader execution_result SUCCESS. getContractCode(address) returns the source UTF-8 bytes; hash with SHA-256 and compare above. readContract get_count, args [], transactionHashVariant LATEST_FINAL returns 0 before any migration. These reads need no signing key. deployment-receipt.json, deployed-source.py and verification.json archive the actual responses. checksums.json verifies file bytes.
