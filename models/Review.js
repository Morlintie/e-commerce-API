const mongoose = require("mongoose");
const Product = require("./Product");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Cannot comment without a rating"],
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      required: [true, "Cannot comment without a title"],
    },

    comment: {
      type: String,
      maxlength: 500,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Comment must be leaved by a user"],
    },

    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "Comment must be leave for a product"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ReviewSchema.index({ user: 1 }, { product: 1 }, { unique: true });
ReviewSchema.statics.getRatings = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },

    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  await this.model("Product").findOneAndUpdate(
    { _id: productId },
    {
      averageRating: Math.ceil(result[0]?.averageRating),
      numOfReviews: result[0]?.numOfReviews,
    },
    { new: true, runValidators: true }
  );
};

ReviewSchema.post("save", async function (next) {
  await this.constructor.getRatings(this.product);
});

ReviewSchema.post("findOneAndUpdate", async function (doc, next) {
  await doc.constructor.getRatings(doc.product);
});

ReviewSchema.post("findOneAndDelete", async function (doc) {
  await doc.constructor.getRatings(doc.product);
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
