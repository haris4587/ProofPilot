# Adjudication diagnosis — 13 November 2026

## Proven findings

- A fresh read-only getContractCode returned SHA-256 952b7842db7f54aad4ed9d50d571eb9d75b6f3cada81e709de2b993fcd8d49d2, matching the recorded deployed source. Original contracts/proof_pilot.py is unchanged. The V1 deployment has NOT been patched.
- Exact archived delivery is 4,935 UTF-8 bytes, hash 63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500. Reconstructed input has NINE criteria (3 facts + 5 rubric items + deliveryConditions), four corpus entries (3,456 / 579 / 568 / 628 bytes), and a 7,472-byte prompt, SHA-256 4fb37d25e0e268c1a54e59e0a819f2ef3f06d2ae90b499d87d1ce5247569b6fb. scripts/reconstruct-adjudication.py derives these from authentic state, pinned bytes and the deployed AST literal.
- Original regression fixtures had omitted deliveryConditions when supplying eight criteria. That was a TEST COVERAGE defect, not proof of a deployed off-by-one bug. New authentic-input tests use nine.
- Receipt history contains the initial round plus two rotations. Every recorded leader rollback is the same generic LLM_ERROR. LLM token usage is present across model policies. Validator entries are role=validator, often vote=disagree or idle; they must not be described as additional leaders. On a rollback the custom validator immediately rejects non-Return results; this is not evidence of substantive independent verdict disagreement.
- eq_outputs contains the encoded rollback error, NOT a rejected LLM response. stdout/stderr are empty. No rejected response was recovered from the receipt, consensus history, messages or execution metadata.
- The exception is raised only after source retrieval reaches the prompt loop. A failed source retrieval takes a different deterministic INCONCLUSIVE branch. Thus source failure is not the direct path producing this LLM_ERROR. Lack of network-level error logs does not prove every provider attempt succeeded.
- Official docs and the pinned-runner SDK check support response_format='json'; this argument is not a proven API misuse. Official SDK signatures return a dict in JSON mode; strict JSON strings remain supported defensively. No speculative wrapper unwrapping was added.
- A valid grounded synthetic nine-criterion JSON object and JSON string both complete the exact V1 logic with independent leader/validator mocks. Therefore V1 can theoretically finish the current DISPUTED task if the runtime returns acceptable independently agreed outputs. No reliable prediction of a fresh network attempt follows from this test.

## Remaining uncertainty

Root cause of the REAL provider/parse/validation failure is NOT proven. The broad except Exception: pass hides provider errors, JSON parse errors and validator exceptions; ordinary validate_decision=False also loses its rejection reason. Non-ASCII reasons/quotes, missing/extra criteria, wrappers and inaccurate exact quotations are reproducible hypotheses, not captured historical answers. The missing reference [6] and incomplete excerpts are factual-evidence limitations that should lead to UNKNOWN when appropriately reasoned; they are not demonstrated causes of this execution failure.

## Minimal safe candidate

contracts/proof_pilot_v2.py is an UNDEPLOYED diagnostic candidate copied from exact V1. It retains two prompt attempts, strict object fields and ASCII/exact-quote rules, outcome derivation, independently retrieved SHA-256-pinned evidence and independent validator execution. A helper emits stable field-level rejection codes. Provider exception diagnostics include ONLY exception class, never provider messages or credentials. Print/error diagnostics contain a response hash, not raw model output. JSON strings are size bounded to 12 KB; no fences, aliases, wrappers, quote normalization or forced UNKNOWN outcomes are accepted. The prompt explicitly states the dynamic nine-entry count, final delivery-condition criterion and 0..3 corpus index bounds. This is prompt clarification and observability, not a proven fix of the unknown historical answer.

There is no administrative override, state import, weakened validator or predetermined verdict. New diagnostic codes distinguish PROMPT_EXCEPTION, JSON_PARSE, RESPONSE_SIZE, object fields, criteria count/state, verdict derivation, citation indices and exact ASCII quotation failures. The existing fallback for unavailable/missing evidence remains unchanged and independently verified; it is not used to disguise a failed model call as INCONCLUSIVE.

## Offline verification

36 Python contract/mock tests and 47 JavaScript/frontend/adapter tests pass. The authentic evidence replay matrix covers dict/string/wrapper/list/bytes/null response types, malformed JSON, fenced JSON, 8/9/10 criterion counts, unsupported outcomes/states, incorrect outcome derivation, non-ASCII and overlong reasons, non-ASCII/inexact quotations, invalid/bool/out-of-range source indices, response bounds, provider exceptions, source exceptions/status/size/hash/body failures, strict independent disagreement and redacted diagnostics. Synthetic model outputs are explicitly mock fixtures, never claimed as historical responses or network verdicts.

GenVM linter 0.11.0 checks both original deployed source and V2 against the EXACT dependency header. AST lint and SDK semantic validation pass; V2 ABI extraction succeeds. Both report only informational I200: a newer runner exists. The pinned runner was intentionally retained to avoid an unrelated runtime migration. These are compatibility checks, not live GenVM LLM/consensus execution. See genvm-v1.json, genvm-v2.json and contracts/abi-v2.json.

## Official references consulted

- https://docs.genlayer.com/developers/intelligent-contracts/features/calling-llms
- https://sdk.genlayer.com/v0.2.7/api/genlayer.html
- https://docs.genlayer.com/api-references/genlayer-linter
- https://docs.genlayer.com/developers/intelligent-contracts/crafting-prompts

## Decision and smallest next action

Blindly retrying V1 is NOT recommended. Its state is still valid DISPUTED and retry is technically possible, but the two observed failures provide no reason to expect a different result. Repository changes cannot repair its immutable evaluate closure.

V2 is required IF the user chooses the diagnostic contract path; it is not proven that replacement is the only possible route to a valid V1 verdict. Deploying V2 alone cannot reuse storage at the old address. A new lifecycle is required unless a separately reviewed migration method is added (none is included). See MIGRATION.md for exact prepared actions. No transaction, deployment, provider execution, purchase or key export was performed during this diagnosis.

## Production verification and wallet availability

Frontend commit 8d81a916483b3a6180095cbff01832eee2fee038 passed GitHub CI https://github.com/haris4587/ProofPilot/actions/runs/43367454482 and Vercel deployment dpl_EnfnKALh9BKA7idak6nFBwoeYqbs is READY. Contract configuration remains the V1 address. Browser inventory on 13 November had no retained tab; a fresh production tab displayed the empty session dashboard. No wallet was loaded, generated or exported. Original-owner access cannot be presumed. V1 can only continue if its signing account is genuinely available; otherwise V2 requires an explicitly approved accessible commissioning account.
