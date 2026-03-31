/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "dob";

-- CreateIndex
CREATE INDEX "Appointment_status_createdAt_idx" ON "Appointment"("status", "createdAt");

-- CreateIndex
CREATE INDEX "DoctorAvailability_doctorId_isActive_idx" ON "DoctorAvailability"("doctorId", "isActive");

-- CreateIndex
CREATE INDEX "DoctorProfile_userId_idx" ON "DoctorProfile"("userId");

-- CreateIndex
CREATE INDEX "EmailOTP_email_idx" ON "EmailOTP"("email");

-- CreateIndex
CREATE INDEX "EmailOTP_expiresAt_idx" ON "EmailOTP"("expiresAt");

-- CreateIndex
CREATE INDEX "Meeting_startTime_idx" ON "Meeting"("startTime");

-- CreateIndex
CREATE INDEX "Payment_razorpayOrderId_idx" ON "Payment"("razorpayOrderId");

-- CreateIndex
CREATE INDEX "Payment_status_createdAt_idx" ON "Payment"("status", "createdAt");

-- CreateIndex
CREATE INDEX "TimeSlot_doctorId_status_idx" ON "TimeSlot"("doctorId", "status");

-- CreateIndex
CREATE INDEX "TimeSlot_startTime_idx" ON "TimeSlot"("startTime");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");
