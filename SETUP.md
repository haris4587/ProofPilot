# Setup

Requires Node 22 or 24, Python 3.12+ for tests, and genvm-linter for SDK validation.

```sh
npm ci
python -m pip install genvm-linter
genvm-lint check contracts/proof_pilot.py
genvm-lint schema contracts/proof_pilot.py --output contracts/abi.json
npm run test:contract
npm test
npm run lint
npm run build
```

The business-logic tests explicitly substitute the GenVM host; they do not claim full network execution. A separate real deployment/smoke record belongs in `evidence/`.

## Vercel settings

Import **haris4587/ProofPilot**, select Vite, root directory repository root, install `npm ci`, build `npm run build`, output `dist`. Serverless handlers are `/api/status` and `/api/research`. Set these environment variables through Vercel's secure settings:

- `HEURIST_API_KEY`: paid/free-credit API key from https://heurist.ai/credits.
- `PROOFPILOT_OPERATOR_TOKEN`: random 24+ character secret for the private demo operator; never publish it or commit it.
- `VITE_CONTRACT_ADDRESS`: deployed ProofPilot address on stable Studionet.

The operator enters only the operator token into the live research UI. It remains in memory. Do not paste the Heurist key into the site or chat. No paid call is attempted without valid server configuration. This is a single-operator demonstration; rotate the operator token when it has been shared.

## Local operation

Use `npx vercel dev` for API routes. Vite alone can run the offline walkthrough. Switch modes in Integration settings. The app creates a disposable gasless Studionet account in sessionStorage for writes. This is a development identity, not a production wallet. Keep the tab open and export receipts; do not fund this account. Prefer Studio's existing built-in account for the contract deployment.

## Pinned evidence

Create original source snapshots, each at most 8,192 bytes, and commit them to an accessible public GitHub repository. Use full 40-character commit IDs, not branch names or tags. Hash the actual downloaded UTF-8 bytes with `sha256sum` (or `node scripts/hash-source.mjs <path>`). Paste a manifest such as:

```json
[{"url":"https://raw.githubusercontent.com/OWNER/REPO/COMMIT/source.txt","sha256":"ACTUAL_SHA256"}]
```

`OWNER`, `REPO`, `COMMIT` and `ACTUAL_SHA256` are placeholders, not an execution record. Source attribution belongs in the snapshot and report. Preserve complete provider response separately before extracting the report. The provenance hash is not a provider signature.

Draft state and transaction IDs survive a page refresh in the same tab through versioned sessionStorage. API/operator tokens are never persisted. After an uncertain transaction, use Evidence vault → Refresh chain records; final decisions are read again from finalized chain state. The SDK is loaded only when chain functionality is used.
