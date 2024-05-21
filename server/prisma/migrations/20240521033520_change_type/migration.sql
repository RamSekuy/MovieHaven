/*
  Warnings:

  - Added the required column `length` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie` ADD COLUMN `length` VARCHAR(191) NOT NULL,
    MODIFY `omdbId` VARCHAR(191) NOT NULL;
