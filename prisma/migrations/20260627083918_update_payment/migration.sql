/*
  Warnings:

  - You are about to drop the column `razorpayOrderId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gatewayOrderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gatewayOrderId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Payment_razorpayOrderId_idx";

-- DropIndex
DROP INDEX "Payment_razorpayOrderId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "razorpayOrderId",
ADD COLUMN     "gatewayOrderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_gatewayOrderId_key" ON "Payment"("gatewayOrderId");

-- CreateIndex
CREATE INDEX "Payment_gatewayOrderId_idx" ON "Payment"("gatewayOrderId");
