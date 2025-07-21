import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    await connectToDatabase();

    const product = await Product.findById(id);

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(product), {
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

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true, // return the updated document
      runValidators: true, // enforce schema validation
    });

    if (!updatedProduct) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedProduct), {
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
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response("Successfully deleted product", { status: 200 });
  } catch (error) {
    return new Response(`Error deleting product: ${error}`, { status: 500 });
  }
}
