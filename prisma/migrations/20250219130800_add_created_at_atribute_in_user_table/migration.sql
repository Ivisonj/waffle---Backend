-- AlterTable
ALTER TABLE "Newsletters" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
