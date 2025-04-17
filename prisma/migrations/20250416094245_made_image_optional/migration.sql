/*
  Warnings:

  - You are about to drop the column `images` on the `Claim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "images",
ADD COLUMN     "image" TEXT;
