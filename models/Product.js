const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Image url must be provided"],
  },
  public_id: {
    type: String,
    required: [true, "Image public ID must be provided"],
  },
});

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: 500,
    },

    image: imageSchema,

    category: {
      type: String,
      enum: {
        values: ["office", "kitchen", "bedroom"],
        message: "Please provide a valid category",
      },
    },
    company: {
      type: String,
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "Please provide a supported company name",
      },
    },
    color: {
      type: [String],
      default: ["#382501"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: [true, "Please provide the inventory number of product"],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
