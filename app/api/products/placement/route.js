import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { ids, placement } = body;

    if (!ids?.length || !placement) {
      return new Response(
        JSON.stringify({ error: "Missing ids or placement" }),
        { status: 400 }
      );
    }

    const result = await Product.updateMany(
      { _id: { $in: ids } },
      { $addToSet: { placement } } // addToSet = prevents duplicates
    );

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error adding products to placement:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
