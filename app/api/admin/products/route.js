import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Event from "@/models/Event";

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const product = new Product(body);
    await product.save();

    await Event.create({
      title: `New Product - ${product.name}`,
      date: new Date(),
      category: "New Release",
      description: product.details,
      image: product.image,
    });

    return new Response(
      JSON.stringify({ message: "Successfully created product", product }),
      {
        status: 201,
      }
    );
  } catch (e) {
    return new Response(`Error: ${e}`, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ date: 1 }); // sort by date ascending
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(`Error: ${e}`, { status: 500 });
  }
}
