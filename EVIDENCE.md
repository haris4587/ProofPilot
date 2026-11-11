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
