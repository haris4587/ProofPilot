# V2 lifecycle and actual failure — 13 November 2026

Exactly four user-authorized transactions were submitted, once each, sequentially. Each of the first three reached FINALIZED / SUCCESS and its expected finalized state before the next write. The fourth finalized with execution ERROR, MAJORITY_DISAGREE, after two rotations. All writes stopped. No Heurist request, funding, purchase, subscription, contract deployment/upgrade or production contract-address change occurred.

| Method | Verified result | Transaction |
| --- | --- | --- |
| create_assignment | FINALIZED / SUCCESS | [Explorer](https://explorer-studio.genlayer.com/transactions/0x209d8e8e899b1f68ab896698969666573e0e68e50a217c11fb804153b29823ad) |
| submit_delivery | FINALIZED / SUCCESS | [Explorer](https://explorer-studio.genlayer.com/transactions/0xfa6672091cdb93481e4505dca8da5bdf511c4f6078d0f5b2397f51d2603c62e4) |
| open_dispute | FINALIZED / SUCCESS | [Explorer](https://explorer-studio.genlayer.com/transactions/0x33edab7de57f447890e7eaaf768be556b056a098f8a479db038b4e68278178cb) |
| adjudicate | FINALIZED / ERROR | [Explorer](https://explorer-studio.genlayer.com/transactions/0xf70976a7d9effddb50ad4bd208c6c98b7ea39939a77a3eb22767177e57ad6dd9) |

Contract: [0x8d64250Eb8c3Eafb8628482d2381799189055a90](https://explorer-studio.genlayer.com/address/0x8d64250Eb8c3Eafb8628482d2381799189055a90). Chain 61999. Owner 0x67Da51Fd9AC1d52F34F5d01d06da8548979fC514 was verified in Studio before writes. Full consensus and max rotations 2 were retained; zero-value Studio defaults were used. No private key was accessed/exported. Final state: DISPUTED, decision {}, no decision hash.

## Proven integrity

The deployed source SHA-256 remains 48eb272b98de3978248d6cd10a40b4cc9e9a5e508424ecba243c53cc98ef4e1f. Finalized mandate SHA-256 ea0c7ee8300f76a9eee5a06794a5c393c79b734c8945a872b4d78f88ba580c73. The exact 4,935-byte on-chain bundle equals the authentic archive; SHA-256 63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500. Original provider response and all three source URLs were fetched/hashed during preflight. Original research, missing reference [6], five listed URLs, three limited excerpts, and retrospective commissioning disclosure are unchanged. V1 remains untouched.

## Proven diagnosis, with limits

Initial leader and two rotations produced six bounded prompt attempts. Five recorded CRITERIA_STATE; one recorded QUOTE_NOT_FOUND. The final rollback was [PP_V2_PROMPT_FAILURE] CRITERIA_STATE|CRITERIA_STATE. Exact response fingerprints are in diagnostics.json and raw receipt stdout. These are actual diagnostic hashes, not reconstructed model answers.

CRITERIA_STATE occurs after exact object fields, outcome, reason bounds and nine-item criteria count passed. At least one entry did not equal SATISFIED, VIOLATED or UNKNOWN. QUOTE_NOT_FOUND occurs after shape, criteria, deterministic outcome and citation syntax/index/ASCII checks passed; one quotation was not a substring of its selected corpus entry. The archived response text does not reveal whether criteria used objects, casing, explanations or another invalid value. Do not claim a specific rejected shape or tie this directly to missing reference [6]. Validators rejecting rolled-back proposals do not demonstrate a substantive verdict disagreement.

## Smallest offline correction — NOT deployed

prompt-clarification.patch adds one prompt instruction: criteria must be JSON strings with the exact enum, explanations belong in reason, and quotes must decode to exact selected-source substrings rather than paraphrases or escaped presentation. The candidate changes no validator predicate, source retrieval, independent execution, deterministic outcome, attempt bound, ABI, storage or evidence. An AST regression proves only that prompt append differs from the deployed V2 source. Representative invalid criteria/quotes remain rejected, grounded synthetic output passes independent mocked execution, and exactly two failed prompt attempts remain the maximum. These tests do not prove a live model will comply. Rejected historical text is unavailable and never invented.

The deployed V2 is immutable under application logic; changing repository source does not update it. No upgrade endpoint exists in this contract. Do not assume Studio's upgrade control is an authorized migration mechanism. Applying this candidate requires separately reviewed deployment/change authorization and an explicit lifecycle plan; no such network action was attempted. Blindly repeating adjudication on unchanged V2 is not recommended.

## Reproduce reads and tests

Use scripts/verify-v2-step.mjs with a stage and its known hash to fetch receipts/state. Exit 2 means not finalized; exit 3 means finalized execution failure. It never signs/submits. Earlier-stage assertions describe their stage-time snapshots; now the task has progressed, use adjudication for the latest read. npm test; npm run test:contract; npm run typecheck; npm run lint; npm run build. Contract tests use deterministic mocks, not live GenVM. Production dependency audit reports zero vulnerabilities at this check. The 45-second video is an honest blocked-progress report, not a successful mission demo. Submission must wait for genuine successful adjudication.
