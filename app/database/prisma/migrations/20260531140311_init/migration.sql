-- CreateEnum
CREATE TYPE "FetchStatus" AS ENUM ('SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "FetchType" AS ENUM ('RSS', 'HTML', 'API');

-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('NEW', 'DUPLICATE', 'QUEUED', 'PROCESSED', 'FAILED');

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "fetchType" "FetchType" NOT NULL,
    "parserType" TEXT NOT NULL DEFAULT 'default',
    "fetchConfig" JSONB,
    "category" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "fetchIntervalMinutes" INTEGER NOT NULL DEFAULT 30,
    "lastFetchedAt" TIMESTAMP(3),
    "lastSuccessAt" TIMESTAMP(3),
    "lastFailedAt" TIMESTAMP(3),
    "failureCount" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawArticle" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "guid" TEXT,
    "summary" TEXT,
    "content" TEXT,
    "author" TEXT,
    "imageUrl" TEXT,
    "publishedAt" TIMESTAMP(3),
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" TEXT,
    "status" "ArticleStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RawArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FetchLog" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "status" "FetchStatus" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "itemsFound" INTEGER,
    "itemsInserted" INTEGER,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FetchLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_url_key" ON "Source"("url");

-- CreateIndex
CREATE UNIQUE INDEX "RawArticle_link_key" ON "RawArticle"("link");

-- CreateIndex
CREATE INDEX "RawArticle_sourceId_idx" ON "RawArticle"("sourceId");

-- CreateIndex
CREATE INDEX "RawArticle_status_idx" ON "RawArticle"("status");

-- CreateIndex
CREATE INDEX "RawArticle_publishedAt_idx" ON "RawArticle"("publishedAt");

-- CreateIndex
CREATE INDEX "RawArticle_hash_idx" ON "RawArticle"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "RawArticle_sourceId_guid_key" ON "RawArticle"("sourceId", "guid");

-- CreateIndex
CREATE INDEX "FetchLog_sourceId_idx" ON "FetchLog"("sourceId");

-- CreateIndex
CREATE INDEX "FetchLog_status_idx" ON "FetchLog"("status");

-- CreateIndex
CREATE INDEX "FetchLog_startedAt_idx" ON "FetchLog"("startedAt");

-- AddForeignKey
ALTER TABLE "RawArticle" ADD CONSTRAINT "RawArticle_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FetchLog" ADD CONSTRAINT "FetchLog_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
