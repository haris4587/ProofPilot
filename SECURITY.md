# Security boundaries

## Undeployed structured assessment candidate — 13 November 2026

`contracts/proof_pilot_v3.py` is a single offline replacement candidate. Models produce nine criterion/state/reference rows; source quotations, outcome and bounded explanation are derived deterministically. Validators retrieve and hash sources independently, make a blind assessment, then verify citation relevance. Prior versions/tasks/evidence remain preserved. No new deployment, blockchain write, funding, Heurist request, Git push or Vercel release has occurred. [Engineering review](evidence/structured-candidate-2026-11-13/REVIEW.md), [reproduction guide](REPRODUCE.md) and [bounded execution plan](FINAL_EXECUTION_PLAN.md). Production is still the historical deployment; this local change is not live. Browser CI and genuine network consensus remain unverified.

ProofPilot is a testnet research-delivery demonstration, with no escrow, payments, financial recommendations or production custody.

## Controls

- Only a task's commissioning account can submit its delivery, open its one dispute or request its one adjudication.
- Mandates, evidence bytes, source digests and dispute reasons cannot be overwritten after their respective transitions.
- Source URLs accept only HTTPS `raw.githubusercontent.com` with full 40-character commits. No arbitrary host, credentials, query strings, fragments, mutable branch paths or traversal are accepted. GitHub is trusted not to redirect pinned raw resources into an unsafe origin; runtime fetch redirect and response limits remain platform controls.
- At most 128 tasks, four audit records per task, three sources, 8 KB per source, 24 KB per bundle and two LLM attempts per evaluator. Capacity is global and can be exhausted by public callers: this deployment is a bounded public demo, not a multi-tenant production service.
- Validators independently retrieve exact source bytes, verify SHA-256 and compare substantive criterion states; all quoted excerpts must exist in those independently fetched documents.
- Missing/conflicting evidence leads to UNKNOWN and INCONCLUSIVE. Unknown takes priority over established violations to avoid an unsupported terminal judgment.
- The model receives untrusted external data separated from fixed evaluation instructions. Data cannot change the mandate, keys, authorization or supported outcomes. Prompt injection remains a model-level risk; exact grounding and independent comparison reduce, but do not eliminate it.
- Heurist secrets are server-only. An independent operator bearer token protects paid execution. No uncertain paid POST is retried. Schema mismatches stop execution. The API limits output streaming and time.
- Pending, accepted, undetermined, reverted and finalized-failed transactions are never treated as successful final verdicts.

## Limitations

Content addressing establishes integrity, not authenticity or truth. Source snapshots may be fabricated or selectively chosen. Heurist metadata is an operator-produced receipt, not signed provider evidence. This release does not cryptographically prove the API response originated with Heurist. A client can edit a report before committing it; the reviewed delivery is the committed report.

The browser demo key is held in sessionStorage; a page compromise can access it. Use it only on gasless Studionet with no funds. Production needs a secure signer, durable indexing, per-user auth, rate limiting and quotas. The operator endpoint is a limited private demo API, not a publicly metered service.

Contract HTTP response sizes are rejected after the GenVM host receives them; host-level network time/size budgets still apply. Sources are limited to a single trusted public host. Consensus is subject to available validator models, network rules and appeal finality. Exact agreement on criterion states can reject otherwise similar answers; failure to reach consensus leaves the task disputed, not accepted.

Do not publish credentials or sensitive research. All committed task contents and pinned source snapshots are public. Report vulnerabilities privately to the repository owner; include reproduction without secret values.
