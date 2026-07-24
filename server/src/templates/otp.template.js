const otpTemplate = (name, otp) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Verify Your Email</title>
    </head>

    <body style="margin:0;padding:2px;background:#f5f5f5;font-family:Arial,sans-serif;">

      <table align="center" width="600" cellpadding="0" cellspacing="0"
        style="background:#ffffff;border-radius:12px;padding:15px;">

        <tr>
          <td align="center">
            <h2 style="margin:0;color:#222;">
              Welcome to Mimi & Me 🌸
            </h2>

            <p style="margin-top:8px;color:#666;font-size:16px;">
              Your OTP for Registration
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding-top:25px;color:#555;font-size:16px;line-height:1.7;">

            <p>Hi <strong>${name}</strong>,</p>

            <p>
              Thank you for joining Mimi & Me.
              Please use the OTP below to verify your email address.
            </p>

            <div
              style="
                margin:30px 0;
                text-align:center;
                font-size:36px;
                font-weight:bold;
                letter-spacing:8px;
                color:#111;
              "
            >
              ${otp}
            </div>

            <p>
              This OTP is valid for <strong>10 minutes</strong>.
            </p>

            <p>
              If you didn't create this account, you can safely ignore this email.
            </p>

            <p style="margin-top:35px;">
              — Mimi & Me Team
            </p>

          </td>
        </tr>

      </table>

    </body>
  </html>
  `;
};

module.exports = otpTemplate;