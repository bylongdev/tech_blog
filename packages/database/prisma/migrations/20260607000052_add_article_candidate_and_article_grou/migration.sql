/*
  Warnings:

  - You are about to drop the column `status` on the `RawArticle` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('QUEUED', 'EMBEDDED', 'GROUPED', 'PROCESSED', 'FAILED');

-- DropIndex
DROP INDEX "RawArticle_status_idx";

-- AlterTable
ALTER TABLE "RawArticle" DROP COLUMN "status";

-- DropEnum
DROP TYPE "ArticleStatus";

-- CreateTable
CREATE TABLE "ArticleCandidate" (
    "id" TEXT NOT NULL,
    "rawArticleId" TEXT NOT NULL,
    "cleanedTitle" TEXT NOT NULL,
    "embeddingText" TEXT NOT NULL,
    "embedding" JSONB,
    "groupId" TEXT,
    "status" "CandidateStatus" NOT NULL DEFAULT 'QUEUED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleCandidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleGroup" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleCandidate_rawArticleId_key" ON "ArticleCandidate"("rawArticleId");

-- AddForeignKey
ALTER TABLE "ArticleCandidate" ADD CONSTRAINT "ArticleCandidate_rawArticleId_fkey" FOREIGN KEY ("rawArticleId") REFERENCES "RawArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleCandidate" ADD CONSTRAINT "ArticleCandidate_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ArticleGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
