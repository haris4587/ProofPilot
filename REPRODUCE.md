# Reproduce ProofPilot

Status: successful Heurist research and three successful finalized commitments; adjudication finalized with execution ERROR. No real verdict or decision hash exists. The V3 source is an **undeployed candidate**. Offline results are not network consensus.

## Public verification — no credentials

1. Open https://proofpilot-anza0x.vercel.app/ and inspect **Aave V3 research review**. No wallet, operator token or Heurist key is required to inspect/download the archive.
2. Compare the contract/task, mandate hash, exact 4,935-byte delivery hash and four explorer links. Expand the mandate/report/source limitations and bounded consensus diagnostics.
3. Use **Verify finalized state (read only)** for a public finalized contract read. Network failure is reported as unverified, never as successful consensus.
4. Download the authentic bundle, provider receipt and finalized task. The provider result predates the disclosed replacement mandate. Source excerpts were captured by the operator afterward; they are limited excerpts, not full independently attested publications. Report reference [6] is missing from the provider's five URLs.
5. The prepared local frontend additionally offers **Verify archived hashes locally** and a guided **Try the Demo** entry. These changes await release authorization; do not assume they are already in production.

Historical contract: https://explorer-studio.genlayer.com/address/0xdcDdcB1C570700Da7C3d6c98E9FCC23801608373

Task: `pp-corrected-18ec1e64ccb747d8`

| Operation | Genuine transaction |
| --- | --- |
| Mandate | https://explorer-studio.genlayer.com/transactions/0x3c8cbe50fdbfc88608ae0d557a9e4ec9473771ac043425060276d5443ffc1039 |
| Delivery | https://explorer-studio.genlayer.com/transactions/0xceca49331756c994932ed615ed0b8e38f42c7ff71802f34218aa80cb895cb6ed |
| Dispute | https://explorer-studio.genlayer.com/transactions/0x51dfe20cefa2926cffada242d4e3e10e07ee6fdbcc6f617bd5587c6f7f8c8950 |
| Failed adjudication | https://explorer-studio.genlayer.com/transactions/0xe1522746ae23c527d302ff8c0bd2c08203829a27cc7ab81e895546190e2df77e |

## Isolated local walkthrough — no provider calls or chain writes

Use Node 22+ and Python 3.12+:

```sh
npm ci
npm test
npm run test:contract
npm run lint
npm run build
npm run dev
```

Open the displayed local URL. Choose **Try the Demo**, or **Try offline lifecycle** in the verified archive. In offline mode: Review mandate → Lock offline mandate → Load offline delivery → Commit delivery → Open delivery dispute → Explain expected outcome. This is a local fixture, not Heurist execution or GenLayer consensus. Its review receipt is labeled offline; successful on-chain verdict counters remain unchanged. Do not switch to live mode for this walkthrough.

Independently verify archive bytes, mandate and all three source SHA-256 commitments:

```sh
python scripts/verify-candidate-inputs.py
```

Run pinned SDK compatibility and direct mode (mocked I/O, not WASM or consensus):

```sh
python -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/genvm-lint check contracts/proof_pilot_v3.py --json
.venv/bin/python scripts/check-candidate-sdk.py
```

## Optional live reproduction — separate approval required

Follow `FINAL_EXECUTION_PLAN.md`. Deployment plus four owner-signed lifecycle transactions are required for a new instance. The public reader never needs credentials. A writer needs a Studio development account that owns the newly created task; historical owners cannot be impersonated. Research is reused byte-for-byte; no additional Heurist request is necessary. A network verdict may be ACCEPTED, REJECTED or INCONCLUSIVE; no result is promised. Do not call funding methods or retry failed writes automatically.
