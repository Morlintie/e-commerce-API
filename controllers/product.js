//get all products, get single product, post product ( admin only), update product (admin only ), delete product (admin only)
const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Product = require("../models/Product");
const fs = require("fs/promises");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  res.status(StatusCodes.OK).json({ product });
};

const postProduct = async (req, res) => {
  if (!req.files.image) {
    throw new BadRequestError("Please provide product image");
  }
  const { userId } = req.user;
  req.body.user = userId;

  const initialProduct = await Product.create(req.body);

  const tempFilePath = req.files.image.tempFilePath;
  const cloudinaryResponse = await cloudinary.uploader.upload(tempFilePath, {
    file_name: true,
    folder: "File upload",
  });

  await fs.unlink(tempFilePath);

  const product = await Product.findOneAndUpdate(
    { _id: initialProduct._id },
    {
      image: {
        url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      },
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide product ID");
  }

  let product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new NotFoundError("Product not found");
  }

  if (req.files.image) {
    await cloudinary.uploader.destroy(product.image.public_id, {
      invalidate: true,
    });

    const uploadedImage = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        file_name: true,
        folder: "File upload",
      }
    );

    await fs.unlink(req.files.image.tempFilePath);

    product = await Product.findOneAndUpdate(
      { _id: id },
      {
        image: {
          url: uploadedImage.secure_url,
          public_id: uploadedImage.public_id,
        },
      },
      { new: true, runValidators: true }
    );
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide product ID");
  }
  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  await cloudinary.uploader.destroy(product.image.public_id, {
    invalidate: true,
  });

  await Product.findOneAndDelete({ _id: product._id });

  res.status(StatusCodes.OK).json({ msg: "Product successfully deleted" });
};

module.exports = {
  getAllProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
};
