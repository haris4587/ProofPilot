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

# Deployment and execution record

## Current Studionet deployment

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

The single exact-source deployment and each lifecycle call were submitted once through the existing Studio built-in account. Constructor `[]`, value zero, Full Consensus / leaderOnly false. No private key export, MetaMask substitution, purchase, explicit funding action or extra Heurist request occurred.

**Rotation disclosure:** the deployment and first three lifecycle receipts retained Studio's default configured maximum of three; all used zero rotations. The setting is tab-local and was previously edited in a different tab. The adjudication sending tab was corrected through SPA navigation: its receipt confirms configured maximum two and two rotations used. No transaction was resubmitted to conceal or correct the earlier setting mismatch.

Deployment, mandate, authentic delivery and dispute finalized successfully. The one submitted V3 adjudication finalized with execution ERROR (`ASSESSMENT_COUNT`, `MAJORITY_DISAGREE`). The task remains DISPUTED. No verdict or decision hash exists. All blockchain writes stopped; no further deployment, retry, funding or Heurist request was made.

Raw receipts, finalized states, retrieved deployed source/schema and execution ledger are in `evidence/authorized-finish-2026-11-13/`. `scripts/verify-approved-step.mjs` performs read-only verification and never signs, funds or submits. All prior deployments remain preserved, including [corrected V2](https://explorer-studio.genlayer.com/address/0xdcDdcB1C570700Da7C3d6c98E9FCC23801608373), [V2](https://explorer-studio.genlayer.com/address/0x8d64250Eb8c3Eafb8628482d2381799189055a90) and [V1](https://explorer-studio.genlayer.com/address/0x95e28B38a3268f9e625e766B3FD6Cd0aa9f5430f).

## Existing Vercel website

Project `proofpilot`, team `anza0x`, project ID `prj_9unyAjWlY4DNX29COzETBhlOsMVl`. Production URL: https://proofpilot-anza0x.vercel.app/. Only this existing Vercel project is authorized. The Vite build outputs `dist/`; server-side API functions remain in `api/`. Preserve existing protected provider/operator environment values; never export them into frontend variables or commit them.

Before release: `npm ci`, unit/contract tests, lint/typecheck/build, real desktop/mobile Chromium and CI. Deploy the exact reviewed Git commit using the existing connection, wait for READY and verify homepage, credential-free archive, source/hash checks, labeled offline flow, receipt exports, video and `/api/status`. A GET of `/api/research` must return 405 without starting a provider request. Never use a live provider execution as a deployment smoke test.

## Future contract procedure — not presently authorized

Recompute source SHA-256 and mandate/bundle commitments, inspect the active owner/network/rotation setting in the **sending tab**, use Full Consensus and no simulation, submit each authorized operation once, and require both FINALIZED/SUCCESS and expected finalized state before continuing. A new contract cannot repair the stored state of an old contract. Stop on uncertainty, disagreement, source mismatch or funding/payment requirements. Existing legacy deploy scripts are not this bounded Studio procedure and must not be run for retries.
