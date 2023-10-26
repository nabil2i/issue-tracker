/*
  Warnings:

  - Made the column `text` on table `comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `comment` MODIFY `text` TEXT NOT NULL;
