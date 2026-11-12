# Reviewed archive import and replacement preparation

No new Heurist call, contract deployment, purchase, or blockchain write is authorized or performed in this preparation stage. The original pp-b6fafae9-9d2 remains unchanged. The existing contract is 0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f, Stable Studionet 61999.

## Safe recovery

Settings > Prepare replacement mandate (no transaction) reads the original finalized mandate and validates its hash, then prepares a unique pp-recovery-* task ID for this tab's existing development account. This is a local draft, not a chain assignment. Keep this tab open; the disposable wallet is held in sessionStorage. Closing or losing the browser session may lose access. No key export or reconstruction is provided or required. Reopening a task alone does not recover its wallet.

The original objective, required facts, rubric, source count, adjudicator and dispute rules are identical. Only deliveryConditions appends a disclosure that the genuine Heurist result was received at 2026-11-12T10:53:59.523Z BEFORE the replacement mandate. replacement-mandate.json records those exact canonical bytes. Its new hash is in local-validation.json. Task ID and owner are separate transaction fields; they are not inside the mandate JSON. The original task and mandate commitment are preserved.

## Reviewed import

This intentionally accepts ONLY the previously reviewed authentic archive, not arbitrary provider receipts. Choose delivery-prepared.json or Load reviewed archive (no API execution). The reviewed archive is bundled from the repository; loading it never calls Heurist. The importer bounds the file to 24 KB, requires canonical UTF-8 JSON without BOM/trailing whitespace/duplicate keys, verifies the fixed evidence SHA-256, checks the exact compatible original or recovery mandate, verifies the raw original provider response hash and canonical report, original search objective/agent/timestamp, and exactly three allowlisted commit-pinned references. Each pinned source is fetched independently with a timeout and 8 KB limit and its bytes are SHA-256 checked. Changed or unavailable evidence fails closed.

Import success does not set an on-chain evidenceHash, imply a transaction or validator verdict, or claim provider signatures. Report, source references and provenance are frozen. The exact original delivery bytes are retained in sessionStorage and used verbatim at submission, revalidated immediately before sending. Provider receipt export remains the complete authentic original receipt. A restored draft is never sufficient proof of integrity; submission revalidates it and the finalized mandate/owner. There is no remote URL import or arbitrary target fetch.

The provider's missing reference [6], five listed URLs and incomplete support from the bounded excerpts remain visible. No local replacement summary is used. Import integrity is distinct from factual correctness; UNKNOWN/INCONCLUSIVE remains valid.

## Approval sequence — NOT EXECUTED

All writes use the existing contract, chain 61999, value 0, leaderOnly false, consensusMaxRotations 2. An unchecked stage-specific approval control and same-wallet check gate each recovery transaction. Approval does not carry across stages or page reloads.

1. create_assignment(new unique task ID, canonical replacement-mandate.json, replacement mandate SHA-256).
2. Wait for FINALIZED AND execution SUCCESS. If uncertain, inspect the transaction hash and latest finalized task before any repeat.
3. Import the reviewed original delivery. This local/read-only operation can also be tested before creation; it does not count as a delivery.
4. submit_delivery(the new ID, EXACT delivery-prepared.json bytes, 63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500). Check finalized success, finalized DELIVERED state and exact evidenceHash.
5. open_dispute(the new ID, the exact review reason shown on screen). Verify finalized success and DISPUTED state.
6. STOP for separate explicit authorization before adjudicate(the new ID). Never promise ACCEPTED or retry an uncertain transaction automatically.

## Earlier LLM_ERROR investigation

The prior unrelated adjudication receipt ended FINALIZED / ERROR: [LLM_ERROR] Invalid grounded decision; rotate validator. Its invalid model output is not exposed, so the historical cause is unproven. Offline tests against the recorded deployed source reproduce this same boundary with fabricated quotations: after two invalid answers it raises, leaving DISPUTED. Grounded INCONCLUSIVE passes strict structure/outcome/quotation validation; changing that same decision to ACCEPTED fails. This is an offline boundary test, not a new network verdict. No consensus, grounding, derived-outcome rules, bounds or contract source were changed.

## Validation

npm test: 46 JavaScript/frontend-domain and adapter tests. npm run test:contract: 26 Python mock-contract tests. npm run build and npm run lint pass. Tests cover genuine archive preservation, malformed/BOM/duplicate-key/noncanonical/tampered imports, weakened mandates, source substitution/oversize/unavailability, authorization, exact delivery commitment and the LLM_ERROR boundary. Browser checks and actual prepared public wallet/task details are recorded after production deployment. Security review found no new credential storage, private-key exports, untrusted URL fetches, HTML injection paths or contract changes.

Mission remains incomplete until separately approved creation/delivery/dispute and a successful finalized adjudication, then final video and submission evidence. The retrospective replacement must never be presented as research performed after its lock.

Security dependency check found preexisting Zod GHSA-mrhx-c7xc-m3w5. The direct dependency is pinned to patched 4.6.7, record schemas use the compatible explicit string-key API, and the production dependency audit now reports zero vulnerabilities. All 72 tests, build and lint were rerun successfully after this change. No server credential or API configuration changed.
