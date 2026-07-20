# Worker Docker Build

`Dockerfile` builds the development image used by the `worker` service in
`docker-compose.yml`.

1. It starts from Node 22, enables Corepack for the repository-pinned pnpm
   version, and installs OpenSSL for Prisma.
2. It copies the workspace manifests and then all application and package
   sources needed to resolve workspace dependencies.
3. It installs the frozen workspace dependency graph using the shared, locked
   BuildKit pnpm store. Retried and longer registry fetches prevent transient
   npm latency from aborting the image build.
4. It generates the Prisma client with a build-only placeholder
   `DATABASE_URL`; Compose passes the real connection string when the worker
   runs migrations and jobs.
5. The Dockerfile defaults to `pnpm --filter @techblog/worker dev`, while
   Compose overrides that command to migrate, register sources, and start the
   worker.

