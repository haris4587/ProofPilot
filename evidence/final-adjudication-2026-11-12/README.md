# Single authorized adjudication — finalized execution ERROR

The user explicitly authorized one adjudicate("pp-recovery-18ec1e64ccb747d8") transaction on the existing contract, Stable Studionet 61999, value 0, leaderOnly false, consensusMaxRotations 2. The retained browser account was loaded and its displayed address matched 0x98ed19cBF7541be09f3e5EFc13bddeAd99f8dF85. A LATEST_FINAL state read confirmed DISPUTED with the expected evidence hash before execution.

Exactly one transaction was submitted:
https://explorer-studio.genlayer.com/transactions/0x8aa6496ed052fb6516c06563e27ce60d5fc680aa6f194de12739931807547df2

The UI's bounded finality wait timed out while the transaction was still proposing. Only read-only receipt/state checks followed; no transaction was repeated. The transaction subsequently reached FINALIZED with execution ERROR. Both recorded leader execution results are ERROR / rollback with payload:

`[LLM_ERROR] Invalid grounded decision; rotate validator`

A post-finality LATEST_FINAL read confirms DISPUTED, decision {}, and unchanged evidenceHash 63f65ff031703e754867fac5fb6c40013392b6d365b80613ad9f8339accf1500. This is NOT a valid adjudication verdict and must not be labeled INCONCLUSIVE, REJECTED or ACCEPTED. The three preceding mandate/delivery/dispute transactions remain finalized successes.

## Investigation and limits

The unchanged deployed contract makes at most two prompt attempts per evaluation. It accepts an answer only when strict structure, per-criterion outcome derivation, ASCII bounds and exact quotation grounding validate. Prompt/parse exceptions are caught within that loop; after exhausting attempts it raises this generic LLM_ERROR. The receipt exposes the rollback error but not the rejected answer or caught prompt exception. Therefore the precise historical root cause (provider exception, response format, criterion mismatch, or grounding violation) is unproven. Prior offline tests reproduce the same boundary using invented citations and demonstrate that a grounded INCONCLUSIVE structure is permitted; they do not establish the real failure's cause.

No validator checks were weakened, no verdict was forced, and no contract was modified or redeployed. No further Heurist request or adjudication retry occurred. Diagnosing this properly requires better visibility into the caught failure before proposing any change. Further network execution or contract deployment needs separate explicit approval. Do not consume another transaction merely to repeat the same generic failure.

The screenshot shows FINALIZED without the SUCCESS marker; transaction.json and verified-result.json distinguish finality from execution failure. The finalized state remains authoritative. The preparation-only website captions remain outdated; the user's success-dependent caption/video/final-submission work was stopped after execution failure. No polished success video or mission completion is claimed. Existing evidence is preserved.
