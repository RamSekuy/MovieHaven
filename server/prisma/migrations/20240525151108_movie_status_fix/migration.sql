/*
  Warnings:

  - The values [OutOfTheather] on the enum `Movie_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `movie` MODIFY `status` ENUM('CurrentlyPlaying', 'OutOfTheater', 'CommingSoon') NOT NULL DEFAULT 'CommingSoon';
