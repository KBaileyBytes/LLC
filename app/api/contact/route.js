import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();

  const { first, last, email, message } = body;

  if (!first || !message) {
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
    from: `"LeeLeesCreationz Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: "New Message From LeeLeesCreationz",
    ...(email && { replyTo: email }),
    text: `
You have a new message from LeeLeesCreationz:

Name: ${first} ${last || ""}
Email: ${email || "Not provided"}
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
