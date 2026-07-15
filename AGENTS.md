# Repository Instructions

## Project Overview

This repository is a TypeScript monorepo for a technology blog and its content-processing pipeline.

- Use pnpm workspaces under `apps/*` and `packages/*`.
- Use Node.js ESM with `moduleResolution: nodenext`.
- Use Prisma with PostgreSQL for persistence.
- Use BullMQ with Redis for asynchronous queue processing.
- Reuse the project's existing AI providers and clients. Do not introduce another AI SDK unless the task requires it.
- Use Docker Compose for local infrastructure.

## Working Principles

- Make the smallest change that fully addresses the request.
- Inspect and reuse existing services, utilities, types, and patterns before adding abstractions.
- Prefer modifying existing code over rewriting it.
- Avoid unrelated refactors, unnecessary renames, and public API changes unless requested.
- Preserve clear package boundaries and avoid unnecessary cross-package coupling.
- Do not edit generated Prisma client code under `packages/database/generated`.
- Do not rewrite migration history unless the task explicitly requires it.
- Preserve unrelated user changes in the working tree.

## Architecture

- Put shared contracts and DTOs in `packages/shared`.
- Keep database access and Prisma integration in `packages/database`.
- Access Prisma through the shared `prisma` client.
- Do not duplicate inline database logic when an existing service layer owns that behavior.
- Keep queue producers, job orchestration, and workers separated by responsibility.
- Handle deduplication and idempotency in persistence flows, such as unique links and slug-based upserts.

## TypeScript and Naming

- Follow the existing strict TypeScript style with `async`/`await` and semicolons.
- Include the `.js` extension in local ESM import paths.
- Prefer small, focused functions and classes with clear responsibilities.
- Keep mappings between DTOs, domain values, and Prisma models explicit.
- Use `kebab-case` file names.
- Use role-based suffixes such as `*.service.ts`, `*.job.ts`, `*.worker.ts`, `*.source.ts`, and `*.client.ts`.
- Use `PascalCase` for classes, interfaces, and types.
- Use `camelCase` for functions and variables.
- Give DTOs explicit names, such as `CreateRawArticleDto` and `FetchLogDto`.

## Configuration, Errors, and Cleanup

- Read secrets and environment-specific configuration from environment variables only.
- Validate required environment variables early and fail with explicit errors.
- Throw explicit errors for invalid input or configuration.
- Catch errors only to add context, update state, or recover safely; otherwise let them propagate.
- Do not return success-shaped defaults that conceal failures.
- Preserve failure visibility across fetching, persistence, embedding, grouping, and queue stages.
- Close queue, database, and other long-running connections in `finally` blocks when appropriate.
- Log useful operational context such as source names, candidate or article IDs, and job purpose.

## Security

- Never commit secrets, API keys, credentials, or `.env` contents.
- Treat remote content as untrusted input and clean or sanitize it before downstream AI processing or persistence.
- Scope dependency and API access to the least data and permissions required.
- Do not hardcode environment-specific URLs, credentials, or tokens.

## Validation and Testing

- Match the validation effort to the risk and scope of the change.
- The repository does not currently have a mature root test suite; do not add a new test framework for a small change.
- Use existing package checks and documented workflows where relevant.
- Run backend type checking with `pnpm be:typecheck` for backend changes.
- Run frontend linting or builds with the existing frontend scripts for frontend changes.
- For worker behavior, use the relevant worker commands documented in `README.md` when dependencies are available.
- For database changes, verify that the Prisma schema and migrations are coherent and that client generation succeeds.
- Add targeted tests only where the affected package already has suitable test infrastructure, unless the task explicitly requests new infrastructure.

## Documentation

- Update `README.md` when a change affects setup, environment variables, worker flows, or run commands.
- Document new queues, jobs, and services with a concise description of their purpose and execution expectations.
- Keep inline comments limited to non-obvious reasoning.
- Do not update documentation when behavior, setup, and public APIs remain unchanged.

## Common Commands

- Install dependencies: `pnpm install`
- Start the backend: `pnpm be:dev`
- Type-check the backend: `pnpm be:typecheck`
- Start the frontend: `pnpm fe:dev`
- Start the worker: `pnpm wk:dev`
- Listen to worker queues: `pnpm wk:queue:listen`
- Register worker sources: `pnpm wk:source:register`
- Open Prisma Studio: `pnpm db:studio`
- Generate the Prisma client: `pnpm db:generate`
- Create or apply a development migration: `pnpm db:migrate`

