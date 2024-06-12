/*
  Warnings:

  - A unique constraint covering the columns `[invoiceNum]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_referalCode_key` ON `user`;

-- CreateIndex
CREATE UNIQUE INDEX `Transaction_invoiceNum_key` ON `Transaction`(`invoiceNum`);
