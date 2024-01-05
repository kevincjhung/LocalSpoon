/*
  Warnings:

  - You are about to drop the column `productId` on the `Buyer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Buyer" DROP CONSTRAINT "Buyer_productId_fkey";

-- AlterTable
ALTER TABLE "Buyer" DROP COLUMN "productId";
