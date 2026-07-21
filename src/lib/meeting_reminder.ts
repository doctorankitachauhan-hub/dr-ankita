import { Client } from "@upstash/qstash";
import prisma from "./prisma";

const qstash = new Client({
  token: process.env.QSTASH_TOKEN as string,
  baseUrl: process.env.QSTASH_URL as string
});

export async function scheduleReminder(appointmentId: string, startTime: Date) {
  const reminderTime = new Date(startTime.getTime() - 15 * 60_000);

  const { messageId } = await qstash.publishJSON({
    url: `https://www.drankitachauhan.com/api/webhook/send-reminder`,
    body: { appointmentId },
    notBefore: Math.floor(reminderTime.getTime() / 1000),
    deduplicationId: `reminder-${appointmentId}`,
  });

  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { reminderMessageId: messageId },
  });
}

export async function cancelReminder(messageId: string | null | undefined) {
  if (!messageId) return;
  try {
    await qstash.messages.cancel(messageId);
  } catch (err) {
    console.warn(`Failed to cancel reminder message ${messageId}`, err);
  }
}