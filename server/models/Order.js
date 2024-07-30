import { Schema, model } from "mongoose";


const ProductSchema = new Schema({
  productId: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
  },
}, { _id: false });

const OrderSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    referenceId: { type: String},
    orderId: { type: String},
    products: [ProductSchema],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },  
  { timestamps: true }
);

export default model("Order", OrderSchema);