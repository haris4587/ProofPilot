# ProofPilot — AI Agent Delivery Court

Agree the work. Verify the delivery.

ProofPilot implements a research-delivery workflow around immutable mandates, a protected Heurist Mesh research adapter and an original GenLayer Intelligent Contract. The dark React interface guides the operator through assignment, agreement, execution, evidence commitment, dispute and finalized receipt.

## Honest integration status

- **Internet Court:** explicitly identified protocol adapter, based on its agent-performance review connector. Uses an agreed objective/rubric, committed action receipts, a dispute condition and a review decision. There is no invented Internet Court filing endpoint, escrow or delegation.
- **Heurist:** real server-side `/mesh_schema` and `/mesh_request` adapter for `ExaSearchDigestAgent.exa_web_search`, with payment credentials, schema checking and bounded responses. Live operation requires a configured API key and operator token. Offline fixtures are labeled; they are not provider results.
- **GenLayer:** `contracts/proof_pilot.py` owns irreversible task commitments and independently evaluated delivery decisions. Stable Studionet, chain 61999. The deployment record and actual transactions are recorded in `evidence/` when available.
- **Website:** configured exclusively for Vercel. No alternative hosting is authorized.
- **Mission readiness:** a credentialed live Heurist execution and its pinned response must be recorded before this can be submitted as a complete three-way integration demo. Contract smoke tests using synthetic fixtures do not replace that evidence.

## Run

```sh
npm ci
npm run dev -- --host 127.0.0.1
npm test
npm run test:contract
npm run lint
npm run typecheck
npm run build
```

Use `npx vercel dev` for the serverless API locally; plain Vite serves the interface and proxies `/api` to port 3000. Configure the server through `.env.example`. Never place the Heurist key in a `VITE_` variable.

## Workflow

1. Create a brief with required facts, acceptance criteria, source count and delivery conditions.
2. Lock its canonical SHA-256 commitment before execution.
3. Execute Heurist research using the protected server endpoint, or select the explicitly labeled offline walkthrough.
4. Export the raw provider receipt. Archive original source snapshots to a public Git commit. Prepare the pinned source manifest.
5. Commit the exact report, provenance and source hashes. The original criteria and delivery cannot change.
6. The commissioning account opens a single dispute.
7. GenLayer independently fetches and hashes each source, evaluates all acceptance criteria, and compares leader/validator decisions.
8. Show a verdict only after the transaction is finalized **and execution succeeded**, then export its receipt.

See [ARCHITECTURE.md](ARCHITECTURE.md), [SETUP.md](SETUP.md), [DEPLOYMENT.md](DEPLOYMENT.md), [SECURITY.md](SECURITY.md), [EVIDENCE.md](EVIDENCE.md), [DEMO.md](DEMO.md) and [SUBMISSION.md](SUBMISSION.md).

## Review boundaries

The contract proves adherence to agreed evidence and consensus logic, not the truth of an untrusted source or a provider identity. An operator-provided Heurist receipt is not a cryptographic provider attestation. The demo transfers no funds. Its protocol-adapter outcome is advisory; it does not create a legally binding court ruling.
