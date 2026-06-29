# Tech Blog

A TypeScript monorepo for ingesting technology news from multiple sources, processing article content, generating embeddings, and grouping related stories for downstream publishing workflows.

## ✨ Features

- Multi-source ingestion with source registration and RSS fetching
- Structured persistence with PostgreSQL + Prisma
- Queue-based background processing with BullMQ + Redis
- AI-powered embedding generation using OpenAI
- Candidate grouping workflow for related-article clustering
- Container-ready local infrastructure via Docker Compose

## 🧰 Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
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
- Database schema and migrations are managed with Prisma

### Local Runbook

1. Install dependencies:
   - `pnpm install`
2. Start infrastructure services:
   - `docker compose up -d`
3. Configure environment variables (for example):
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
   - `REDIS_HOST`
   - `REDIS_PORT`
4. Generate Prisma client:
   - `pnpm db:generate`
5. Run migrations:
   - `pnpm db:migrate`
6. Register sources:
   - `pnpm wk:source:register`
7. Run worker flow:
   - `pnpm wk:dev`
8. Start queue listener (separate terminal):
   - `pnpm wk:queue:listen`
9. Start the frontend app (separate terminal):
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
