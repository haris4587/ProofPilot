# Corrected lifecycle — genuine failure, no verdict

Exactly the four approved contract-method submissions were made, once each, with full consensus and maximum two rotations. Each of the first three was independently verified FINALIZED/SUCCESS and at its expected finalized state before the next send. Adjudication finalized ERROR with MAJORITY_DISAGREE. No automatic retry, replacement mandate, new contract, Heurist request, purchase or subscription followed.

| Method | Verified result | Explorer |
| --- | --- | --- |
| create_assignment | FINALIZED / SUCCESS | [Transaction](https://explorer-studio.genlayer.com/transactions/0x3c8cbe50fdbfc88608ae0d557a9e4ec9473771ac043425060276d5443ffc1039) |
| submit_delivery | FINALIZED / SUCCESS | [Transaction](https://explorer-studio.genlayer.com/transactions/0xceca49331756c994932ed615ed0b8e38f42c7ff71802f34218aa80cb895cb6ed) |
| open_dispute | FINALIZED / SUCCESS | [Transaction](https://explorer-studio.genlayer.com/transactions/0x51dfe20cefa2926cffada242d4e3e10e07ee6fdbcc6f617bd5587c6f7f8c8950) |
| adjudicate | FINALIZED / ERROR | [Transaction](https://explorer-studio.genlayer.com/transactions/0xe1522746ae23c527d302ff8c0bd2c08203829a27cc7ab81e895546190e2df77e) |

Contract: https://explorer-studio.genlayer.com/address/0xdcDdcB1C570700Da7C3d6c98E9FCC23801608373

Owner: 0x67Da51Fd9AC1d52F34F5d01d06da8548979fC514. Task: pp-corrected-18ec1e64ccb747d8. Studionet chain 61999. Source SHA-256 b68dcb73a839a53e8875d5c65e03069dab936fdfee1e45a053d9876634a9425a verified before sends; initial latest-final count 0 established absence of the task. The mandate SHA-256 is ea0c7ee8300f76a9eee5a06794a5c393c79b734c8945a872b4d78f88ba580c73. Exact finalized 4,935-byte delivery and evidence SHA-256 63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500 verified at delivery and dispute. Original provider-response hash and all three actual pinned source bytes reverified. Research and its missing reference [6]/limited support were not altered. Explicit retrospective commissioning disclosure remains intact.

## Exact diagnostics and supported diagnosis

Initial leader: REASON_ASCII_LENGTH, then OBJECT_FIELDS. First rotation: QUOTE_ASCII_LENGTH twice. Second rotation: QUOTE_ASCII_LENGTH twice. Final rollback: [PP_V2_PROMPT_FAILURE] QUOTE_ASCII_LENGTH|QUOTE_ASCII_LENGTH. diagnostics.json records all six actual response hashes extracted from stdout. The rejected response text is unavailable. The OBJECT_FIELDS fingerprint equals the SHA-256 of canonical {}, but a fingerprint is not a captured historical model response.

The prompt correction got four answers past object fields, outcome, reason, nine criteria states, deterministic verdict derivation and citation structure/index checks. They then failed quote validation: wrong type, fewer than 8/more than 300 characters, or a disallowed character. The combined code does not identify which. One other answer failed reason validation (wrong type, outside 10–1200 characters, or disallowed characters). Do not assert that all failures were smart quotes, length overflow, missing [6], provider authentication, source retrieval or substantive validator disagreement. These are not established by the receipts.

The Aave introduction excerpt actually contains curly quotation marks; the other two excerpts are ASCII. Exact ASCII substrings are available, so the authentic corpus is not inherently impossible to quote under the current predicate. Nevertheless a correct quote containing those curly marks would fail ASCII validation. This is a demonstrated constraint mismatch possibility, not proof of what the models returned. Validators rejecting a rolled-back leader do not establish a valid independent verdict.

## Smallest evidence-based next correction, not a new deployment

Required output remains an exact four-field decision object, exactly nine allowed criterion strings, a 10–1200-character ASCII reason and exact 8–300-character ASCII source substrings. Another prompt-only tweak is not proven reliable. The smallest justified diagnostic change is to distinguish TYPE, LENGTH and CHARSET in the existing reason/quote rejection codes, recording only type, character count, invalid-codepoint count and response fingerprint. Preserve the same acceptance predicate and independent consensus. Until a rejected output or equivalent safe metadata identifies the actual failing subtype, a production correction cannot honestly be claimed proven. A later reviewed response-generation change could select bounded exact ASCII spans or enforce an equivalent structured schema; it must not normalize/fabricate quotations, silently replace evidence, weaken validation or force a verdict. No further candidate or contract was deployed, and no new network authorization is requested in this report.

## Studio RPC observation

Studio's RPC log emitted sim_fundAccount entries near submission and rotations. The agent used only the four approved method-send controls and did not make a separate funding call, faucet action, transfer, purchase or subscription. The RPC parameters/source attribution/effects were not independently verified; do not claim that no internal simulator funding occurred or infer real-fund transfers. See studio-rpc-observation.json. Contract-method sends used the Studio zero-value default; receipts lack a separate numeric value field.

## Reproduce and readiness

scripts/verify-corrected-step.mjs performs read-only receipt/state checks with a known hash; no account/key is required. Earlier stage snapshots are preserved; current latest state is the adjudication-state.json DISPUTED record. npm test, npm run test:contract, npm run typecheck, npm run lint and npm run build passed, 47 JavaScript plus 40 Python mock tests. Production dependency audit found zero known vulnerabilities. Tests are not proof of live consensus success.

The existing production interface publishes these genuine failed results separately from session counts and its V1 transaction target. V1/V2 histories are preserved. The updated 45-second narrated MP4 is a truthful blocked-progress report, not a mission-ready successful demo. Successful adjudication, corrected-contract production activation and a successful final film remain blocked. No mission portal submission was made.
