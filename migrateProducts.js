import mongoose from "mongoose";
import Product from "./models/Product.js";

async function migrateCustomizableField() {
  await mongoose.connect(process.env.MONGODB_URI);

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
