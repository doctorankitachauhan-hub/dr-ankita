type EmailProps = {
  patientName: string;
  doctorName: string;
  startTime: string;
  endTime: string;
  meetLink: string;
};

export function appointmentEmailTemplate({
  patientName,
  doctorName,
  startTime,
  endTime,
  meetLink,
}: EmailProps) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const date = start.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = `${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  // Google Calendar link
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Doctor%20Consultation&dates=${start
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0]}Z/${end
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0]}Z&details=Online%20consultation%20with%20Dr.%20${doctorName}&location=${encodeURIComponent(
    meetLink
  )}`;

  return `
  <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:20px;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="background:#0f172a;color:#ffffff;padding:20px;text-align:center;">
        <h2 style="margin:0;">Appointment Confirmed 🎉</h2>
        <p style="margin:5px 0 0;font-size:14px;">Dr. ${doctorName}</p>
      </div>

      <!-- Body -->
      <div style="padding:24px;">

        <p style="font-size:15px;color:#334155;">
          Hi <b>${patientName}</b>,<br/><br/>
          Your consultation has been successfully booked.
        </p>

        <!-- Card -->
        <div style="background:#f1f5f9;padding:16px;border-radius:10px;margin:20px 0;">
          <p style="margin:0;font-size:14px;color:#475569;">📅 Date</p>
          <p style="margin:4px 0 12px;font-weight:600;color:#0f172a;">${date}</p>

          <p style="margin:0;font-size:14px;color:#475569;">⏰ Time</p>
          <p style="margin:4px 0 12px;font-weight:600;color:#0f172a;">${time}</p>

          <p style="margin:0;font-size:14px;color:#475569;">👩‍⚕️ Doctor</p>
          <p style="margin:4px 0 0;font-weight:600;color:#0f172a;">Dr. ${doctorName}</p>
        </div>

        <!-- Meet Button -->
        <div style="text-align:center;margin:20px 0;">
          <a href="${meetLink}" 
            style="display:inline-block;background:#0f172a;color:#ffffff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">
            Join Consultation
          </a>
        </div>

        <!-- Calendar -->
        <div style="text-align:center;margin:10px 0;">
          <a href="${googleCalendarUrl}" 
            style="font-size:14px;color:#2563eb;text-decoration:none;">
            📅 Add to Google Calendar
          </a>
        </div>

        <p style="font-size:13px;color:#64748b;margin-top:20px;">
          Please join the meeting 5 minutes before your scheduled time.
        </p>

      </div>

      <!-- Footer -->
      <div style="background:#f8fafc;padding:16px;text-align:center;font-size:12px;color:#94a3b8;">
        © ${new Date().getFullYear()} Dr. ${doctorName}. All rights reserved.
      </div>

    </div>
  </div>
  `;
}