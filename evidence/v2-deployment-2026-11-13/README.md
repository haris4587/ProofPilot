# ProofPilot V2 — genuine deployment, 13 November 2026

One authorized deployment, no retries. FINALIZED and execution SUCCESS independently checked through the Studionet SDK. Deployed source bytes exactly match the approved candidate. This proves deployment compatibility, not adjudication reliability. No new task or verdict exists yet.

- Contract: 0x8d64250Eb8c3Eafb8628482d2381799189055a90
- Account: 0x67Da51Fd9AC1d52F34F5d01d06da8548979fC514 (available Studio account; no key exported or funding performed)
- Transaction: https://explorer-studio.genlayer.com/transactions/0xca8d01c87659b60cf40611f768f664e884e1ac54af1c17cc994d5003c75a0c2c
- Address: https://explorer-studio.genlayer.com/address/0x8d64250Eb8c3Eafb8628482d2381799189055a90
- Source SHA-256: 48eb272b98de3978248d6cd10a40b4cc9e9a5e508424ecba243c53cc98ef4e1f
- Latest finalized get_count: 0; normal consensus; max rotations 2.

Original V1 contract and archived tasks/evidence are preserved. Production continues to target V1. No Heurist request, task creation, delivery, dispute, adjudication, purchase, or subscription was performed in this deployment stage.

## Approval-gated migration

migration-plan.json contains exact arguments for three proposed writes using task pp-v2-review-18ec1e64ccb747d8, the verified Studio account and this V2 address. Approval is still required. Verify wallet before sending. Each transaction once; proceed only after finalized success and expected finalized state. Verify committed evidence SHA-256 63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500 and exact 4,935 bytes. Stop on error or uncertainty. Separate authorization remains required for adjudication.

The unchanged mandate includes retrospective disclosure that genuine research predates commissioning. Its SHA-256 remains ea0c7ee8300f76a9eee5a06794a5c393c79b734c8945a872b4d78f88ba580c73. Missing citation [6] and incomplete support remain authentic limitations. No promise of ACCEPTED or successful future consensus.

## Reproduce read-only verification

Use genlayer-js 1.1.8 with studionet: getTransaction for the deployment hash; require statusName FINALIZED and leader receipt execution_result SUCCESS. getContractCode(address) and SHA-256 its UTF-8 bytes; compare against the source above. readContract get_count with args [] and TransactionHashVariant.LATEST_FINAL; expect 0 before any approved migration. No signing key is required for these reads. deployment-receipt.json is the authentic RPC response; deployed-source.py and initial-state.json were read after finality. checksums.json covers archived bytes.
