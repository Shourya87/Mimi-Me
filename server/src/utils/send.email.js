const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Mimi & Me",
          email: process.env.EMAIL_USER,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        textContent: text,
        htmlContent: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("BREVO EMAIL ERROR:", data);

      throw new Error(
        data?.message || "Failed to send email through Brevo.",
      );
    }

    console.log("EMAIL SENT:", data.messageId);

    return data;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw new Error("Failed to send email.");
  }
};

module.exports = { sendEmail };