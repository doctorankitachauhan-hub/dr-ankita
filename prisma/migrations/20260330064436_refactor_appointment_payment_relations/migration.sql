-- DropIndex
DROP INDEX "Payment_appointmentId_key";

-- CreateIndex
CREATE INDEX "Appointment_slotId_status_idx" ON "Appointment"("slotId", "status");

-- CreateIndex
CREATE INDEX "Appointment_patientId_status_idx" ON "Appointment"("patientId", "status");

-- CreateIndex
CREATE INDEX "Payment_userId_status_idx" ON "Payment"("userId", "status");

-- CreateIndex
CREATE INDEX "Payment_slotId_status_idx" ON "Payment"("slotId", "status");
