-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PRESCRIPTION', 'LAB_REPORT', 'SCAN_XRAY', 'DISCHARGE_SUMMARY', 'OTHER');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "contextId" TEXT;

-- CreateTable
CREATE TABLE "AppointmentContext" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "appointmentId" TEXT,
    "reason" TEXT NOT NULL,
    "symptoms" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentContext_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContextDocument" (
    "id" TEXT NOT NULL,
    "contextId" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContextDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentContext_appointmentId_key" ON "AppointmentContext"("appointmentId");

-- CreateIndex
CREATE INDEX "AppointmentContext_appointmentId_id_idx" ON "AppointmentContext"("appointmentId", "id");

-- CreateIndex
CREATE INDEX "AppointmentContext_userId_idx" ON "AppointmentContext"("userId");

-- CreateIndex
CREATE INDEX "ContextDocument_contextId_idx" ON "ContextDocument"("contextId");

-- CreateIndex
CREATE INDEX "ContextDocument_uploadedById_idx" ON "ContextDocument"("uploadedById");

-- CreateIndex
CREATE INDEX "Payment_contextId_idx" ON "Payment"("contextId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_contextId_fkey" FOREIGN KEY ("contextId") REFERENCES "AppointmentContext"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentContext" ADD CONSTRAINT "AppointmentContext_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContextDocument" ADD CONSTRAINT "ContextDocument_contextId_fkey" FOREIGN KEY ("contextId") REFERENCES "AppointmentContext"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContextDocument" ADD CONSTRAINT "ContextDocument_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
