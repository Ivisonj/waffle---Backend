/*
  Warnings:

  - Added the required column `user_level_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "best_streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "current_streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "user_level_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Levels" (
    "id" UUID NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "threshold" INTEGER NOT NULL DEFAULT 7,

    CONSTRAINT "Levels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_level_id_fkey" FOREIGN KEY ("user_level_id") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
