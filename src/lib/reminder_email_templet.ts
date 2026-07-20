type ReminderEmailProps = {
    patientName: string;
    doctorName: string;
    startTime: string | Date;
    endTime: string | Date;
    meetLink: string;
    timeZone?: string;
    recipientRole: "patient" | "doctor";
    reason?: string;
    symptoms?: string;
    notes?: string;
    documents?: {
        fileName?: string;
        fileUrl: string;
        documentType: string;
    }[];
};

function escapeHtml(str: string) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function getZoneAbbreviation(date: Date, timeZone: string): string {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" }).formatToParts(date);
    return parts.find((p) => p.type === "timeZoneName")?.value ?? timeZone;
}

export function reminderEmailTemplate({
    patientName,
    doctorName,
    startTime,
    endTime,
    meetLink,
    timeZone = "Asia/Kolkata",
    recipientRole,
    reason,
    symptoms,
    notes,
    documents,
}: ReminderEmailProps) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const zoneAbbr = getZoneAbbreviation(start, timeZone);

    const time = `${start.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
    })} – ${end.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
    })} ${zoneAbbr}`;

    const greetingName = recipientRole === "doctor" ? `Dr. ${escapeHtml(doctorName)}` : escapeHtml(patientName);

    const otherPartyLine =
        recipientRole === "doctor"
            ? `<p style="margin:0;font-size:14px;color:#374151;">Patient: <strong>${escapeHtml(patientName)}</strong></p>`
            : `<p style="margin:0;font-size:14px;color:#374151;">Doctor: <strong>Dr. ${escapeHtml(doctorName)}</strong></p>`;

    // Only the doctor's reminder needs patient context to prep for the call
    const contextSection =
        recipientRole === "doctor" && (reason || symptoms || notes || documents?.length)
            ? `
    <tr>
      <td style="padding:24px 32px;">
        <div style="background:#fafafa;border-radius:12px;padding:16px;">
          <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:#6b7280;">
            Patient Details
          </p>
          ${reason ? `<p style="margin:0 0 8px;font-size:13px;color:#374151;"><strong>Reason:</strong> ${escapeHtml(reason)}</p>` : ""}
          ${symptoms ? `<p style="margin:0 0 8px;font-size:13px;color:#374151;"><strong>Symptoms:</strong> ${escapeHtml(symptoms)}</p>` : ""}
          ${notes ? `<p style="margin:0 0 12px;font-size:13px;color:#374151;"><strong>Notes:</strong> ${escapeHtml(notes)}</p>` : ""}
          ${documents?.length
                ? `
            <div style="margin-top:12px;">
              <p style="margin:0 0 8px;font-size:12px;color:#6b7280;">Documents (${documents.length})</p>
              ${documents
                    .map(
                        (doc) => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:8px;background:#ffffff;border:1px solid #e5e7eb;margin-bottom:6px;">
                  <div style="max-width:70%;">
                    <p style="margin:0;font-size:12px;color:#9ca3af;">${escapeHtml(doc.documentType.replace(/_/g, " "))}</p>
                    <p style="margin:0;font-size:13px;font-weight:500;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(doc.fileName || "Document")}</p>
                  </div>
                  <a href="${doc.fileUrl}" style="font-size:12px;font-weight:600;color:#111827;text-decoration:none;border:1px solid #e5e7eb;padding:6px 10px;border-radius:6px;">View</a>
                </div>
              `
                    )
                    .join("")}
            </div>
          `
                : ""
            }
        </div>
      </td>
    </tr>
  `
            : "";

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f5f5f5;font-family:Inter,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
<tr>
<td align="center">
<table width="100%" style="max-width:520px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.05);">

<!-- Urgency banner -->
<tr>
<td style="background:#fef3c7;padding:12px 32px;text-align:center;">
  <p style="margin:0;font-size:13px;font-weight:700;color:#92400e;letter-spacing:0.02em;">
    ⏰ Starting in 15 minutes
  </p>
</td>
</tr>

<!-- Header -->
<tr>
<td style="padding:28px 32px 16px;">
  <p style="margin:0;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;">
    Appointment Reminder
  </p>
  <h2 style="margin:6px 0 0;font-size:22px;color:#111827;">
    Hi ${greetingName},
  </h2>
</td>
</tr>

<tr><td style="height:1px;background:#f1f5f9;"></td></tr>

<!-- Time card -->
<tr>
<td style="padding:24px 32px;">
  <div style="background:#f9fafb;border-radius:12px;padding:20px;text-align:center;">
    <p style="margin:0;font-size:20px;font-weight:600;color:#111827;">${time}</p>
  </div>
</td>
</tr>

<!-- Other party -->
<tr>
<td style="padding:0 32px 16px;">
  ${otherPartyLine}
</td>
</tr>

<!-- Join button -->
<tr>
<td style="padding:16px 32px 24px;">
  <a href="${meetLink}" style="display:block;text-align:center;background:#111827;color:#fff;padding:14px;border-radius:8px;text-decoration:none;font-size:15px;font-weight:600;">
    Join Call Now
  </a>
</td>
</tr>

${contextSection}

<!-- Footer -->
<tr>
<td style="padding:0 32px 28px;">
  <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
    Please be ready a few minutes early.
  </p>
</td>
</tr>

</table>
<p style="text-align:center;margin-top:20px;font-size:12px;color:#9ca3af;">
  © ${new Date().getFullYear()} Dr. ${escapeHtml(doctorName)}
</p>
</td>
</tr>
</table>
</body>
</html>
`.trim();
}