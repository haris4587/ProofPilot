# Genuine production attempt — 12 November 2026

## Actual result

The Heurist schema repair at commit 111f5dd7a1e0735fc8739f8c575a09b46c706e87 passed GitHub Actions (53 tests plus type checking, lint and build): https://github.com/haris4587/ProofPilot/actions/runs/43162468665 . Vercel deployed it from Git as dpl_C63QG9Asr69at2sgVLdsbmwcrtDn, production READY. /api/status reports both configuration flags true, Studionet 61999.

The user requested autonomous execution and supplied the ProofPilot operator credential through the private browser-authentication prompt. Its value was never returned to the assistant, read from browser state, placed in chat, logged, screenshotted, or committed. No Heurist key value was retrieved or changed.

After the mandate finalized, the secure submission clicked Run Heurist research exactly once. The actual browser then displayed **Heurist credits are required.** This message maps to upstream HTTP 402 in the deployed adapter. The adapter returns it for either schema discovery or research execution; upstream phase and raw error body were not captured, so this record does not claim a captured successful research POST or validated Heurist authentication. The protected application endpoint did pass its operator check to reach provider handling.

**No research report or provider receipt was delivered.** No sources were invented or pinned as provider output, no delivery was committed, and no dispute or adjudication was initiated for this task. No automatic or manual retry was made. No credits, funds or subscription were purchased. The attempt consumed the one authorized browser submission; no further attempt is authorized by this record.

attempt-record.json is an observation/audit record, explicitly NOT a Heurist provider receipt. The error text was observed directly in the browser accessibility tree. Navigation later cleared the transient alert, so the saved screenshots show the real finalized mandate and post-attempt vault, not a recreated error. They contain no credential fields. browser-result.txt shows that Evidence bundle and Provider receipt exports are disabled and no delivery hash exists. A recent Vercel error/fatal application-log query returned no matching entries; handled HTTP errors need not create application log records.

## Real finalized mandate before execution

Task pp-b6fafae9-9d2, contract 0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f, Stable Studionet chain 61999.

Transaction: https://explorer-studio.genlayer.com/transactions/0x34e43767d03071b2ac71d911d2c06d1cf3e96972aab852404bbce6bddb669cc5 . getTransaction confirms FINALIZED and SUCCESS. LATEST_FINAL get_task confirms AGREED. mandate.json is the exact downloaded canonical payload; its SHA-256 is 15817685c3278b18b84d040264e0c5313675ff0236c9eaed58f7a61e57b921f4 and matches finalized state. mandate-transaction.json and finalized-state.json preserve actual reads. No account private key was exported.

## Remaining external requirement and mission readiness

Heurist must make sufficient credits available to the configured Mesh API key. Its published schema lists exa_web_search at 0.5 credits. This is pricing metadata, not evidence of the user's balance or credit deductions. Free-credit eligibility cannot be inferred from a key being configured.

The provider's documented free-credit flow requires an X verification post, once per user: https://github.com/heurist-network/heurist-mesh-skill/blob/main/references/heurist-api-key.md . No social post or new claim was made: the user has not explicitly authorized publishing a verification tweet, and no paid alternative is authorized. Any replacement key resulting from a claim must be entered privately into Vercel, never chat.

Submission remains NOT READY: a genuine successful provider response, commit-pinned actual evidence, and successful finalized semantic GenLayer adjudication are still missing. The previous contract-only Aave adjudication error remains separately documented in ../e2e/README.md. The existing contract and its security were not modified or redeployed. Once credits are available, obtain fresh authorization for one bounded attempt, preserve its response, and continue the real workflow without forcing a verdict.
