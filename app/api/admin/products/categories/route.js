import { connectToDatabase } from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { category } = await req.json();

    if (!category || typeof category !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid category string" }),
        { status: 400 }
      );
    }

    const newCategory = await ProductCategory.findOneAndUpdate(
      { name: category },
      { name: category },
      { upsert: true, new: true } // create if doesn't exist
    );

    return new Response(
      JSON.stringify({ success: true, category: newCategory }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating category:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
