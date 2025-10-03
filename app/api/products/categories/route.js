import { connectToDatabase } from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";

export async function GET() {
  try {
    await connectToDatabase();

    const categories = await ProductCategory.find({});

    return new Response(JSON.stringify({ success: true, categories }), {
      status: 201,
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
