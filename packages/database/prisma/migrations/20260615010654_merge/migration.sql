-- CreateEnum
CREATE TYPE "ConceptStatus" AS ENUM ('RAW', 'FILTERED', 'EMBEDDED');

-- AlterEnum
ALTER TYPE "CandidateStatus" ADD VALUE 'EXTRACTED';

-- CreateTable
CREATE TABLE "ArticleConcept" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticleConcept_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticleConcept" ADD CONSTRAINT "ArticleConcept_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "ArticleCandidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
