
export function buildEmailHtml({ patientName, doctorName, prescription }: {
    patientName: string; doctorName: string; prescription: string;
}): string {

    const escape = (str: string) =>
        str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Medical Prescription</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
 
          <!-- Header -->
          <tr>
            <td style="background:#0f766e;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">
                📋 Your Medical Prescription
              </h1>
            </td>
          </tr>
 
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:#334155;font-size:15px;">
                Hi <strong>${escape(patientName)}</strong>,
              </p>
              <p style="margin:0 0 24px;color:#334155;font-size:15px;">
                Your consultation with <strong>Dr. ${escape(doctorName)}</strong> is complete.
                Please find your prescription below and attached as a PDF.
              </p>
 
              <!-- Prescription box -->
              <div style="background:#f8fafc;border-left:4px solid #0f766e;border-radius:6px;padding:16px 20px;margin-bottom:24px;">
                <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#0f766e;text-transform:uppercase;letter-spacing:0.05em;">
                  ℞ Prescription
                </p>
                <pre style="margin:0;white-space:pre-wrap;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1e293b;line-height:1.6;">${escape(prescription)}</pre>
              </div>
 
              <!-- PDF note -->
              <p style="margin:0 0 16px;color:#475569;font-size:14px;">
                📎 A PDF copy of your prescription is attached to this email for your records.
              </p>
 
              <!-- Warning -->
              <div style="background:#fef2f2;border-radius:6px;padding:12px 16px;margin-bottom:24px;">
                <p style="margin:0;color:#dc2626;font-size:13px;">
                  ⚠️ <strong>Important:</strong> Follow the prescribed instructions carefully.
                  Contact your doctor if you experience any adverse reactions.
                </p>
              </div>
 
              <p style="margin:0;color:#334155;font-size:14px;">
                Regards,<br />
                <strong>Dr. ${escape(doctorName)}</strong>
              </p>
            </td>
          </tr>
 
          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;">
                This is an automated email from the Dr. Ankita Health Platform.
                Please do not reply directly to this message.
              </p>
            </td>
          </tr>
 
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
