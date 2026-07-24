const resetPasswordTemplate = (name, resetLink) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Reset Your Password</title>
    </head>

    <body style="margin:0;padding:2px;background:#f5f5f5;font-family:Arial,sans-serif;">

      <table
        align="center"
        width="600"
        cellpadding="0"
        cellspacing="0"
        style="background:#ffffff;border-radius:12px;padding:15px;"
      >

        <tr>
          <td align="center">
            <h2 style="margin:0;color:#222;">
              Reset Your Password 🔒
            </h2>

            <p style="margin-top:8px;color:#666;font-size:16px;">
              We received a request to reset your password.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding-top:25px;color:#555;font-size:16px;line-height:1.7;">

            <p>
              Hi <strong>${name}</strong>,
            </p>

            <p>
              Click the button below to create a new password for your Mimi & Me account.
            </p>

            <div style="text-align:center;margin:35px 0;">
              <a
                href="${resetLink}"
                style="
                  background:#222;
                  color:#fff;
                  text-decoration:none;
                  padding:14px 30px;
                  border-radius:8px;
                  display:inline-block;
                  font-weight:bold;
                "
              >
                Reset Password
              </a>
            </div>

            <p>
              This link will expire in <strong>15 minutes</strong>.
            </p>

            <p>
              If you didn't request a password reset, you can safely ignore this email.
              Your password will remain unchanged.
            </p>

            <p style="margin-top:35px;">
              Stay safe,<br>
              <strong>Mimi & Me Team</strong>
            </p>

          </td>
        </tr>

      </table>

    </body>
  </html>
  `;
};

module.exports = resetPasswordTemplate;