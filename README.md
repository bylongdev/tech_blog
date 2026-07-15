# Tech Blog

A TypeScript monorepo for ingesting technology news from multiple sources, processing article content, generating embeddings, and grouping related stories for downstream publishing workflows.

## ✨ Features

- Multi-source ingestion with source registration and RSS fetching
- Express backend API with session-based authentication and role-based access control
- Structured persistence with PostgreSQL + Prisma
- Queue-based background processing with BullMQ + Redis
- AI-powered embedding generation using OpenAI
- Candidate grouping workflow for related-article clustering
- Container-ready local infrastructure via Docker Compose

## 🧰 Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [BullMQ](https://bullmq.io/)
- [OpenAI API](https://platform.openai.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Deployment

This project is currently configured for local and self-hosted execution:

- **PostgreSQL** and **Redis** are provisioned via `docker-compose.yml`
- Worker processes run from the monorepo and connect to those services
- Backend API runs from the monorepo and uses PostgreSQL-backed sessions
- Database schema and migrations are managed with Prisma

### Local Runbook

1. Install Docker Desktop (or Docker Engine with the Compose plugin).
2. Clone the repository and create the local environment file:
   - `cp .env.example .env`
   - Replace the example PostgreSQL, Redis, and session credentials in `.env`.
   - Wrap any credential containing `$` in single quotes, for example `REDIS_PASSWORD='value$part'`.
3. Start the complete stack:
   - `docker compose up --build`
4. Open `http://localhost:3000`.

Compose installs dependencies in the image, generates the Prisma client, waits for PostgreSQL and Redis, applies migrations, registers sources, and then starts the backend, worker, and frontend. No host installation of Node.js or pnpm is required. The first registered account becomes `ADMIN` to bootstrap role-protected routes.

All credentials are read from the ignored root `.env` file; none are stored in `docker-compose.yml`. OpenAI-backed worker jobs require a real `OPENAI_API_KEY`, but that variable may remain empty when those jobs are not used. The port variables are optional overrides.

Useful commands:

- Start in the background: `docker compose up --build -d`
- View service status: `docker compose ps`
- Follow logs: `docker compose logs -f`
- Stop services while preserving data: `docker compose down`
- Stop services and delete local database/queue data: `docker compose down --volumes`
- Run only infrastructure for host-based development: `docker compose up -d postgres redis`

For host-based development, install dependencies with `pnpm install`, configure the variables shown in `.env.example`, generate the Prisma client with `pnpm db:generate`, and run migrations with `pnpm db:migrate`.

## 🧠 Lessons Learned

Building this pipeline reinforces several backend engineering principles:

- Designing idempotent ingestion and source registration flows
- Keeping asynchronous processing reliable through queue-based orchestration
- Structuring article normalization for downstream AI processing
- Coordinating database state transitions across ingestion, embedding, and grouping stages
- Managing local AI + cloud AI integrations in one system

### 💪 Challenges

- **Data quality variability across feeds:** handled with normalized cleaning and candidate preparation
- **Async workflow coordination:** solved through explicit queue jobs and status transitions
- **Environment consistency:** improved with Dockerized service dependencies and workspace scripts
- **Embedding lifecycle reliability:** addressed through staged processing and persistent candidate states

## 👩‍💻 Author

**Long Nguyen**  
Software Engineer

- 🌐 [LinkedIn](https://www.linkedin.com/in/longngdev/)
