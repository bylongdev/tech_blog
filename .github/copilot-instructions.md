---
applyTo: "**"
---

# Project general coding standards

## Technology Stack

- TypeScript + Node.js (ESM, `moduleResolution: nodenext`)
- pnpm workspaces monorepo (`apps/*`, `packages/*`)
- Prisma ORM with PostgreSQL
- BullMQ with Redis for async queue processing
- Use the project's existing AI providers and clients.
- Do not introduce alternative AI SDKs unless requested.
- Docker Compose for local infrastructure

## Coding Style

- Follow existing TypeScript style in this repo: strict types, async/await, semicolons, and `.js` extension in local ESM imports.
- Prefer small, focused functions and classes with clear responsibilities.
- Keep data mapping explicit (for example DTO -> Prisma model mapping helpers).
- Reuse existing services/utilities before introducing new abstractions.
- Do not edit generated Prisma client code under `packages/database/generated`.
- Prefer modifying existing code over rewriting.
- Avoid introducing abstractions unless they clearly reduce duplication.

## Naming Conventions

- Use `kebab-case` for file names (for example `raw-article.service.ts`, `fetch-sources.job.ts`).
- Use suffix-based naming by role:
  - `*.service.ts` for business/data services
  - `*.job.ts` for job orchestration
  - `*.worker.ts` for queue workers
  - `*.source.ts` for source definitions
  - `*.client.ts` for external clients
- Use `PascalCase` for classes/interfaces/types and `camelCase` for functions/variables.
- Keep DTO names explicit (`CreateRawArticleDto`, `FetchLogDto`).

## Architecture

- Respect package boundaries.
- Shared contracts belong in packages/shared.
- Database access belongs in packages/database.
- Avoid introducing unnecessary coupling between packages.
- Keep package boundaries clear: shared contracts in `packages/shared`, persistence via `@techblog/database`.

## Preferred Patterns

- Validate required environment variables early and fail fast with explicit errors.
- Handle deduplication and idempotency in persistence flows (for example unique `link`, upsert by `slug`).
- Use Prisma through the shared `prisma` client.
- Keep queue producer/worker responsibilities separated and close queue connections when done.
- Log meaningful operational context (source name, candidate/article id, job purpose).

## Patterns to Avoid

- Do not bypass service layers with duplicated inline DB logic.
- Do not swallow errors silently or return success-shaped defaults that hide failure.
- Do not hardcode secrets, API keys, or environment-specific values.
- Do not modify migration history or generated files unless the task explicitly requires it.
- Do not introduce cross-package coupling when a shared DTO/type belongs in `packages/shared`.

## Error Handling

- Throw explicit errors for invalid configuration/input.
- Catch errors only when you can add context, update state, or recover safely; otherwise rethrow.
- Preserve failure visibility in pipeline stages (fetching, persistence, embedding, grouping).
- Ensure long-running scripts/workers disconnect/cleanup resources in `finally` blocks.
- Do not suppress exceptions to satisfy the compiler.

## Security

- Never commit secrets or `.env` values.
- Read secrets from environment variables only (`DATABASE_URL`, `OPENAI_API_KEY`, `REDIS_*`).
- Treat fetched remote content as untrusted input; sanitize/clean before downstream AI or persistence usage.
- Keep dependency and API usage scoped to least required data.

## Testing

- There is currently no mature automated test suite; do not invent new tooling for small changes.
- For behavior changes, validate via relevant existing scripts/workflows (for example worker runbook commands in `README.md`).
- For DB changes, ensure Prisma schema/migrations are coherent and Prisma client generation still works.
- Prefer adding targeted tests only when test infrastructure for that package already exists.

## Documentation

- Update `README.md` when changing setup, environment variables, worker flow, or run commands.
- Keep inline comments minimal and only for non-obvious logic.
- Document new queues/jobs/services with concise purpose and execution expectations.
- Do not update documentation unless behaviour, setup, or public APIs change.

## Change Scope

- Make the smallest change necessary.
- Avoid unrelated refactoring.
- Do not rename files without reason.
- Preserve existing public APIs unless requested.
