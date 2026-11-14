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

# ProofPilot — AI Agent Delivery Court

ProofPilot makes AI research accountable to an immutable mandate: preserve the agent's actual delivery, commit its evidence, open a dispute and request independent GenLayer review.

## Current verified status — 14 November 2026

Deployment, mandate, authentic delivery and dispute finalized successfully. The one submitted V3 adjudication finalized with execution ERROR (`ASSESSMENT_COUNT`, `MAJORITY_DISAGREE`). The task remains DISPUTED. No verdict or decision hash exists. All blockchain writes stopped; no further deployment, retry, funding or Heurist request was made.

The public interface is a credential-free evidence walkthrough plus an explicitly labeled isolated offline lifecycle. A working reader does not imply successful network adjudication. **This project is not mission-ready.**

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

## Try the demonstration

Open the website and choose **Try the Demo**. Verify the local mandate/delivery commitments, optionally fetch and hash all three pinned source snapshots, inspect genuine receipts and use the public finalized-state read. **Try offline lifecycle** walks through mandate, delivery, dispute and an example review without wallet credentials or paid credits. Its receipt is labeled offline; it is never recorded as a real verdict.

[Step-by-step reproduction](REPRODUCE.md) · [Authentic evidence](EVIDENCE.md) · [Architecture](ARCHITECTURE.md) · [Security](SECURITY.md)

![Real desktop browser walkthrough](evidence/authorized-finish-2026-11-13/browser/demo-credential-free-archi-bcc80-y-labeled-offline-lifecycle-desktop/overview.png)

## Integration boundaries

- **Internet Court:** mandate, rubric, committed action receipt, dispute and review protocol adapter. No remote filing endpoint, escrow service or legal judgment is claimed.
- **Heurist:** genuine archived `ExaSearchDigestAgent.exa_web_search` execution from 12 November 2026. It is reused openly under a retrospective mandate. No extra provider execution occurred. Live operator execution remains protected server-side.
- **GenLayer:** standalone `ProofPilotV3` with nine compact assessments, independently retrieved/hash-verified source bytes, deterministic citation spans and verdict formatting, blind validator assessment plus citation-relevance checking. Its actual network attempt failed response validation; offline tests are not consensus evidence.

## Run and verify

```sh
npm ci
npm test
npm run test:contract
npm run lint
npm run build
npm run dev
```

For real desktop/mobile Chromium tests, install the supported browser and run:

```sh
npx playwright install --with-deps chromium
npm run test:browser
```

57 Python tests and 47 JavaScript tests passed. Real desktop/mobile browser workflows and pinned SDK validation passed in [candidate CI](https://github.com/haris4587/ProofPilot/actions/runs/43410196941). Browser screenshots and WebM recordings are preserved in `evidence/authorized-finish-2026-11-13/browser/`. Release changes must pass CI again before production.

## Video and editing project

The narrated **43.8-second, 1920×1080 MP4** is a truthful progress film, with original motion editing, synchronized subtitles and the authentic Internet Court, GenLayer and Heurist logos. It visibly identifies the adjudication blocker; it is not a successful-consensus film. See [video delivery and credits](DEMO.md). Earlier progress exports remain preserved.

All previous contract versions, tasks, receipts and genuine research remain in `contracts/` and `evidence/`. See [deployment history and procedures](DEPLOYMENT.md). Mission material remains a [blocked submission draft](SUBMISSION.md).
