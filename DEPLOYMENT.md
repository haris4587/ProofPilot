# Deployment

## Intelligent Contract: preferred Studio workflow

1. Open https://studio.genlayer.com and select its existing built-in account. Stable Studionet is chain 61999.
2. Import `contracts/proof_pilot.py` under Your Contracts.
3. Open Run and Debug and retain **Normal (Full Consensus)**. Deploy without constructor parameters.
4. Wait for **FINALIZED**; inspect execution success and read `get_count` from finalized state. A deployment marked accepted is not sufficient.
5. Record the actual address, deployment hash, sender, source hash and explorer links in `evidence/deployment.json`.
6. Set `VITE_CONTRACT_ADDRESS` in Vercel and redeploy the frontend.

Fallback CLI script: with a newly configured, disposable developer key in the process environment, `npm run deploy:contract`. It never prints the key. It uses the pinned SDK Studionet preset and waits for finality plus execution success. Use the Studio UI if network access from the container is unavailable. Do not export the existing Studio account private key to run the script.

## Vercel only

The user explicitly authorized production publication on Vercel. The application has `vercel.json`, Vite output settings and native Vercel serverless handlers. Do not use another hosting service as a fallback.

Before publishing, run build, lint and both test suites. Create or select the Vercel project connected to `haris4587/ProofPilot`; confirm the tested commit and root directory. Add server-only keys through the provider's secure settings. Trigger a production deployment, wait for READY and verify the page, status endpoint and protected API behavior. Missing keys must show as unconfigured, never live success.

A Vercel team authorization error requires the account owner to approve the provider-generated team-access link. An agent cannot approve this access grant itself. No live website URL should be reported before a READY deployment is verified.

## Release caveats

Studionet is a development environment and may reset. Keep the reproducible source, deployment metadata and raw receipt exports in Git. The website's in-memory draft state is not the contract record. Use finalized `get_task` state to recover authoritative results.

## Current release record

The first instance is recorded in `evidence/deployment.json`, with its exact source archived alongside it. An additional deployment of the explicit null-guard version was blocked by automatic approval review, which requested separate GenLayer deployment authorization. Vercel team access was subsequently approved. The website is published at https://proofpilot-anza0x.vercel.app/ with deployment state READY; see `evidence/vercel-deployment.json`. The source was uploaded directly because Vercel refused repository linking for this GitHub account. Git-push deployment automation is not connected.
