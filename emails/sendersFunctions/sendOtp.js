import { transporter } from "../transporter";

export async function sendOTP(email, otp) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.ADMIN_EMAIL, // sender address
    to: email, // list of receivers
    subject: "OTP Varification", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>Your OTP is ${otp}</h1>`, // html body
  });

  return info.accepted;
}
