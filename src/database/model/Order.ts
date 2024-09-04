import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "pending",
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
