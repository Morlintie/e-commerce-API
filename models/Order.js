const mongoose = require("mongoose");

const singleCartItemSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Item name must be provided"] },
  image: {
    type: String,
    required: [true, "Item image must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Item price must be provided"],
  },
  amount: {
    type: Number,
    required: [true, "Item amount must be provided"],
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: [true, "Item product must be provided"],
  },
});

const OrderSchema = new mongoose.Schema(
  {
    tax: {
      type: Number,
      required: [true, "Order tax must be provided"],
    },
    shippingFee: {
      type: Number,
      required: [true, "Order shipping fee must be provided"],
    },
    subTotal: {
      type: Number,
      required: [true, "Order shipping fee must be provided"],
    },

    total: {
      type: Number,
      required: [true, "Order total must be provided"],
    },

    cartItems: [singleCartItemSchema],

    status: {
      type: String,
      enum: {
        values: ["pending", "failed", "paid", "delivered", "canceled"],
        message: "Valid order status must be provided",
      },
      default: "pending",
      required: [true, "Please provide a valid status"],
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User for the order must be provided"],
    },

    clientSecret: {
      type: String,
      required: [true, "Order client secret must be provided"],
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timeStamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
const SingleCartItem = mongoose.model("singleCartItem", singleCartItemSchema);

module.exports = { Order, SingleCartItem };
