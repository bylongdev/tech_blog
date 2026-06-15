/*
  Warnings:

  - You are about to alter the column `embedding` on the `ArticleCandidate` table. The data in that column could be lost. The data in that column will be cast from `JsonB` to `Unsupported("vector(768)")`.

*/
CREATE EXTENSION IF NOT EXISTS vector;

-- CreateEnum
CREATE TYPE "ConceptStatus" AS ENUM ('RAW', 'FILTERED', 'EMBEDDED');

-- AlterEnum
ALTER TYPE "CandidateStatus" ADD VALUE 'EXTRACTED';

-- AlterTable
ALTER TABLE "ArticleCandidate"
ADD COLUMN "representativeGroupId" TEXT;

ALTER TABLE "ArticleCandidate"
DROP COLUMN "embedding";

ALTER TABLE "ArticleCandidate"
ADD COLUMN "embedding" vector(768);

-- AlterTable
ALTER TABLE "ArticleGroup"
ADD COLUMN "centroid" vector(768),
ADD COLUMN "size" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "ArticleCandidate_groupId_idx"
ON "ArticleCandidate"("groupId");

CREATE INDEX "ArticleCandidate_representativeGroupId_idx"
ON "ArticleCandidate"("representativeGroupId");

-- AddForeignKey
ALTER TABLE "ArticleCandidate"
ADD CONSTRAINT "ArticleCandidate_representativeGroupId_fkey"
FOREIGN KEY ("representativeGroupId")
REFERENCES "ArticleGroup"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;