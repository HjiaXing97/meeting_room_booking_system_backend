/*
  Warnings:

  - A unique constraint covering the columns `[type_name]` on the table `dictionary_type` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `dictionary_item` DROP FOREIGN KEY `dictionary_item_type_id_fkey`;

-- AlterTable
ALTER TABLE `dictionary_item` MODIFY `type_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `dictionary_type_type_name_key` ON `dictionary_type`(`type_name`);

-- AddForeignKey
ALTER TABLE `dictionary_item` ADD CONSTRAINT `dictionary_item_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `dictionary_type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
