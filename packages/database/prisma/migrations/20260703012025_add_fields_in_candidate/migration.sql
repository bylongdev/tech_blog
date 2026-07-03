-- AlterTable
ALTER TABLE "ArticleCandidate" ADD COLUMN     "category" TEXT,
ADD COLUMN     "class" TEXT,
ADD COLUMN     "entities" TEXT[],
ADD COLUMN     "event" TEXT,
ADD COLUMN     "products" TEXT[],
ADD COLUMN     "subCategory" TEXT,
ADD COLUMN     "summary" TEXT;
