import { connectToDatabase } from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";
import Product from "@/models/Product";

export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params; // expects route like /api/admin/products/categories/[id]
    const { name } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Category ID is required" }),
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid category name" }),
        { status: 400 }
      );
    }

    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ success: true, category: updatedCategory }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating category:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Category ID is required" }),
        { status: 400 }
      );
    }

    // check if any product still references this category
    const productCount = await Product.countDocuments({ category: id });

    if (productCount > 0) {
      return new Response(
        JSON.stringify({
          error: `Cannot delete category. It is used by ${productCount} product(s).`,
        }),
        { status: 400 }
      );
    }

    const deletedCategory = await ProductCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ success: true, category: deletedCategory }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting category:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
