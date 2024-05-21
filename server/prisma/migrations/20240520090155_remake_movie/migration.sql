/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moviecategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actors` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plot` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `released` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `moviecategory` DROP FOREIGN KEY `MovieCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `moviecategory` DROP FOREIGN KEY `MovieCategory_movieId_fkey`;

-- AlterTable
ALTER TABLE `movie` ADD COLUMN `actors` VARCHAR(191) NOT NULL,
    ADD COLUMN `age` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `director` VARCHAR(191) NOT NULL,
    ADD COLUMN `genre` VARCHAR(191) NOT NULL,
    ADD COLUMN `language` VARCHAR(191) NOT NULL,
    ADD COLUMN `plot` VARCHAR(191) NOT NULL,
    ADD COLUMN `poster` VARCHAR(191) NOT NULL,
    ADD COLUMN `released` DATETIME(3) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `year` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `moviecategory`;
