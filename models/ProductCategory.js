import mongoose from "mongoose";

const ProductCategory = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.ProductCategory ||
  mongoose.model("ProductCategory", ProductCategory);
