"use server";

import { connectToDatabase, Product, Order } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    const lastOrderDate = lastOrder?.dateSent
      ? new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }).format(new Date(lastOrder.dateSent))
      : "N/A";

    return NextResponse.json({
      products: productsCount,
      orders: ordersCount,
      pendingOrders,
      lastOrder: lastOrderDate,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stats", message: error.message },
      { status: 500 }
    );
  }
}
