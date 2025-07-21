import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.findMany({
      where: {
        placement: {
          has: "BestSeller",
        },
      },
    }).limit(3);
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(`Error: ${e}`, { status: 500 });
  }
}
