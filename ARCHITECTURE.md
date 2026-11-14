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

# Architecture

## Workflow and trust boundaries

The existing React/Vite interface guides assignment → immutable mandate → delivery → dispute → review. Read-only archive verification needs no wallet or token. The optional offline walkthrough changes only tab-local state. The server-side Heurist adapter requires an operator token and provider credentials; public readers cannot initiate a paid provider run.

`ProofPilotV3` stores canonical mandate/bundle strings and SHA-256 commitments, an owner address, lifecycle state and append-only hash-linked audit receipts. Only the commissioning client may deliver, dispute or adjudicate. A final decision is terminal. No token transfer or escrow is implemented.

## Semantic reasoning and deterministic representation

Models must produce nine compact rows: `["C1", "SATISFIED", [span_id]]`, through C9 in order. State is SATISFIED, VIOLATED or UNKNOWN; no model-generated verdict, explanation, exact quotation or byte offset is accepted. The parser does not repair, coerce or silently replace a model's judgment.

The source catalog partitions the locked report and each independently retrieved SHA-256-verified source into chunks of at most 240 Unicode characters, preserving UTF-8 byte boundaries and actual text. Span IDs resolve to exact source index, start/end byte offsets and quotation bytes. Decided criteria require external support. Substring existence alone does not establish relevance.

Each validator independently retrieves sources, makes a blind criterion assessment and compares all nine states. A separate source-grounded validator judgment checks the leader's selected citations in full context. Outcome is derived deterministically: any UNKNOWN → INCONCLUSIVE; otherwise any VIOLATED → REJECTED; otherwise ACCEPTED. A bounded deterministic state summary is the explanation. Provider/schema/disagreement errors abort rather than invent a semantic outcome.

The final receipt binds task, mandate/evidence hashes, criterion states, source spans, review action and audit predecessor. Its decision hash is computed from canonical content. A finalized execution error creates no receipt or verdict.

## Nine locked criteria

1. C1: Explain how users supply assets and borrow against collateral
2. C2: Explain the health factor and liquidation risk
3. C3: Explain how variable borrowing interest rates work
4. C4: All three required facts are covered accurately
5. C5: At least two independently attributable sources
6. C6: Factual claims supported by evidence
7. C7: No unsupported financial claims
8. C8: Any unresolved contradiction must be acknowledged
9. C9: Deliver clear English research with direct source URLs. Review the submitted report against the original locked mandate and require evidence-backed consensus. Recovery review: the archived Heurist research was received on 2026-11-12 at 10:53:59.523 UTC before this replacement mandate. Review that prior result; no new agent execution is claimed.

## Actual network limit

Deployment, mandate, authentic delivery and dispute finalized successfully. The one submitted V3 adjudication finalized with execution ERROR (`ASSESSMENT_COUNT`, `MAJORITY_DISAGREE`). The task remains DISPUTED. No verdict or decision hash exists. All blockchain writes stopped; no further deployment, retry, funding or Heurist request was made.

The failed response bodies were not retained. ASSESSMENT_COUNT means the parsed result was not an array of exactly nine assessments; it does not reveal whether the root type or count was wrong. No unsupported cause is asserted.
