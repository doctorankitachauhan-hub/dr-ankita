import { Gender } from "@/generated/prisma/enums";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

interface AppointmentWithRelations {
    id: string;
    status: string;
    patientId: string;
    patient: {
        name: string;
        email: string;
        age: string;
        gender: Gender;
        weight?: string;
        address: string;
    };
    appointmentContexts: unknown[];
    slot: {
        doctor: {
            id: string;
            userId: string;
            user: {
                name: string;
                email: string;
            };
        };
    };
}

const COLORS = {
    pinkBg: "#FCE4EF",
    pinkBar: "#A6216B",
    navy: "#1B2A56",
    text: "#333333",
    line: "#D9D9D9",
};

// Clinic letterhead details — hardcoded to match the sample you shared.
// If this app serves multiple doctors, pull these from the doctor's
// profile record instead of hardcoding.
const CLINIC = {
    // Path relative to your Next.js `public/` folder, e.g.
    // public/images/logo/pdf_logo.png
    logoRelativePath: path.join("images", "logo", "pdf_logo.png"),
    address:
        "206 B, Botanical Garden Rd, Kondapur, Sri Ram Nagar, Gachibowli, Hyderabad, Telangana 500084, India",
    website: "www.drankitachauhan.com",
    credentials: [
        "MBBS, M.S., FMAS",
        "Obstetrician and Gynaecologist",
        "Minimal Invasive Laparoscopic and Robotic Surgeon",
        "TSMC/FMR/03013",
    ],
};

function splitLines(input: string): string[] {
    return input
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
}

// PDFKit's doc.image() needs a real filesystem path (or Buffer) — it can't
// read Next.js public URLs like "/images/logo.png" over HTTP. `public/` files
// live on disk at `process.cwd()/public/...`, so resolve it from there.
function resolveLogoPath(): string | null {
    const absolutePath = path.join(process.cwd(), "public", CLINIC.logoRelativePath);
    return fs.existsSync(absolutePath) ? absolutePath : null;
}

export async function generatePrescriptionPDF(
    prescriptionText: string,
    diagnosisText: string,
    appointment: AppointmentWithRelations
): Promise<Buffer> {

    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ size: "A4", margin: 0 });
            const chunks: Buffer[] = [];

            doc.on("data", (chunk) => chunks.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(chunks)));
            doc.on("error", reject);

            const pageWidth = doc.page.width;
            const pageHeight = doc.page.height;
            const margin = 40;
            const contentWidth = pageWidth - margin * 2;

            // ---------- Header ----------
            const headerHeight = 110;
            doc.rect(0, 0, pageWidth, headerHeight).fill(COLORS.pinkBg);

            doc
                .fillColor(COLORS.text)
                .font("Helvetica")
                .fontSize(9)
                .text(CLINIC.address, margin, 28, { width: contentWidth * 0.55 });

            doc
                .fillColor(COLORS.pinkBar)
                .font("Helvetica-Bold")
                .fontSize(10)
                .text(CLINIC.website, margin, 60);

            const logoPath = resolveLogoPath();
            const logoWidth = 140;
            const logoX = pageWidth - margin - logoWidth;

            if (logoPath) {
                try {
                    doc.image(logoPath, logoX, 24, { width: logoWidth });
                } catch (imgErr) {
                    console.error("[prescription-pdf] Failed to draw logo image, falling back to text:", imgErr);
                    doc
                        .fillColor(COLORS.pinkBar)
                        .font("Helvetica-Bold")
                        .fontSize(22)
                        .text("WOMEN CARE", margin, 32, { width: contentWidth, align: "right" });
                }
            } else {
                console.warn(`[prescription-pdf] Logo not found at public/${CLINIC.logoRelativePath}, using text wordmark instead`);
                doc
                    .fillColor(COLORS.pinkBar)
                    .font("Helvetica-Bold")
                    .fontSize(22)
                    .text("WOMEN CARE", margin, 32, { width: contentWidth, align: "right" });
            }

            doc
                .moveTo(0, headerHeight)
                .lineTo(pageWidth, headerHeight)
                .strokeColor(COLORS.pinkBar)
                .lineWidth(2)
                .stroke();

            let y = headerHeight + 24;

            // ---------- Patient info ----------
            const patient = appointment.patient;

            doc.fillColor(COLORS.pinkBar).font("Helvetica-Bold").fontSize(11).text("| ", margin, y, { continued: true });
            doc.fillColor(COLORS.navy).text("Patient Name : ", { continued: true });
            doc.fillColor(COLORS.text).font("Helvetica").text(patient.name);

            y += 22;

            const col2X = margin + 140;
            const col3X = margin + 260;
            const col4X = margin + 380;

            doc.fillColor(COLORS.pinkBar).font("Helvetica-Bold").fontSize(10).text("| ", margin, y, { continued: true });
            doc.fillColor(COLORS.navy).text("Age : ", { continued: true });
            doc.fillColor(COLORS.text).font("Helvetica").text(patient.age ? String(patient.age) : "___");

            doc.fillColor(COLORS.pinkBar).font("Helvetica-Bold").text("| ", col2X, y, { continued: true });
            doc.fillColor(COLORS.navy).text("Gender : ", { continued: true });
            doc.fillColor(COLORS.text).font("Helvetica").text(patient.gender ? String(patient.gender) : "___");

            doc.fillColor(COLORS.pinkBar).font("Helvetica-Bold").text("| ", col3X, y, { continued: true });
            doc.fillColor(COLORS.navy).text("Weight : ", { continued: true });
            doc.fillColor(COLORS.text).font("Helvetica").text(patient.weight ? String(patient.weight) : "___");

            doc.fillColor(COLORS.pinkBar).font("Helvetica-Bold").text("| ", col4X, y, { continued: true });
            doc.fillColor(COLORS.navy).text("Address : ", { continued: true });
            doc
                .fillColor(COLORS.text)
                .font("Helvetica")
                .text(patient.address ? String(patient.address) : "________", {
                    width: pageWidth - col4X - margin,
                });

            y += 26;
            doc.moveTo(margin, y).lineTo(pageWidth - margin, y).strokeColor(COLORS.line).lineWidth(1).stroke();
            y += 24;

            // ---------- Two columns ----------
            const colGap = 24;
            const colWidth = (contentWidth - colGap) / 2;
            const leftX = margin;
            const rightX = margin + colWidth + colGap;
            const columnTop = y;

            doc.fillColor(COLORS.navy).font("Helvetica-Bold").fontSize(12).text("PRESCRIBED MEDICATIONS", leftX, columnTop, { width: colWidth });
            doc.fillColor(COLORS.navy).font("Helvetica-Bold").fontSize(12).text("DIAGNOSIS & INSTRUCTIONS", rightX, columnTop, { width: colWidth });

            const underlineY = columnTop + 18;
            doc.moveTo(leftX, underlineY).lineTo(leftX + colWidth * 0.85, underlineY).strokeColor(COLORS.navy).lineWidth(2).stroke();
            doc.moveTo(rightX, underlineY).lineTo(rightX + colWidth * 0.85, underlineY).strokeColor(COLORS.navy).lineWidth(2).stroke();

            doc.rect(pageWidth / 2 - 1.5, columnTop - 4, 3, 3).fill(COLORS.navy);
            doc.moveTo(pageWidth / 2, columnTop + 20).lineTo(pageWidth / 2, pageHeight - 140).strokeColor(COLORS.line).lineWidth(1).stroke();

            let leftY = underlineY + 20;
            let rightY = underlineY + 20;

            doc.font("Helvetica").fontSize(10.5).fillColor(COLORS.text);

            splitLines(prescriptionText).forEach((line) => {
                const isSubItem = /^dosage\s*:/i.test(line) || line.startsWith("-") || line.startsWith("•");
                const bullet = isSubItem ? "-" : "•";
                const indent = isSubItem ? 14 : 0;
                doc.text(`${bullet} ${line.replace(/^[-•]\s*/, "")}`, leftX + indent, leftY, { width: colWidth - indent });
                leftY = doc.y + 6;
            });

            splitLines(diagnosisText).forEach((line) => {
                const isSubItem = line.startsWith("-") || line.startsWith("•");
                const bullet = isSubItem ? "-" : "•";
                const indent = isSubItem ? 14 : 0;
                doc.text(`${bullet} ${line.replace(/^[-•]\s*/, "")}`, rightX + indent, rightY, { width: colWidth - indent });
                rightY = doc.y + 6;
            });

            // ---------- Footer ----------
            const footerBarHeight = 22;
            const footerTop = pageHeight - 90 - footerBarHeight;

            doc.moveTo(margin, footerTop).lineTo(pageWidth - margin, footerTop).strokeColor(COLORS.line).lineWidth(1).stroke();

            const doctorName = appointment.slot.doctor.user.name.replace(/^Dr\.?\s*/i, "");
            doc.fillColor(COLORS.navy).font("Helvetica-Bold").fontSize(14).text(`Dr. ${doctorName}`, margin, footerTop + 16);
            doc.fillColor(COLORS.text).font("Helvetica").fontSize(10).text("Obstetrician and Gynaecologist", margin, footerTop + 36);

            let credY = footerTop + 14;
            doc.fillColor(COLORS.navy).font("Helvetica").fontSize(8);
            CLINIC.credentials.forEach((line) => {
                doc.text(line, margin, credY, { width: contentWidth, align: "right" });
                credY += 11;
            });

            doc.rect(0, pageHeight - footerBarHeight, pageWidth, footerBarHeight).fill(COLORS.pinkBar);

            doc.end();
        } catch (err) {
            reject(err instanceof Error ? err : new Error(String(err)));
        }
    });
}