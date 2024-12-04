import getResetEmailTemplate from "../templates/templateFunc/getResetEmailTemplate";
import { transporter } from "../transporter";

export async function sendPasswordResetLink(email, link) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.ADMIN_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Reset Password", // Subject line
    text: "Reset your password.", // plain text body
    html: getResetEmailTemplate(link), // html body
  });

  return info.accepted;
}
