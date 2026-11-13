# Replacement candidate review

Undeployed. Historical V1, V2, corrected V2, task states, genuine research and existing 45-second honest progress film remain intact. Base: `24235399698fffa4b5df4839b4de661de8feae68`.

## Demonstrated problem and correction

The latest receipt records four QUOTE_ASCII_LENGTH, one REASON_ASCII_LENGTH and one OBJECT_FIELDS failures. Raw rejected responses are unavailable; combined ASCII/length codes cannot establish which subcondition failed. We do not fabricate reconstructions of those responses.

V3 changes the response contract rather than appending another formatting instruction. Models return only nine `["C1", "SATISFIED", [span_id]]` rows; C1..C9 and three state enums are fixed. There is no model-produced reason, outcome, quote or object key. Wrong row count/types, unknown identifiers/states and unsupported references abort. No wrapper extraction, response repair, semantic coercion or provider retry occurs.

The deterministic source catalog partitions the entire report and retrieved source text into nonempty line chunks of at most 240 Unicode characters. Every span includes an integer ID, source index and UTF-8 byte start/end, reproducible from locked bundle and individually SHA-256-verified source bytes. Whitespace is preserved in selected spans. Unicode quotations are resolved exactly rather than made ASCII. The full original corpus is supplied alongside the catalog, so chunk boundaries do not hide contrary context.

A leader makes nine assessments. Each validator independently retrieves/rehashes the same sources and makes a blind nine-criterion assessment. All nine states must match. Then a separate validator prompt independently checks the leader's particular citations against each criterion and the full context; all nine must be VALID. Different relevant spans can be selected independently; byte-for-byte quotation agreement is unnecessary. Mere substring membership cannot establish citation relevance. A decided state requires at least one external span; report assertions alone cannot satisfy it. UNKNOWN may have no spans for absent support, subject to independent semantic checking. Only independently agreed source retrieval failure creates deterministic INCONCLUSIVE with an explicit evidenceError. Provider/schema/semantic errors abort and leave DISPUTED; they never silently become UNKNOWN.

Outcome remains deterministic: any UNKNOWN → INCONCLUSIVE; otherwise any VIOLATED → REJECTED; otherwise ACCEPTED. Final explanation lists the nine validated states in bounded ASCII text (under 240 characters), explicitly a state summary rather than invented substantive reasoning. Citations and criterion mappings provide the audit trail. Existing client authorization, canonical commitments, pinned URLs, source bounds, prompt-injection isolation, lifecycle, terminal settlement and hash-linked receipts are retained. New mandates must contain exactly nine criteria.

## Validation and limits

- Authentic corrected nine-criterion mandate and exact 4,935-byte Heurist bundle, plus all three archived source files, verified offline.
- Synthetic dict/string model behavior, Unicode, long spans, malformed/empty/provider responses, unknown outcome misuse, reference/type errors, disagreement, citation rejection and contradictory/unsupported judgments covered by tests. Mocked semantic responses only test orchestration; they do not prove an actual model recognizes a contradiction or resists injection.
- GenVM linter 0.11.0 AST and exact pinned SDK semantic checks pass; ABI extracted. A newer runner warning is retained; no runner upgrade bundled.
- Native direct-mode lifecycle, closure serialization and explicit captured validator check pass with the actual pinned SDK, mocked web/LLM I/O. This is not WASM execution or network consensus.
- Browser checks in this host were blocked by socket permissions; the separate cloud browser cannot reach localhost. Browser CI must pass before release. Build/lint/typechecking do not replace that check.
- Read-only fresh chain observation confirms FINALIZED failed adjudication and DISPUTED task with empty decision. Production HTTP GET returned 200; status endpoint reported both integrations configured. No write/provider API was invoked.

## Remaining uncertainties

Live model compliance, semantic agreement, relevance classification, prompt-injection resistance, WASM runtime, source availability and Studio quotas remain unproven by offline tests. The extra relevance call increases validator inference work but replaces arbitrary prose/quote generation with fixed labels; at zero rotations the maximum per transaction with V validators is one leader assessment plus two prompts per validator, each with bounded input. Network/provider internals may have their own policies; contract code cannot override them.

The authentic evidence has real support gaps (missing reference [6], short operator excerpts, shared Aave publisher attribution); this design must permit a genuine INCONCLUSIVE. It does not make the historical research better or promise ACCEPTED.

## Funding observation

Read all repository `sim_fundAccount` mentions and the archived Studio observation plus latest receipt. The preserved observation says entries occurred near submission/rotation, but neither a complete RPC log nor verified parameters/effects are present. Receipt records do not establish who caused those RPC calls or whether any simulator balance changed. No real funding is inferred. No funding RPC, faucet, transfer, purchase or account creation was performed in this work. A final run must stop if explicit funding is required; implicit Studio funding behavior requires operator clarification before authorizing execution, not an assumption that it is absent.

## Official design references

- https://docs.genlayer.com/developers/intelligent-contracts/equivalence-principle — blind independent decision-field comparison plus source-grounded checking, not leader-only shape validation.
- https://docs.genlayer.com/api-references/genlayer-linter — AST/SDK checks and ABI extraction, not proof of network consensus.

No new contract deployment, chain write, Heurist request, remote Git update or Vercel release was performed.

Read-only SDK inspection adds a caution: genlayer-js 1.1.8 has an ABI-mismatch fallback send in `_sendTransaction`, despite RPC transport retries being disabled. Existing deploy/front-end helpers also request rotations 2. Neither helper is approved for the final run. A zero-retry execution must enforce a one-send transport budget and rotations 0, or use Studio controls with equivalent guarantees; if those controls are unavailable, stop. Do not interpret receipt polling as permission to resend.
