# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable

WORKDIR /workspace

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY apps ./apps
COPY packages ./packages

RUN --mount=type=cache,id=techblog-pnpm-store,target=/pnpm/store,sharing=locked \
    pnpm install --frozen-lockfile --fetch-timeout=600000 --fetch-retries=5 --network-concurrency=8

CMD ["pnpm", "--filter", "@techblog/frontend", "dev"]
