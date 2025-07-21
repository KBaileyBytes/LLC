import mongoose from "mongoose";
import Product from "./models/Product.js";

async function migrateCustomizableField() {
  await mongoose.connect(
    "mongodb+srv://LLCAdmin:ZQbZTE91VF17goRK@llc-cluster.3xlcgej.mongodb.net/LLC-DB?retryWrites=true&w=majority&appName=LLC-Cluster"
  );

  const products = await Product.find();

  for (const product of products) {
    const wasCustomizable = !!product.customizable;

    // Replace with new structure
    product.customizable = {
      enabled: wasCustomizable,
      options: [], // Empty array for now
    };

    // Remove the old colors field if it exists
    if ("colors" in product) {
      product.set("colors", undefined, { strict: false });
    }

    await product.save();
  }

  console.log("Migration complete.");
  await mongoose.disconnect();
}

migrateCustomizableField().catch(console.error);
