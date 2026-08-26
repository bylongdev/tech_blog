/*
  Warnings:

  - You are about to drop the column `keypoints` on the `ArticleCandidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArticleCandidate" DROP COLUMN "keypoints",
ADD COLUMN     "tldr" JSONB;
