# Evidence and verification

Use actual JSON records in `evidence/` as the source of truth for deployment, transactions and validation. No addresses, hashes, paid provider responses or screenshots are fabricated.

## Implemented checks

- `npm test`: adapter/authentication/schema/error/timeout/response-size and canonicalization tests. HTTP responses in this suite are explicit test doubles.
- `npm run test:contract`: state machine, authorization, replay, byte integrity, missing evidence, grounded quotes, outcome derivation and independent validator callback tests. GenVM is explicitly mocked here; these tests do not prove network consensus or empirical prompt-injection immunity.
- `genvm-lint check contracts/proof_pilot.py`: AST safety and actual SDK schema validation.
- `npm run build`: TypeScript and production bundling.
- `npm run lint`: source lint.

## Required live mission evidence

1. A credentialed Heurist response with raw bytes/hash, actual agent/tool, request metadata and attributed source links.
2. A locked on-chain mandate before that execution.
3. Commit-pinned public snapshots of the response and original supporting documents.
4. Finalized and successful mandate, delivery, dispute and adjudication transactions, plus finalized state reads.
5. A short video showing those records. Synthetic chain smoke fixtures must remain labeled and do not satisfy item 1.

Official implementation references were read from the pinned source repositories listed in ARCHITECTURE.md, along with current https://docs.genlayer.com/developers/intelligent-contracts/equivalence-principle and SDK source declarations from installed `genlayer-js@1.1.8`. Stable SDK 1.1.8 exposes `waitForTransactionReceipt` and `TransactionHashVariant.LATEST_FINAL`; do not copy unsupported v2 helper methods into this implementation.

## Observed Studionet deployment

Contract: [0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f](https://explorer-studio.genlayer.com/address/0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f). Deployment transaction: [0xc5a1f0ccff0831cb9a16fc5c2027d72466a8c81a77fbc07aeaea4992ab610516](https://explorer-studio.genlayer.com/transactions/0xc5a1f0ccff0831cb9a16fc5c2027d72466a8c81a77fbc07aeaea4992ab610516), observed FINALIZED in Studio. The exact deployed source is archived in `evidence/deployed-source.py`; metadata describes its small difference from the typechecked source. No real Heurist execution or finalized adjudication is claimed. `smoke-mandate.json` and `smoke-bundle.json` are prepared synthetic inputs, not executed transactions.

## Verified production website

[ProofPilot on Vercel](https://proofpilot-anza0x.vercel.app/) is READY in production. Homepage and status API returned 200. The research endpoint correctly rejected GET with 405. The complete labeled offline browser workflow passed. The runtime error/fatal scan returned no matching records for the checked window. See `evidence/vercel-deployment.json` and `evidence/vercel-live.png`. Live Heurist credentials remain unconfigured.

## 11 November 2026 production audit

The latest verified audit, all-six-stage screenshots, downloaded exports, passing 46-test CI reference, production deployment metadata, real finalized successful commitments, failed adjudication and finalized state reads are recorded in [evidence/e2e/README.md](evidence/e2e/README.md). This supersedes earlier unexecuted-smoke wording: synthetic create/delivery were attempted, but no successful finalized adjudication or genuine Heurist execution is claimed.

## 12 November 2026 live configuration update

Heurist and operator production configuration now report true. A fresh real browser mandate finalized SUCCESS before execution. The provider test awaits private entry of the separate operator token; no Heurist request or new adjudication has occurred. See [verified preparation evidence](evidence/live-heurist-2026-11-12/README.md). This supersedes prior statements that HEURIST_API_KEY is absent; mission readiness remains incomplete.
