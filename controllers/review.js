const Review = require("../models/Review");
const { StatusCodes } = require("http-status-codes");
const { checkPermission } = require("../utils");
const { BadRequestError, NotFoundError } = require("../errors");

const getReviews = async (req, res) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews });
};

const getOneUserReviews = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide user ID");
  }
  const { userId, role } = req.user;
  checkPermission(id, userId, role);
  const userReviews = await Review.find({ user: id });
  if (!userReviews) {
    throw new NotFoundError("User reviews not found");
  }

  res.status(StatusCodes.OK).json({ reviews: userReviews });
};

const getOneProductReviews = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide product ID");
  }
  const productReviews = await Review.find({ product: id });

  if (!productReviews) {
    throw new NotFoundError("Product reviews not found");
  }

  res.status(StatusCodes.OK).json({ reviews: productReviews });
};

const getReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ _id: id });
  if (!review) {
    throw new NotFoundError("Review not found");
  }

  res.status(StatusCodes.OK).json({ review });
};

const postReview = async (req, res) => {
  const { product } = req.body;
  req.body.user = req.user.userId;

  const existingReview = await Review.findOne({
    user: req.user.userId,
    product: product,
  });
  if (existingReview) {
    throw new BadRequestError("Per product only one review permitted");
  }

  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const updateReview = async (req, res) => {
  const { rating, comment, title } = req.body;
  const updateObj = { rating, comment, title };
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide review ID");
  }

  const { userId, role } = req.user;
  const initialReview = await Review.findOne({ _id: id });
  console.log(initialReview.user);
  console.log(userId);
  checkPermission(initialReview.user.toString(), userId, role);

  const newReview = await Review.findOneAndUpdate({ _id: id }, updateObj, {
    new: true,
    runValidators: true,
  });
  if (!newReview) {
    throw new NotFoundError("Review not found");
  }

  res.status(StatusCodes.OK).json({ review: newReview });
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide review ID");
  }
  const { userId, role } = req.user;
  const initialReview = await Review.findOne({ _id: id });
  if (!initialReview) {
    throw new NotFoundError("Review not found");
  }
  checkPermission(initialReview.user.toString(), userId, role);
  await Review.findOneAndDelete({ _id: id });

  res.status(StatusCodes.OK).json({ msg: "Review successfully deleted" });
};

module.exports = {
  getReviews,
  getOneUserReviews,
  getOneProductReviews,
  getReview,
  postReview,
  updateReview,
  deleteReview,
};
