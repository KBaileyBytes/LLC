import nodemailer from "nodemailer";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { first, last, email, message, total, cart } = body;

    if (!first || !email || !total || !cart?.length) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Construct Order object
    const orderData = {
      products: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        size: item.size,
        details: item.details,
        isCustom: item.isCustom,
        custom: {
          description: item.custom?.description || "",
        },
      })),
      subtotal: total,
      customer: {
        firstName: first,
        lastName: last || "",
        email,
      },
      status: "Pending",
    };

    const newOrder = await Order.create(orderData);

    const cartString = cart
      .map((item, index) => {
        return `
Item ${index + 1}:
  Product: ${item.name}
  Quantity: ${item.quantity}
  Price: $${(item.quantity * parseFloat(item.price)).toFixed(2)}
  ${item.size ? `Size: ${item.size}` : ""}
  ${item.details ? `Details: ${item.details}` : ""}
  ${
    item.isCustom && item.custom?.description
      ? `Custom Request:\n  ${item.custom.description}`
      : ""
  }
`;
      })
      .join("\n");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${first} ${last || ""}" <${email}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: "New Order Submission",
      text: `
You have a new order from LeeLeesCreationz:

Name: ${first} ${last || ""}
Email: ${email}
Message: ${message || "No order message provided"}
Total: $${total.toFixed(2)}

${first} ordered the following:

${cartString}
    `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Order saved successfully" }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error sending email:", err.message, err);
    return new Response("Failed to send email", { status: 500 });
  }
}
