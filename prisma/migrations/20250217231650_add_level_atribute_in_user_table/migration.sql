/*
  Warnings:

  - You are about to drop the column `user_level_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Levels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_user_level_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_level_id",
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "Levels";
