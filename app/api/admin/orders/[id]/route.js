import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    await connectToDatabase();

    const order = await Order.findById(id);

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Fetch error:", e);
    return new Response(`Error: ${e.message || e}`, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  try {
    await connectToDatabase();

    const updatedOrder = await Order.findByIdAndUpdate(id, body, {
      new: true, // return the updated document
      runValidators: true, // enforce schema validation
    });

    if (!updatedOrder) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedOrder), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Update error:", e);
    return new Response(`Error: ${e.message || e}`, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  await connectToDatabase();

  try {
    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return new Response("Order not found", { status: 404 });
    }

    return new Response("Successfully deleted order", { status: 200 });
  } catch (error) {
    return new Response(`Error deleting order: ${error}`, { status: 500 });
  }
}
