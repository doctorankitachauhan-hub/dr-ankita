/*
  Warnings:

  - You are about to drop the column `isBooked` on the `TimeSlot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[doctorId,startTime,endTime]` on the table `TimeSlot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `TimeSlot` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SlotStatus" AS ENUM ('AVAILABLE', 'BOOKED', 'BLOCKED', 'CANCELLED');

-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "isBooked",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "SlotStatus" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "TimeSlot_doctorId_startTime_idx" ON "TimeSlot"("doctorId", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_doctorId_startTime_endTime_key" ON "TimeSlot"("doctorId", "startTime", "endTime");
