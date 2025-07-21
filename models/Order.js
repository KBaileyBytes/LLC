import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String },
  isCustom: { type: Boolean, default: false },
  custom: {
    description: { type: String },
  },
});

const OrderSchema = new mongoose.Schema(
  {
    products: {
      type: [OrderItemSchema],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Delivered"],
      default: "Pending",
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    dateSent: {
      type: Date,
      default: Date.now,
    },

    customer: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, trim: true },
      email: { type: String, required: true, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
