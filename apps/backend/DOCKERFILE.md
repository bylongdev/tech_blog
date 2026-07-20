# Backend Docker Build

`Dockerfile` builds the development image used by the `backend` service in
`docker-compose.yml`.

1. It starts from Node 22, enables Corepack for the repository-pinned pnpm
   version, and installs OpenSSL, which Prisma needs at runtime.
2. It copies the workspace manifest files before copying `apps` and `packages`.
   Docker can therefore reuse the dependency layer until a manifest or lockfile
   changes.
3. It installs the entire frozen workspace dependency graph. The BuildKit cache
   at `/pnpm/store` is shared and locked across service builds; retry, timeout,
   and concurrency settings make slow npm registry responses recoverable.
4. It generates the Prisma client with a build-only placeholder
   `DATABASE_URL`; the real value is supplied by Compose at runtime.
5. Compose starts the backend with `pnpm --filter @techblog/backend dev`.

