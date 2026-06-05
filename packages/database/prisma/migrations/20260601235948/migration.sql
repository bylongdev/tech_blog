-- DropForeignKey
ALTER TABLE "FetchLog" DROP CONSTRAINT "FetchLog_sourceId_fkey";

-- DropForeignKey
ALTER TABLE "RawArticle" DROP CONSTRAINT "RawArticle_sourceId_fkey";

-- AddForeignKey
ALTER TABLE "RawArticle" ADD CONSTRAINT "RawArticle_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FetchLog" ADD CONSTRAINT "FetchLog_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
