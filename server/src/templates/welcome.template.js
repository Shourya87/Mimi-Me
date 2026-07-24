const welcomeTemplate = (name) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Welcome to Mimi & Me</title>
    </head>

    <body style="margin:0;padding:2px;background:#f5f5f5;font-family:Arial,sans-serif;">

      <table align="center" width="600" cellpadding="0" cellspacing="0"
        style="background:#ffffff;border-radius:12px;padding:15px;">

        <tr>
          <td align="center">
            <h2 style="margin:0;color:#222;">
              Welcome to Mimi & Me 🌸
            </h2>
          </td>
        </tr>

        <tr>
          <td style="padding-top:25px;color:#555;font-size:16px;line-height:1.7;">

            <p>Hi <strong>${name}</strong>,</p>

            <p>
              Your account is now verified and ready to go.
            </p>

            <p>
              We're happy to have you with us and can't wait to be part of your shopping journey.
            </p>

            <p>
              Happy Shopping! 💛
            </p>

            <p style="margin-top:30px;">
              — Mimi & Me Team
            </p>

          </td>
        </tr>

      </table>

    </body>
  </html>
  `;
};

module.exports = welcomeTemplate;