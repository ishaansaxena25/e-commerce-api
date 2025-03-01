import { Schema, model } from "mongoose";

const orderHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const OrderHistory = model("OrderHistory", orderHistorySchema);
export default OrderHistory;
