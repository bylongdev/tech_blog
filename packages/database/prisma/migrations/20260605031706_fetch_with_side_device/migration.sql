/*
  Warnings:

  - You are about to drop the column `itemsInserted` on the `FetchLog` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "FetchStatus" ADD VALUE 'PARTIAL';

-- AlterTable
ALTER TABLE "FetchLog" DROP COLUMN "itemsInserted",
ADD COLUMN     "itemsProcessed" INTEGER;
