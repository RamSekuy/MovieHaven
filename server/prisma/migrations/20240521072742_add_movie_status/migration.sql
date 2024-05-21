-- AlterTable
ALTER TABLE `movie` ADD COLUMN `status` ENUM('CurrentlyPlaying', 'OutOfTheather', 'CommingSoon') NOT NULL DEFAULT 'CommingSoon',
    MODIFY `plot` VARCHAR(191) NOT NULL;
