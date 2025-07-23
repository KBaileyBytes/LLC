import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();

  const { subject, message } = body;

  if (!message) {
    return new Response("Missing required fields", { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Leah",
    to: process.env.EMAIL_USER,
    subject: "LLC Help",
    text: `
      You have a new message from LeeLeesCreationz:

      ${subject && `Subject: ${subject}`}
      Message:
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response("Email sent successfully", { status: 200 });
  } catch (err) {
    console.error("Error sending email:", err.message, err);
    return new Response("Failed to send email", { status: 500 });
  }
}
