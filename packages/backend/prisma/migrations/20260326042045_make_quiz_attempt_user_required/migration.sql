/*
  Warnings:

  - Made the column `user_id` on table `quiz_attempts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "quiz_attempts" ALTER COLUMN "user_id" SET NOT NULL;
