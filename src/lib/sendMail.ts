import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

type Props = {
    title: string;
    to: string;
    subject: string;
    html: string;
}

export async function sendMail({ title, to, subject, html }: Props) {
    try {

        if (!to) {
            console.warn("⚠️ User email missing.");
            throw new Error("⚠️ User email missing.")
        }

        const { error } = await resend.emails.send({
            from: `${title} <help@drankitachauhan.com>`,
            to: ["priyeshrai.dev@gmail.com", to],
            subject: subject,
            html: html,
        });

        if (error) {
            throw new Error(error.message)
        }

        return true
    } catch (error) {
        console.log("Error while sending emai");
        throw new Error("Can't sent the mail...!!")
    }
}