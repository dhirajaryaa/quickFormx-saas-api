import { Gmail_UserId } from "../config/env.js"
import emailTransport from "../config/email.js"
import EmailTemplate from "../../email/verificationEmailTemplate.js";

function sendEmail(from = "Gmail_UserId", to, subject, username, link, code) {
    // Configure the mail options object
    const mailOptions = {
        from: Gmail_UserId,
        to,
        subject,
        html: EmailTemplate(
            logo_url = "https://mailtrap.io/wp-content/uploads/2025/04/mailtrap-new-dark-2.svg",
            username,
            verification_lin = link,
            support_email = 'support@draj22779@gmail.com'
        )
    };

    //send the email
    emailTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Email send Error", error);
        } else {
            console.log('Email sent: ', info.response);
        }
        return { error, info };
    })
}
export default sendEmail
