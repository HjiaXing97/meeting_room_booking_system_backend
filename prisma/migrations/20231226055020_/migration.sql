/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `dictionary_type` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `dictionary_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dictionary_type` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `dictionary_type_code_key` ON `dictionary_type`(`code`);
