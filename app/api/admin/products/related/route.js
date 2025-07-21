import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const excludeId = searchParams.get("exclude");

    if (!category) {
      return new Response(
        JSON.stringify({ error: "Missing category in query" }),
        { status: 400 }
      );
    }

    const relatedProducts = await Product.find({
      category: category,
      _id: { $ne: excludeId },
    }).limit(3);

    return new Response(JSON.stringify(relatedProducts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Related products error:", e);
    return new Response(`Error: ${e}`, { status: 500 });
  }
}
