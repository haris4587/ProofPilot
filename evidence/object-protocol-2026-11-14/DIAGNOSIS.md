# JSON object protocol correction

Historical V3 adjudication 0x577ac6f7f93b91dc62042a7e65bdb2c0219e0255894902ba01f63e639483c986 finalized with execution ERROR / ASSESSMENT_COUNT. It left the task DISPUTED with no verdict or decision hash. Rejected response bodies are unavailable; the exact malformed shape is unknown.

The independently confirmed mismatch: V3 requested top-level arrays in response_format=json, while the official GenLayer API documents a JSON object return. This is a robust correction for a documented mismatch, not a claim that archived response bytes prove a specific envelope.

Official sources checked 2026-11-14:
- https://docs.genlayer.com/developers/intelligent-contracts/features/calling-llms
- https://sdk.genlayer.com/v0.3.x/_modules/genlayer/nondet.html

V4 requests exactly {assessments: nine rows} and {checks: nine verdict strings}. Strict exact keys, row count, IDs, enums, references, external support, blind independent assessment, separate leader-citation relevance, pinned bytes, evidence/mandate commitments, deterministic outcome and terminal receipt remain required. Bare arrays, aliases, defaults, incomplete arrays and extra fields fail closed. No model retry added. Schema diagnostics disclose field/type/count only, never provider bodies.

Regression reproduces V3 ASSESSMENT_COUNT on a documented object response and verifies V4 accepts only the exact complete object schema. Native mocked tests do not establish network consensus.
