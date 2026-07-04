/*
  Warnings:

  - You are about to drop the column `patientTimeZone` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "patientTimeZone";

-- AlterTable
ALTER TABLE "AppointmentContext" ADD COLUMN     "patientTimeZone" TEXT;
