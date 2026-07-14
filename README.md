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
- [Ollama](https://ollama.com/) (used by local concept-extraction components)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Deployment

This project is currently configured for local and self-hosted execution:

- **PostgreSQL**, **Redis**, and **Ollama** are provisioned via `docker-compose.yml`
- Worker processes run from the monorepo and connect to those services
- Backend API runs from the monorepo and uses PostgreSQL-backed sessions
- Database schema and migrations are managed with Prisma

### Local Runbook

1. Install dependencies:
   - `pnpm install`
2. Start infrastructure services:
   - `docker compose up -d postgres redis`
   - To run the app containers too: `docker compose up -d backend worker`
   - The Compose mounts keep workspace `node_modules` inside Docker volumes so container installs do not leave broken Windows junctions in `apps/*/node_modules` or `packages/*/node_modules`.
3. Configure environment variables (for example):
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
   - `REDIS_HOST`
   - `REDIS_PORT`
   - `SESSION_SECRET`
   - `FRONTEND_ORIGIN`
   - `BACKEND_PORT`
4. Generate Prisma client:
   - `pnpm db:generate`
5. Run migrations:
   - `pnpm db:migrate`
6. Start the backend API:
   - `pnpm be:dev`
   - or `docker compose up -d backend`
   - The first registered account becomes `ADMIN` to bootstrap role-protected routes
7. Register sources:
   - `pnpm wk:source:register`
8. Run worker flow:
   - `pnpm wk:dev`
   - or `docker compose up -d worker`
9. Start queue listener (separate terminal):
   - `pnpm wk:queue:listen`
10. Start the frontend app (separate terminal):
   - `pnpm fe:dev`

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
