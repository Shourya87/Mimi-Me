const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    console.log("EMAIL USER:", process.env.EMAIL_USER);
    console.log(
      "EMAIL PASS EXISTS:",
      Boolean(process.env.EMAIL_PASS),
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT:", info.messageId);

    return info;
  } catch (error) {
    console.error("REAL EMAIL ERROR:", error);
    throw error;
  }
};

module.exports = { sendEmail };