import { toZonedTime } from "date-fns-tz";

const IST = "Asia/Kolkata";

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

export function appointmentEmailTemplate({ patientName, doctorName, startTime, endTime, meetLink, reason, symptoms, notes, documents, }: EmailProps) {
  const startIST = new Date(startTime);
  const endIST = new Date(endTime);

  const date = startIST.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = `${startIST.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${endIST.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login`;

  const contextSection = reason
    ? `
    <tr>
      <td style="padding: 0 40px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0"
          style="background:#fafafa;border:1px solid #efefef;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:20px 24px 16px;">
              <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#a0a0a0;">
                Patient Notes
              </p>

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
              <p style="margin:0 0 8px;font-size:11px;color:#a0a0a0;text-transform:uppercase;letter-spacing:0.06em;">
                Attached documents (${documents.length})
              </p>
              ${documents.map((doc) => `
                <table width="100%" cellpadding="0" cellspacing="0"
                  style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:6px;">
                  <tr>
                    <td style="padding:10px 14px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p style="margin:0 0 1px;font-size:11px;color:#9ca3af;">${doc.documentType.replace(/_/g, " ")}</p>
                            <p style="margin:0;font-size:13px;font-weight:600;color:#111827;
                              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:280px;">
                              ${doc.fileName || "Document"}
                            </p>
                          </td>
                          <td style="text-align:right;white-space:nowrap;padding-left:12px;">
                            <a href="${doc.fileUrl}"
                              style="display:inline-block;font-size:12px;font-weight:600;
                                color:#ffffff;background:#111827;padding:6px 14px;
                                border-radius:6px;text-decoration:none;">
                              Download
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              `).join("")}
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

          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="margin:0;font-size:13px;font-weight:600;color:#6b7280;letter-spacing:0.08em;text-transform:uppercase;">
                Dr. ${doctorName}
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06),0 4px 24px rgba(0,0,0,0.04);">
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="height:4px;background:#111827;"></td>
                </tr>

                <tr>
                  <td style="padding:36px 40px 28px;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">
                      Booking Confirmed
                    </p>
                    <h1 style="margin:0;font-size:26px;font-weight:700;color:#111827;line-height:1.2;">
                      Your appointment<br/>is scheduled.
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 40px;">
                    <div style="height:1px;background:#f3f4f6;"></div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 40px;">
                    <div style="height:1px;background:#f3f4f6;"></div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:28px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:8px;">
                          <a href="${meetLink}"
                            style="display:block;text-align:center;background:#111827;color:#ffffff;padding:13px 0;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.01em;">
                            Join Consultation
                          </a>
                        </td>
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

                ${contextSection}

                <tr>
                  <td style="padding:0 40px 32px;">
                    <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;">
                      Please join the meeting 5 minutes before your scheduled time.
                      The link above will be active at the time of your appointment.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

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
