/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Source` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Source` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FetchLog" DROP CONSTRAINT "FetchLog_sourceId_fkey";

-- DropForeignKey
ALTER TABLE "RawArticle" DROP CONSTRAINT "RawArticle_sourceId_fkey";

-- AlterTable
ALTER TABLE "Source" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Source_slug_key" ON "Source"("slug");

-- AddForeignKey
ALTER TABLE "RawArticle" ADD CONSTRAINT "RawArticle_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FetchLog" ADD CONSTRAINT "FetchLog_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
