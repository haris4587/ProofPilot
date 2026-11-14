# Current result — 14 November 2026

The single authorized V4 attempt did not produce a verdict. Deployment, mandate, delivery and dispute finalized with execution SUCCESS. Adjudication finalized with execution ERROR / MAJORITY_DISAGREE / EXTERNAL_SUPPORT_REQUIRED. State remains DISPUTED with an empty decision; no decisionHash exists. There were zero rotations, no resubmissions, no new Heurist request, no funding and no purchases.

V4 corrected the documented JSON object protocol mismatch without relaxing the nine assessments, source-span references or independent validation. The new execution reached the external support check and rejected a decided criterion without an external span. The raw rejected model responses and criterion identity are unavailable; no semantic verdict is inferred.

- Contract: https://explorer-studio.genlayer.com/address/0xf0EE634ab77Bdc99B7905E227569A5A96b8dd3ff
- Adjudication: https://explorer-studio.genlayer.com/tx/0x3aa66f7e979dd2abb32b17943f54e7fd688f14874f26b717e615fa645cbd7557
- Pinned deployed source: https://github.com/haris4587/ProofPilot/blob/582a9e68295fd5e94f67ac175cf6f311d31b175d/contracts/proof_pilot_v4.py
- Source SHA-256: `823be7ee58545c4f84712853265ddc0e094de24b66b8ffd1d5dafb7265e8dd33`
- Read-only public reproduction: use the site's archive hash checks, pinned-source checks and finalized-state read. Offline walkthrough is explicitly labeled.

78 Python tests, 47 JavaScript tests, lint/build, pinned-runner lint/ABI and native mocked lifecycle/validator/closure checks passed. GitHub CI run 43593002835 passed including desktop/mobile browser walkthroughs. These checks do not prove live adjudication success.

The original 4,935-byte Heurist result and evidence commitment are unchanged. Research was received 12 November 2026, before this retrospective recovery mandate. The existing 43.8-second film records an earlier failed attempt. No new success film was made because success was not observed. Mission submission remains incomplete.

## Historical documentation

# Reproduce ProofPilot

## Public reader — no credentials or paid credits

1. Open https://proofpilot-anza0x.vercel.app/ and choose **Try the Demo** or inspect **Aave V3 research review**.
2. Click **Verify archived hashes locally**. This recomputes the canonical mandate and exact delivery hashes in your browser. It verifies bytes, not factual accuracy or network consensus.
3. Click **Verify pinned source hashes**. Each source is fetched from its immutable Git commit and checked against SHA-256, with response-size and timeout bounds. Failure stays explicitly unverified.
4. Expand **Locked mandate, genuine report and source limitations**. The research predates the replacement mandate; that retrospective reuse is disclosed. Report reference [6] has no corresponding entry among the provider's five URLs. Operator-captured excerpts are limited; two Aave documents share a publisher. Do not infer complete factual support.
5. Inspect the deployment and all four method explorer receipts. `FINALIZED` alone does not mean execution SUCCESS. The actual adjudication is ERROR and the task is DISPUTED, not INCONCLUSIVE.
6. Use **Verify finalized state (read only)** to compare latest-final on-chain owner, state and commitments. A public RPC outage is reported as unverified, not replaced with a fabricated live result.
7. Download the authentic delivery, provider receipt and finalized task. Watch/download the labeled progress MP4.

- Website: https://proofpilot-anza0x.vercel.app/
- Repository: https://github.com/haris4587/ProofPilot
- Contract: [0x798f0278e09e485961819Eacc5E5Dde8Ab96bDe8](https://explorer-studio.genlayer.com/address/0x798f0278e09e485961819Eacc5E5Dde8Ab96bDe8)
- Task: `pp-structured-18ec1e64ccb747d8`
- Network: Studionet 61999
- Mandate SHA-256: `ea0c7ee8300f76a9eee5a06794a5c393c79b734c8945a872b4d78f88ba580c73`
- Exact evidence SHA-256: `63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500` (4,935 bytes)
- Deployed source SHA-256: `c0ff057d983c72ba0df0cc04021a993ffde4c0d0e97ba3aedf49d71efa293296`


| Operation | Verified result | Evidence |
| --- | --- | --- |
| Deployment | FINALIZED / SUCCESS | [Explorer](https://explorer-studio.genlayer.com/transactions/0xbeecc48fd5e22c3890704f8305c03aaf6dfe4d61b60bf6aadac6ab3a0e1b69f0) |
| create_assignment | FINALIZED / SUCCESS | [Explorer](https://explorer-studio.genlayer.com/transactions/0xcf51fef26f4f9ed7d31fe6895d3af2e4902f866afe9f655f1c8c52935b6bb06a) |
| submit_delivery | FINALIZED / SUCCESS | [Explorer](https://explorer-studio.genlayer.com/transactions/0xd36f303ee4432af79602d69fd118ee942e2d4179c72ba9a95454d7d002f5afac) |
| open_dispute | FINALIZED / SUCCESS | [Explorer](https://explorer-studio.genlayer.com/transactions/0xf1749eda5d16d41a8f07bd2295866a5cb7d0396dca4e2f5662747df34c4791ad) |
| adjudicate | FINALIZED / ERROR | [Explorer](https://explorer-studio.genlayer.com/transactions/0x577ac6f7f93b91dc62042a7e65bdb2c0219e0255894902ba01f63e639483c986) |

## Isolated local workflow — tested on real desktop/mobile Chromium

```sh
npm ci
npm test
npm run test:contract
npm run lint
npm run build
npm run dev
```

Open the displayed local URL. Choose **Try offline lifecycle**, then **Review mandate → Lock offline mandate → Load offline delivery → Commit delivery → Open delivery dispute → Explain expected outcome**. The local fixture intentionally lacks complete evidence. Its receipt is labeled **Offline review receipt · INCONCLUSIVE**. No Heurist request, wallet funding or chain write occurs; the on-chain verdict counter stays unchanged.

```sh
python scripts/verify-candidate-inputs.py
npx playwright install --with-deps chromium
npm run test:browser
```

Real Chromium verified the full flow on desktop and mobile in [CI](https://github.com/haris4587/ProofPilot/actions/runs/43410196941). The assertions also require no POST requests, no page errors and no horizontal overflow.

## Pinned SDK check

Use Python 3.12+:

```sh
python -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/genvm-lint check contracts/proof_pilot_v3.py --json
.venv/bin/python scripts/check-candidate-sdk.py
```

The tooling reuses the official artifact already validated by the linter because the direct runner's original asset URL returns 404. Native direct mode uses the real pinned SDK with mocked web/LLM I/O and checks closure serialization/validator callbacks. It is not WASM or live consensus.

## Live writes

The authorized deployment and four submissions have been consumed. Do not resend the historical adjudication or deploy another speculative version. An optional new live run requires its own authorization and a Studio account that owns its task. Do not impersonate the historical owner or export private keys. No additional Heurist execution is needed to inspect the archived result.
