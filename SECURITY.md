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

# Security boundaries

## Commitments and ownership

Mandates and delivery bundles must be canonical JSON and match their SHA-256 commitments. They become immutable at the corresponding lifecycle transition. A commissioning-client address controls delivery, dispute and adjudication. Task IDs are unique; task capacity and input sizes are bounded. Decisions are terminal and recorded through append-only hash-linked audit receipts. No escrow, staking, token payout or real-fund transfer is implemented.

## Evidence and model boundary

Only commit-pinned HTTPS raw GitHub source URLs matching the strict allowlist grammar are retrieved, with duplicate rejection, response-status/size bounds, UTF-8 decoding and exact SHA-256 verification on every node. The report is bound by the bundle hash. Source spans preserve actual UTF-8 bytes; models never fabricate source quotation text or offsets.

All reports, source bodies, provenance, disputes and catalog entries are treated as untrusted data, never instructions. Leader and validators independently retrieve evidence. Validators make a blind nine-criterion assessment and then judge citation relevance against full context. Merely matching a substring or valid JSON shape is not sufficient. Prompt-injection resistance and model relevance judgment remain probabilistic; offline mocks do not prove them.

V3 accepts only nine compact criterion/state/reference rows with fixed IDs/enums and bounded references. Unknown fields, root types, wrong counts, invalid references, disagreement and provider exceptions fail closed. No response repair or silent semantic coercion is used. Any UNKNOWN derives INCONCLUSIVE; otherwise VIOLATED derives REJECTED; otherwise ACCEPTED. Explicit independently agreed source-unavailability errors may produce INCONCLUSIVE. Provider/formatting errors roll back instead of becoming a verdict.

## Execution bounds and actual limitation

One leader assessment and at most two prompts per verifying node per execution; no contract-level retries. Network rotations are separately bounded by transaction configuration. The latest adjudication used maximum two rotations and was submitted once. It finalized with ASSESSMENT_COUNT and left the task DISPUTED. No successful network verdict is claimed. Earlier zero-rotation successes retained a default configured maximum of three; this mismatch is disclosed in DEPLOYMENT.md.

## Website and secrets

Public verification and local fixtures require no private key or provider token. Provider keys/operator access tokens stay server-side, and the research endpoint requires authorization. Credentials are not included in evidence or editing assets. Development session wallets are tab-local; never substitute another owner or export Studio private keys. UI example receipts must always stay labeled offline and cannot increment a successful on-chain verdict counter.

Do not rerun scripts to recover from an uncertain write. Preserve its hash and inspect read-only state. Network quotas, provider policies, model disagreement, source availability and Studio resets can block progress. No wallet funding, credit purchase or subscription is included. Report a reproducible issue through a private maintainer channel without including credentials; public issues should contain only sanitized evidence.
