type EmailProps = {
  patientName: string;
  doctorName: string;
  startTime: string | Date;
  endTime: string | Date;
  meetLink: string;
  reason?: string;
  symptoms?: string;
  notes?: string;
  documents?: {
    fileName?: string;
    fileUrl: string;
    documentType: string;
  }[];
};

export function appointmentEmailTemplate({
  patientName,
  doctorName,
  startTime,
  endTime,
  meetLink,
  reason,
  symptoms,
  notes,
  documents,
}: EmailProps) {

  const start = new Date(startTime);
  const end = new Date(endTime);

  const date = start.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  const time = `${start.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  })} – ${end.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  })}`;

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login`;

  const contextSection = (reason || documents?.length)
    ? `
    <tr>
      <td style="padding:24px 32px;">
        <div style="background:#fafafa;border-radius:12px;padding:16px;">

          <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:#6b7280;">
            Patient Details
          </p>

          ${reason ? `
            <p style="margin:0 0 8px;font-size:13px;color:#374151;">
              <strong>Reason:</strong> ${reason}
            </p>
          ` : ""}

          ${symptoms ? `
            <p style="margin:0 0 8px;font-size:13px;color:#374151;">
              <strong>Symptoms:</strong> ${symptoms}
            </p>
          ` : ""}

          ${notes ? `
            <p style="margin:0 0 12px;font-size:13px;color:#374151;">
              <strong>Notes:</strong> ${notes}
            </p>
          ` : ""}

          ${documents?.length
      ? `
              <div style="margin-top:12px;">
                <p style="margin:0 0 8px;font-size:12px;color:#6b7280;">
                  Documents (${documents.length})
                </p>

                ${documents
        .map(
          (doc) => `
                    <div style="
                      display:flex;
                      justify-content:space-between;
                      align-items:center;
                      padding:10px 12px;
                      border-radius:8px;
                      background:#ffffff;
                      border:1px solid #e5e7eb;
                      margin-bottom:6px;
                    ">
                      <div style="max-width:70%;">
                        <p style="margin:0;font-size:12px;color:#9ca3af;">
                          ${doc.documentType.replace(/_/g, " ")}
                        </p>
                        <p style="
                          margin:0;
                          font-size:13px;
                          font-weight:500;
                          color:#111827;
                          white-space:nowrap;
                          overflow:hidden;
                          text-overflow:ellipsis;
                        ">
                          ${doc.fileName || "Document"}
                        </p>
                      </div>

                      <a href="${doc.fileUrl}" style="
                        font-size:12px;
                        font-weight:600;
                        color:#111827;
                        text-decoration:none;
                        border:1px solid #e5e7eb;
                        padding:6px 10px;
                        border-radius:6px;
                      ">
                        View
                      </a>
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

<!-- Header -->
<tr>
<td style="padding:28px 32px 16px;">
  <p style="margin:0;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;">
    Appointment Confirmed
  </p>
  <h2 style="margin:6px 0 0;font-size:22px;color:#111827;">
    Dr. ${doctorName}
  </h2>
</td>
</tr>

<!-- Divider -->
<tr>
<td style="height:1px;background:#f1f5f9;"></td>
</tr>

<!-- Date & Time Card -->
<tr>
<td style="padding:24px 32px;">
  <div style="background:#f9fafb;border-radius:12px;padding:20px;text-align:center;">
    <p style="margin:0;font-size:14px;color:#6b7280;">${date}</p>
    <p style="margin:8px 0 0;font-size:20px;font-weight:600;color:#111827;">
      ${time}
    </p>
  </div>
</td>
</tr>

<!-- Patient -->
<tr>
<td style="padding:0 32px 16px;">
  <p style="margin:0;font-size:14px;color:#374151;">
    Patient: <strong>${patientName}</strong>
  </p>
</td>
</tr>

<!-- Buttons -->
<tr>
<td style="padding:16px 32px 24px;">
  <table width="100%">
    <tr>
      <td style="padding-right:6px;">
        <a href="${meetLink}" style="display:block;text-align:center;background:#111827;color:#fff;padding:12px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
          Join Call
        </a>
      </td>
      <td style="padding-left:6px;">
        <a href="${dashboardUrl}" style="display:block;text-align:center;background:#fff;color:#111827;padding:12px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;border:1px solid #e5e7eb;">
          Dashboard
        </a>
      </td>
    </tr>
  </table>
</td>
</tr>

${contextSection}

<!-- Footer -->
<tr>
<td style="padding:0 32px 28px;">
  <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
    Join 5 minutes before your scheduled time.
  </p>
</td>
</tr>

</table>

<!-- Footer text -->
<p style="text-align:center;margin-top:20px;font-size:12px;color:#9ca3af;">
  © ${new Date().getFullYear()} Dr. ${doctorName}
</p>

</td>
</tr>
</table>

</body>
</html>
`;
}