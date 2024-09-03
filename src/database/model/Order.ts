import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  amount: { type: String, required: true },
  currency: { type: String, required: true },
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  paymentStatus: { type: String, default: "pending" },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
