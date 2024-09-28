export default function getResetEmailTemplate(link) {
  return `<div
  style="
    font-family: Helvetica, Arial, sans-serif;
    min-width: 1000px;
    overflow: auto;
    line-height: 2;
    color: #444444;
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
    <p style="font-size: 1.1em">Hi,</p>
    <p>
      You requested to reset your password. Click the link below to set a new
      password:
    </p>
    <a
      href="${link}"
      style="
        background: #ff5501;
        margin: 0 auto;
        width: max-content;
        padding: 0 10px;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        display: block;
        white-space: nowrap;
      "
    >
      Reset Password
    </a>
    <p>
      Please note that this link will expire in <b>5 minutes</b> for your
      security. If you did not request a password reset, please ignore this
      email.
    </p>

    <div>
      <p>Or copy and paste the URL into your browser:</p>
      <a href="${link}" style="display: block; margin-top: -20px">${link}</a>
    </div>

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
