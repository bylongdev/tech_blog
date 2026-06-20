/*
  Warnings:

  - You are about to drop the column `centroid` on the `ArticleGroup` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ArticleGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArticleGroup" DROP COLUMN "centroid",
DROP COLUMN "size";
