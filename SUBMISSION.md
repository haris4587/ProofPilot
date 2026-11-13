# ProofPilot — mission submission draft (BLOCKED)

Mission: Internet Court Partner Demo Lab, November 9–23, 2026.

Project: ProofPilot — AI Agent Delivery Court.

Description (copy-ready, truthful): ProofPilot gives AI research an immutable mandate, attributable Heurist execution evidence and independent GenLayer dispute review. It implements Internet Court's mandate/action-receipt/review-decision pattern as a protocol adapter, without claiming an official filing API. A genuine Heurist Mesh ExaSearchDigestAgent research result is preserved byte-for-byte with provenance and three commit-pinned source hashes. On Studionet 61999, its disclosed retrospective V2 mandate, exact delivery and dispute finalized successfully. The bounded V2 adjudication failed strict output validation and rolled back; no verdict exists. Source, tests, receipts, limitations and a narrated progress video are public. Successful adjudication is still required before claiming mission completion.

- Repository: https://github.com/haris4587/ProofPilot
- Production (Vercel only): https://proofpilot-anza0x.vercel.app/
- V2 contract: https://explorer-studio.genlayer.com/address/0x8d64250Eb8c3Eafb8628482d2381799189055a90
- V2 deployment: https://explorer-studio.genlayer.com/transactions/0xca8d01c87659b60cf40611f768f664e884e1ac54af1c17cc994d5003c75a0c2c
- Preserved V1: https://explorer-studio.genlayer.com/address/0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f
- Genuine provider evidence: https://github.com/haris4587/ProofPilot/tree/eeab424cb2a01404c7ef3f7a9c2ab9960edf990d/evidence/heurist-funded-attempt-2026-11-12
- Exact source commit: https://github.com/haris4587/ProofPilot/tree/256420256b995e55543241e9b4e616a95a262699/evidence/heurist-funded-attempt-2026-11-12/sources
- Current receipts and diagnostic fingerprints: evidence/v2-lifecycle-2026-11-13/
- Finalized mandate SHA-256: ea0c7ee8300f76a9eee5a06794a5c393c79b734c8945a872b4d78f88ba580c73
- Finalized evidence SHA-256: 63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500
- Decision hash: NONE — execution error, no verdict.
- CI: 87 tests plus type checking, lint and build passed: https://github.com/haris4587/ProofPilot/actions/runs/43376785296 (application commit e39a141f37183bcd7374d3aa7f25f2cb5f41ea2f). Deployment/browser evidence: evidence/v2-lifecycle-2026-11-13/release-verification.json
- Video: evidence/final-demo-2026-11-13/ProofPilot-verified-progress.mp4 — 45-second narrated verification report, explicitly NOT a successful mission film.

| Method | Verified result | Transaction |
| --- | --- | --- |
| create_assignment | FINALIZED / SUCCESS | [Explorer](https://explorer-studio.genlayer.com/transactions/0x209d8e8e899b1f68ab896698969666573e0e68e50a217c11fb804153b29823ad) |
| submit_delivery | FINALIZED / SUCCESS | [Explorer](https://explorer-studio.genlayer.com/transactions/0xfa6672091cdb93481e4505dca8da5bdf511c4f6078d0f5b2397f51d2603c62e4) |
| open_dispute | FINALIZED / SUCCESS | [Explorer](https://explorer-studio.genlayer.com/transactions/0x33edab7de57f447890e7eaaf768be556b056a098f8a479db038b4e68278178cb) |
| adjudicate | FINALIZED / ERROR | [Explorer](https://explorer-studio.genlayer.com/transactions/0xf70976a7d9effddb50ad4bd208c6c98b7ea39939a77a3eb22767177e57ad6dd9) |

## Technical integration and limitations

Internet Court provides the immutable scope/rubric/action-receipt/dispute/review pattern. The server-only Heurist adapter checks the live Mesh schema and calls ExaSearchDigestAgent.exa_web_search under operator authorization. GenLayer locks canonical mandate/delivery SHA-256, independently retrieves/hash-verifies immutable evidence, reasons about each requirement and applies deterministic ACCEPTED/REJECTED/INCONCLUSIVE rules only after successful consensus. A strict semantic validator compares independently produced outcomes/criteria and requires exact grounded quotations. No weak format-only acceptance or invented verdict is used.

The original mandate preceded genuine research. V2's mandate explicitly discloses that the preserved research predates V2 commissioning. Provider reference [6] has no corresponding sixth URL; three bounded operator-captured excerpts do not establish every report claim. Provenance is an operator receipt, not a cryptographic provider attestation. Session dashboard counts are not global metrics. No escrow, legal ruling, funds transfer or remote Internet Court filing is claimed.

## Remaining completion blocker

Actual V2 diagnostics: five CRITERIA_STATE and one QUOTE_NOT_FOUND prompt failures across initial leader and two rotations. The exact invalid model text was not archived. A minimal prompt-only clarification is tested offline and remains undeployed. No further transaction, redeployment, Heurist call or retry is authorized. Do not submit this draft as a completed mission. It can be used as a truthful progress report only. A genuinely successful finalized adjudication, then production V2 switch and an updated successful final demo, remain required. No portal submission was made because the requested success evidence does not exist.
