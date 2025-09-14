import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();
    const result = await Product.find({});

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error removing placement:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
