import getOTPEmailTemplate from "../templates/templateFunc/getOTPEmailTemplate";
import { transporter } from "../transporter";

export async function sendOTP(email, otp, name) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.ADMIN_EMAIL, // sender address
    to: email, // list of receivers
    subject: "OTP Varification", // Subject line
    text: "Hello world?", // plain text body
    html: getOTPEmailTemplate(otp, name), // html body
  });

  return info.accepted;
}
