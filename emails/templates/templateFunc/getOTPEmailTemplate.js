export default function getOTPEmailTemplate(otp, name) {
  return `<div
  style="
    font-family: Helvetica, Arial, sans-serif;
    min-width: 1000px;
    overflow: auto;
    line-height: 2;
    color: #333333;
  "
>
  <div style="margin: 50px auto; width: 70%; padding: 20px 0">
    <div style="border-bottom: 1px solid #eee">
      <a
        href=""
        style="
          font-size: 1.4em;
          color: #ff5501;
          text-decoration: none;
          font-weight: 600;
        "
        >PageTurner</a
      >
    </div>
    <p style="font-size: 1.1em">
      Hi, <span style="font-weight: bold">${name}</span>
    </p>
    <p>
      Thank you for choosing <b>PageTurner</b>. Use the following OTP to
      complete your Sign Up procedures. If you try more then <b>5 times</b> then
      your OTP will be disabled.
    </p>
    <h2
      style="
        background: #ff5501;
        margin: 0 auto;
        width: max-content;
        padding: 0 10px;
        color: #fff;
        border-radius: 4px;
      "
    >
      ${otp}
    </h2>
    <p style="font-size: 0.9em">
      Regards,<br /><span style="color: #ff5501">PageTurner</span>
    </p>
    <hr style="border: none; border-top: 1px solid #eee" />
    <div
      style="
        float: right;
        padding: 8px 0;
        color: #aaa;
        font-size: 0.8em;
        line-height: 1;
        font-weight: 300;
      "
    >
      <p>PageTurner</p>
      <p>Bangladesh</p>
    </div>
  </div>
</div>

`;
}
