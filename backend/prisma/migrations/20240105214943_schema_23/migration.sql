/*
  Warnings:

  - You are about to drop the column `productId` on the `Seller` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_productId_fkey";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "productId";
