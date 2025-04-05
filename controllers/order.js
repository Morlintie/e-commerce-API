const { StatusCodes } = require("http-status-codes");
const { Order, SingleCartItem } = require("../models/Order");
const Product = require("../models/Product");
const { NotFoundError, BadRequestError } = require("../errors");
const { checkPermission } = require("../utils");

const fakePapara = async ({ amount, currency }) => {
  return { client_secret: "client_secret" };
};

const getOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders });
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new NotFoundError("Order not found");
  }
  const { userId, role } = req.user;
  checkPermission(order.user.toString(), userId, role);

  res.status(StatusCodes.OK).json({ order });
};

const getUserOrders = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide user ID");
  }
  const { userId, role } = req.user;
  checkPermission(id, userId, role);
  const orders = await Order.find({ user: id });
  if (!orders) {
    throw new NotFoundError("Orders not found");
  }
  res.status(StatusCodes.OK).json({ orders });
};

const getProductOrders = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide product ID");
  }
  const allOrders = await Order.find({});

  let orders = [];
  for (let item of allOrders) {
    item.cartItems.forEach((cartItem) => {
      if (cartItem.product.toString() === id) {
        orders = [...orders, cartItem];
      }
    });
  }

  res.status(StatusCodes.OK).json({ orders: orders });
};

const postOrder = async (req, res) => {
  let { tax, shippingFee, cartItems } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("Please provide items in you order");
  }
  req.body.user = req.user.userId;
  let subTotal = 0;
  let orderItems = [];

  for (let item of cartItems) {
    const product = await Product.findOne({ _id: item.product });
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    if (item.amount > product.inventory) {
      throw new BadRequestError("Not enough product to deliver");
    }
    const { name, image, price, _id } = product;
    const singleCartItem = {
      name: name,
      image: image.url,
      price: price,
      amount: item.amount,
      product: _id,
    };
    orderItems = [...orderItems, singleCartItem];
    subTotal += product.price * Number(item.amount);
  }
  req.body.subTotal = subTotal;
  req.body.total = Number(tax) + subTotal + Number(shippingFee);
  const result = await fakePapara({ amount: req.body.total, currency: "try" });
  req.body.clientSecret = result.client_secret;

  const order = await Order.create({
    tax: req.body.tax,
    shippingFee: req.body.shippingFee,
    cartItems: orderItems,
    subTotal: req.body.subTotal,
    total: req.body.total,
    user: req.body.user,
    clientSecret: req.body.clientSecret,
  });

  res.status(StatusCodes.CREATED).json({ order });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { paymentIntentId } = req.body;
  if (!id) {
    throw new BadRequestError("Please provide order ID");
  }
  if (!paymentIntentId) {
    throw new BadRequestError("Please provide payment intent ID");
  }
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new NotFoundError("Order not found");
  }
  const { userId, role } = req.user;
  checkPermission(order.user.toString(), userId, role);

  const newOrder = await Order.findOneAndUpdate(
    { _id: id },
    { paymentIntentId: paymentIntentId, status: "paid" },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ order: newOrder });
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide order ID");
  }
  const order = await Order.findOne({ _id: id });
  if (!order) {
    throw new NotFoundError("Order not found");
  }
  const { userId, role } = req.user;
  checkPermission(order.user.toString(), userId, role);

  await Order.findOneAndDelete({ _id: id });

  res.status(StatusCodes.OK).json({ msg: "Order successfully deleted" });
};

module.exports = {
  getOrders,
  getOrder,
  getUserOrders,
  getProductOrders,
  postOrder,
  updateOrder,
  deleteOrder,
};
