/*
  Warnings:

  - You are about to drop the column `representativeGroupId` on the `ArticleCandidate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticleCandidate" DROP CONSTRAINT "ArticleCandidate_representativeGroupId_fkey";

-- AlterTable
ALTER TABLE "ArticleCandidate" DROP COLUMN "representativeGroupId";
