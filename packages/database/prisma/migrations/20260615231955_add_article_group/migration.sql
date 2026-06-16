/*
  Warnings:

  - You are about to drop the `ArticleConcept` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticleConcept" DROP CONSTRAINT "ArticleConcept_articleId_fkey";

-- AlterTable
ALTER TABLE "ArticleCandidate" ADD COLUMN     "representativeGroupId" TEXT;

-- AlterTable
ALTER TABLE "ArticleGroup" ADD COLUMN     "centroid" JSONB,
ADD COLUMN     "size" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "ArticleConcept";

-- CreateIndex
CREATE INDEX "ArticleCandidate_groupId_idx" ON "ArticleCandidate"("groupId");

-- AddForeignKey
ALTER TABLE "ArticleCandidate" ADD CONSTRAINT "ArticleCandidate_representativeGroupId_fkey" FOREIGN KEY ("representativeGroupId") REFERENCES "ArticleGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
