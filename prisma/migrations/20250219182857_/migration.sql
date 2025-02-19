/*
  Warnings:

  - You are about to drop the column `name` on the `Newsletters` table. All the data in the column will be lost.
  - You are about to drop the column `opened_at` on the `Newsletters` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Newsletters` table. All the data in the column will be lost.
  - You are about to drop the column `utm_campaign` on the `Newsletters` table. All the data in the column will be lost.
  - You are about to drop the column `utm_channel` on the `Newsletters` table. All the data in the column will be lost.
  - You are about to drop the column `utm_medium` on the `Newsletters` table. All the data in the column will be lost.
  - You are about to drop the column `utm_source` on the `Newsletters` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resource_id]` on the table `Newsletters` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Newsletters" DROP CONSTRAINT "Newsletters_userId_fkey";

-- AlterTable
ALTER TABLE "Newsletters" DROP COLUMN "name",
DROP COLUMN "opened_at",
DROP COLUMN "userId",
DROP COLUMN "utm_campaign",
DROP COLUMN "utm_channel",
DROP COLUMN "utm_medium",
DROP COLUMN "utm_source",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "Open_Events" (
    "id" UUID NOT NULL,
    "newsletter_id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "opened_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "utm_channel" TEXT,

    CONSTRAINT "Open_Events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Newsletters_resource_id_key" ON "Newsletters"("resource_id");

-- AddForeignKey
ALTER TABLE "Open_Events" ADD CONSTRAINT "Open_Events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Open_Events" ADD CONSTRAINT "Open_Events_newsletter_id_fkey" FOREIGN KEY ("newsletter_id") REFERENCES "Newsletters"("resource_id") ON DELETE RESTRICT ON UPDATE CASCADE;
