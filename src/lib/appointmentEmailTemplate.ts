type EmailProps = {
  patientName: string;
  doctorName: string;
  startTime: string;
  endTime: string;
  meetLink: string;
  reason?: string;
  symptoms?: string;
  notes?: string;
  documentCount?: number;
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
  });

  const timeStr = `${start.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })} – ${end.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login`;

  const contextSection =
    reason
      ? `
      <tr>
        <td style="padding: 0 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid #efefef;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:20px 24px 16px;">
                <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#a0a0a0;">Patient Notes</p>

                <p style="margin:0 0 4px;font-size:11px;color:#a0a0a0;text-transform:uppercase;letter-spacing:0.06em;">Reason for visit</p>
                <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;line-height:1.6;">${reason}</p>

                ${symptoms ? `
                <p style="margin:0 0 4px;font-size:11px;color:#a0a0a0;text-transform:uppercase;letter-spacing:0.06em;">Symptoms</p>
                <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;line-height:1.6;">${symptoms}</p>
                ` : ""}

                ${notes ? `
                <p style="margin:0 0 4px;font-size:11px;color:#a0a0a0;text-transform:uppercase;letter-spacing:0.06em;">Additional notes</p>
                <p style="margin:0 0 16px;font-size:14px;color:#1a1a1a;line-height:1.6;">${notes}</p>
                ` : ""}

                ${documents?.length ? `
                <div style="margin-top:16px;">
                  <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">
                    📎 Uploaded Documents:
                  </p>

                  ${documents.map((doc: any) => `
                    <p style="margin:0 0 6px;">
                      <a href="${doc.fileUrl}" 
                        style="color:#2563eb;text-decoration:none;font-size:13px;">
                        ${doc.fileName || "View Document"}
                      </a>
                    </p>
                  `).join("")}
                </div>
              ` : ""}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      `
      : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Appointment Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo / Brand row -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="margin:0;font-size:13px;font-weight:600;color:#6b7280;letter-spacing:0.08em;text-transform:uppercase;">Dr. ${doctorName}</p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06),0 4px 24px rgba(0,0,0,0.04);">
              <table width="100%" cellpadding="0" cellspacing="0">

                <!-- Top accent bar -->
                <tr>
                  <td style="height:4px;background:linear-gradient(90deg,#111827 0%,#374151 100%);"></td>
                </tr>

                <!-- Header -->
                <tr>
                  <td style="padding:36px 40px 28px;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Booking Confirmed</p>
                    <h1 style="margin:0;font-size:26px;font-weight:700;color:#111827;line-height:1.2;">Your appointment<br/>is scheduled.</h1>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:0 40px;">
                    <div style="height:1px;background:#f3f4f6;"></div>
                  </td>
                </tr>

                <!-- Details block -->
                <tr>
                  <td style="padding:28px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">

                      <!-- Date -->
                      <tr>
                        <td style="padding-bottom:20px;">
                          <p style="margin:0 0 3px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Date</p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${date}</p>
                        </td>
                      </tr>

                      <!-- Time -->
                      <tr>
                        <td style="padding-bottom:20px;">
                          <p style="margin:0 0 3px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Time</p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${timeStr}</p>
                        </td>
                      </tr>

                      <!-- Patient -->
                      <tr>
                        <td>
                          <p style="margin:0 0 3px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af;">Patient</p>
                          <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${patientName}</p>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:0 40px;">
                    <div style="height:1px;background:#f3f4f6;"></div>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td style="padding:28px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <!-- Join button -->
                        <td style="padding-right:8px;">
                          <a href="${meetLink}"
                            style="display:block;text-align:center;background:#111827;color:#ffffff;padding:13px 0;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.01em;">
                            Join Consultation
                          </a>
                        </td>
                        <!-- Dashboard button -->
                        <td style="padding-left:8px;">
                          <a href="${dashboardUrl}"
                            style="display:block;text-align:center;background:#f9fafb;color:#374151;padding:13px 0;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;border:1px solid #e5e7eb;">
                            View Dashboard
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Patient context (doctor-facing only) -->
                ${contextSection}

                <!-- Note -->
                <tr>
                  <td style="padding:0 40px 32px;">
                    <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;">
                      Please join the meeting 5 minutes before your scheduled time. The link above will be active at the time of your appointment.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 0 8px;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                © ${new Date().getFullYear()} Dr. ${doctorName} &nbsp;·&nbsp; All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
}