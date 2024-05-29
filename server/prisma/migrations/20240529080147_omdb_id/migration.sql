-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_movieId_fkey`;

-- AlterTable
ALTER TABLE `ticket` MODIFY `movieId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`omdbId`) ON DELETE RESTRICT ON UPDATE CASCADE;
