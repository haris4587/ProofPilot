# Heurist schema mismatch repair — 12 November 2026

The user reached `The published Heurist tool schema differs from this adapter. Review it before executing.` in production. This is emitted after the schema GET and before the research POST; the adapter did not send a research request on that path. This does not by itself verify the Heurist key's authentication or available credits, because schema discovery is public.

## Verified cause and repair

The actual public schema returned HTTP 200 and requires `search_term` for `ExaSearchDigestAgent.exa_web_search`. ProofPilot had assumed the argument was `query`. The current schema snapshot is preserved at ../../tests/fixtures/heurist-exa-schema-2026-11-12.json with SHA-256 in verification.json. Official agent source also uses search_term: https://github.com/heurist-network/heurist-agent-framework/blob/main/mesh/agents/exa_search_digest_agent.py . Official request envelope: https://github.com/heurist-network/heurist-mesh-skill/blob/main/SKILL.md .

The adapter now constructs the current search_term argument and requests six results, the published minimum. It keeps explicit support for the earlier query-shaped schema used in regression tests. It requires an object schema, a string search field, the expected required field, and no unsupported required arguments. Unknown schema requirements still fail before the POST. No auth checks, byte limits, provenance hashes, or no-retry guards were removed.

The schema request has a 10-second timeout and the research request 40 seconds, within the existing 60-second Vercel function budget. The official agent declares a 35-second default, so the former shared 18-second timeout risked abandoning a legitimate research response prematurely. There is still no automatic execution retry after uncertain delivery.

## Validation and execution status

31 JavaScript adapter/security/state tests and 22 mocked Python contract tests passed (53 total), plus TypeScript, ESLint and production build. One regression uses the actual captured schema; negative tests reject unknown required arguments, wrong types, malformed required declarations and wrong schema types before any research POST. Tests use explicit HTTP doubles for research responses: no real provider response is claimed.

Only a public schema GET was made during diagnosis; no credentials were retrieved or changed and no real research POST was sent. The schema lists a tool price of 0.5 credits. This is published pricing, not proof of an available free-credit balance, and no credits/subscription were purchased.

After deployment reaches READY, the user can keep the existing Chrome tab and mandate, then click Run Heurist research once. The browser already posts to /api/research, so the server fix does not require a page reload that would clear the memory-only operator token. If research succeeds, export its actual provider receipt, then pin actual source bytes before delivery commitment. On timeout or uncertain status, stop and investigate; do not blindly repeat the POST. The existing GenLayer contract and prior adjudication blocker remain unchanged.
