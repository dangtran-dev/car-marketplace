/*
  Warnings:

  - You are about to drop the column `updateAt` on the `cars` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
