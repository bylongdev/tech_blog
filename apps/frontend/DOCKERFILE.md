# Frontend Docker Build

`Dockerfile` builds the development image used by the `frontend` service in
`docker-compose.yml`.

1. It starts from Node 22 and enables Corepack so pnpm matches the version
   pinned by the repository.
2. It copies the workspace manifest files followed by all applications and
   packages, allowing Docker to cache dependency installation when those inputs
   do not change.
3. It installs the frozen workspace dependency graph through the shared,
   locked BuildKit pnpm store. The install retries slow registry requests with a
   longer timeout and bounded download concurrency.
4. No Prisma generation is necessary for the frontend image.
5. Compose starts Next.js with `pnpm --filter @techblog/frontend dev`.
