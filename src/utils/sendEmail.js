import nodemailer from 'nodemailer';
import emailTransport from "../config/email.js";
import EmailTemplate from "../../email/verificationEmailTemplate.js";
import { Logo_Url, Gmail_UserId } from '../config/env.js';

const testAccount = await nodemailer.createTestAccount();

async function sendEmail({ to, subject, username, link }) {
    if (!to) {
        console.error("Recipient email (to) is missing.");
        return;
    }

    const mailOptions = {
        from: `Quick FormX <${Gmail_UserId}>`,
        to,
        subject,
        html: EmailTemplate({
            logo_url: Logo_Url,
            username,
            verification_link: link
        })
    };

    try {
        const info = await emailTransport.sendMail(mailOptions);
        const testMailUrl = nodemailer.getTestMessageUrl(info);
        console.log("Preview URL:", testMailUrl);
    } catch (err) {
        console.error("Failed to send email:", err);
    }
}

export default sendEmail;
