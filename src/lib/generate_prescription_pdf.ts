import PDFDocument from "pdfkit";

interface AppointmentWithRelations {
    id: string;
    status: string;
    patientId: string;
    patient: {
        name: string;
        email: string;
    };
    appointmentContexts: unknown[];
    slot: {
        doctor: {
            userId: string;
            user: {
                name: string;
                email: string;
            };
        };
    };
}

export function generatePrescriptionPDF(prescription: string, appointment: AppointmentWithRelations): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                size: "A4",
                margins: { top: 72, bottom: 72, left: 72, right: 72 },
                info: {
                    Title: "Medical Prescription",
                    Author: appointment.slot.doctor.user.name,
                    Subject: `Prescription for ${appointment.patient.name}`,
                    Creator: "Dr. Ankita Health Platform",
                },
            });

            const chunks: Buffer[] = [];
            doc.on("data", (chunk: Buffer) => chunks.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(chunks)));
            doc.on("error", reject);

            const BRAND_COLOR = "#0f766e";
            const MUTED_COLOR = "#64748b";
            const PAGE_WIDTH = doc.page.width - 144; // accounting for L+R margins (72 each)

            // ── Header bar ────────────────────────────────
            doc.rect(72, 72, PAGE_WIDTH, 50)
                .fill(BRAND_COLOR);

            doc.font("Helvetica-Bold")
                .fontSize(20)
                .fillColor("#ffffff")
                .text("Medical Prescription", 72, 85, {
                    width: PAGE_WIDTH,
                    align: "center",
                });

            doc.moveDown(3);

            // ── Doctor block ──────────────────────────────
            const doctor = appointment.slot.doctor.user;

            doc.font("Helvetica-Bold")
                .fontSize(12)
                .fillColor(BRAND_COLOR)
                .text("Prescribing Doctor");

            doc.font("Helvetica-Bold")
                .fontSize(11)
                .fillColor("#1e293b")
                .text(`Dr. ${doctor.name}`);

            doc.font("Helvetica")
                .fontSize(10)
                .fillColor(MUTED_COLOR)
                .text(doctor.email);

            doc.moveDown(1.2);

            // ── Divider ───────────────────────────────────
            doc.moveTo(72, doc.y)
                .lineTo(72 + PAGE_WIDTH, doc.y)
                .strokeColor("#e2e8f0")
                .lineWidth(1)
                .stroke();

            doc.moveDown(1.2);

            // ── Patient block ─────────────────────────────
            doc.font("Helvetica-Bold")
                .fontSize(12)
                .fillColor(BRAND_COLOR)
                .text("Patient");

            doc.font("Helvetica-Bold")
                .fontSize(11)
                .fillColor("#1e293b")
                .text(appointment.patient.name);

            doc.font("Helvetica")
                .fontSize(10)
                .fillColor(MUTED_COLOR)
                .text(appointment.patient.email);

            doc.moveDown(1.2);

            // ── Date ──────────────────────────────────────
            doc.font("Helvetica")
                .fontSize(10)
                .fillColor(MUTED_COLOR)
                .text(
                    `Date Issued: ${new Date().toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })}`
                );

            doc.moveDown(1.5);

            // ── Divider ───────────────────────────────────
            doc.moveTo(72, doc.y)
                .lineTo(72 + PAGE_WIDTH, doc.y)
                .strokeColor("#e2e8f0")
                .lineWidth(1)
                .stroke();

            doc.moveDown(1.5);

            // ── Prescription heading ──────────────────────
            doc.font("Helvetica-Bold")
                .fontSize(14)
                .fillColor(BRAND_COLOR)
                .text("℞  Prescription");

            doc.moveDown(0.8);

            // ── Prescription body box ─────────────────────
            const boxY = doc.y;
            const boxPadding = 14;
            const boxTextWidth = PAGE_WIDTH - boxPadding * 2;

            // Set font/size before measuring — heightOfString uses the doc's
            // current font state; font/fontSize are not valid TextOptions props.
            doc.font("Helvetica").fontSize(11);
            const textHeight = doc.heightOfString(prescription, {
                width: boxTextWidth,
                lineGap: 4,
            });

            const boxHeight = textHeight + boxPadding * 2;

            doc.rect(72, boxY, PAGE_WIDTH, boxHeight)
                .fill("#f8fafc");

            doc.rect(72, boxY, 4, boxHeight)
                .fill(BRAND_COLOR);

            doc.font("Helvetica")
                .fontSize(11)
                .fillColor("#1e293b")
                .text(prescription, 72 + boxPadding + 4, boxY + boxPadding, {
                    width: boxTextWidth,
                    lineGap: 4,
                });

            doc.moveDown(3);

            // ── Doctor signature area ─────────────────────
            doc.moveTo(72, doc.y)
                .lineTo(220, doc.y)
                .strokeColor("#94a3b8")
                .lineWidth(0.5)
                .stroke();

            doc.font("Helvetica")
                .fontSize(9)
                .fillColor(MUTED_COLOR)
                .text(`Dr. ${doctor.name}`, 72, doc.y + 4)
                .text("Authorised Signature", 72);

            doc.moveDown(2);

            // ── Footer ────────────────────────────────────
            doc.font("Helvetica")
                .fontSize(8)
                .fillColor(MUTED_COLOR)
                .text(
                    "This is a digitally generated prescription issued via the Dr. Ankita Health Platform. " +
                    "Please follow the prescribed instructions carefully and consult your doctor if you have any concerns.",
                    72,
                    doc.y,
                    { width: PAGE_WIDTH, align: "center" }
                );

            doc.end();
        } catch (err) {
            reject(err);
        }
    });
}