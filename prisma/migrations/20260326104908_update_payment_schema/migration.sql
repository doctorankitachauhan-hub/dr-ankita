-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_appointmentId_fkey";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "appointmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
