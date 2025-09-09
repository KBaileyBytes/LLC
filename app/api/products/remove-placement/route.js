import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { id, placement } = body;

    if (!id || !placement) {
      return new Response(
        JSON.stringify({ error: "Missing id or placement" }),
        { status: 400 }
      );
    }

    const result = await Product.updateOne(
      { _id: id },
      { $pull: { placement } }
    );

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
