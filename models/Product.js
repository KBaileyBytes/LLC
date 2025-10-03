import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    dimensions: {
      metric: {
        type: String,
        enum: ["mm", "cm", "inch"],
        required: true,
      },
      width: {
        type: Number,
        required: true,
        min: 0,
      },
      height: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    image: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
    customizable: {
      enabled: {
        type: Boolean,
        required: true,
        default: false,
      },
      options: {
        type: [String],
        default: [],
      },
    },
    placement: {
      type: [String],
      enum: ["New", "Unique", "BestSeller", "Carousel"],
      default: ["New"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
