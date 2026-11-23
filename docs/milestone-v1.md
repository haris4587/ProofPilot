# ProofPilot milestone v1 — Audit Desk and receipt verification

Date: 23 November 2026.

## Exact scope and baseline

The implementation starts from pre-change main commit `85faba2f28908b81fb05067b6c117dccbf9de149`. This is the repository head inspected before this work. The repository contains no authoritative record mapping Project Explorer approval to an exact reviewed commit; do not describe this baseline as a steward-certified accepted revision. The immutable baseline-to-release comparison and release commit are supplied with the submission.

No deployed contract, ABI, evidence archive or contract-address configuration changes in this milestone. The reader remains bound to existing V4 contract [0xf0EE634ab77Bdc99B7905E227569A5A96b8dd3ff](https://explorer-studio.genlayer.com/address/0xf0EE634ab77Bdc99B7905E227569A5A96b8dd3ff), Studionet 61999. Existing historical workflow write configuration is preserved. No deployments, writes, provider executions, purchases or wallet creation are needed by the new desk.

## What changed and why it matters

| Before this milestone | New behavior |
| --- | --- |
| Fixed Aave archive; one hard-coded task comparison | Enter an existing V4 task ID and read latest-final task plus its bounded global audit history |
| Separate mandate and delivery hash checks | Seven independent checks cover mandate, nine criteria, exact delivery bytes, phase consistency, complete audit linkage, latest state binding and decision receipt |
| Download individual evidence files | Export a single versioned, hash-bound review packet; re-import and re-verify locally |
| No snapshot comparison | Keep a verified baseline and compare task owner, phase, commitment, delivery, dispute, audit head and decision fields |
| Either top-level or first leader success could imply successful execution | Any explicit top-level or nested leader execution error takes precedence; unknown execution remains unverified |

The audit chain starts with the task's AGREED event, checks action order and increasing global sequence numbers, recomputes event SHA-256, follows per-task previous hashes to the exact current audit head, then reconstructs the pre-save state hash for the last event. Interleaved events belonging to other tasks do not become part of this task's chain. A terminal decision must additionally match its own hash, task, commitments, previous audit head, reviewed action IDs and routing before a verdict label is shown.

The archive loader reconstructs historical events from three committed state snapshots and verifies the resulting hashes against the recorded audit heads. It is explicitly labeled archived data. Its correctness is tested against those real historical hashes; it is not a new chain result.

## Reviewer path

1. Open https://proofpilot-anza0x.vercel.app/#audit-desk (or choose **Audit Desk** in the navigation).
2. Click **Load archived review**. Expect internal integrity verification, passing checks and `DISPUTED · NO VERIFIED VERDICT`. The record remains explicitly unauthenticated against live state.
3. Click **Keep as comparison baseline**, then **Export review packet**.
4. Import that packet using **Import review packet**. It is labeled **Imported file**; no imported trust flag is accepted. Click **Compare snapshots** and expect zero changed fields.
5. Change file content without recomputing its packet hash and import it again. Expect a rejection. Invalid internal commitment or audit data also fails, even if the envelope hash is recomputed.
6. Click **Compare with live finalized state** to read the same existing deployment. A successful comparison confirms exact snapshot and full history equality. Public RPC failures remain explicit failures; they are never replaced with a cached live result.
7. Alternatively enter an existing task ID and click **Read finalized task**. Reads are permissionless and create no wallet. The default is `pp-object-20261114`.

## Tests and verification

- `npm test`: 64 JavaScript tests, including 16 audit-desk cases and contradictory receipt regression.
- `npm run test:contract`: 78 existing Python contract tests. Contract code is unchanged.
- `npm run lint` and `npm run build`: pass locally.
- `npm run test:browser`: desktop/mobile coverage for archive verification, export/import, modified-file rejection, comparison, no page errors, no horizontal overflow and no POST requests in the offline workflow, plus the existing demo walkthrough.
- Local Chromium launch is restricted by this container's socket policy. Real browser verification runs in GitHub CI; its final result is provided in the submission. Do not count an environment launch failure as a browser pass.

## Limits and trust boundaries

A self-hashed imported packet is not a signature or proof of blockchain origin. An attacker can fabricate a fully self-consistent packet; public finalized matching is necessary to authenticate its current contents. Snapshot comparison is structural, not a guarantee of chronological progress or factual correctness. Source hashes inside a delivery do not prove source truth, complete semantic support or provider identity. This desk does not reproduce AI consensus.

Imports are schema-checked, capped at 128 KiB and rendered as text through React. RPC task/event responses are size-bounded. Reads stop at a matching head or after 32 global audit entries, with a 25-second overall wait. If the task's full history is outside that prefix, the desk reports incomplete integrity. A public RPC outage is not proof of missing history. No configurable RPC target or imported address can redirect the reader away from the fixed existing contract.

The original adjudication remains FINALIZED / execution ERROR (`EXTERNAL_SUPPORT_REQUIRED`) and the task remains DISPUTED. This milestone does not claim a successful adjudication or new verdict. The synthetic terminal-receipt test is explicitly synthetic.

## Submission draft (under 1,000 characters)

Added an Audit Desk for public, wallet-free review of tasks on the existing ProofPilot contract. Reviewers can read finalized task state, verify mandate and exact delivery commitments, inspect the complete per-task audit hash chain and validate terminal decision receipts. Versioned review packets can be exported, imported and checked locally; imported files remain integrity-only until matched against live finalized state. A snapshot comparison highlights changes in owner, lifecycle phase, commitments, delivery, dispute, audit head and decision. Receipt classification now rejects contradictory execution success/error signals. Added tampering, incomplete-history, decision-binding and desktop/mobile regressions. Contract address and contract code are unchanged. The earlier adjudication failure remains disclosed; this milestone adds independent review tools rather than claiming a new successful verdict.
