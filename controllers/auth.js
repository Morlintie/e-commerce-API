const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { createCookie } = require("../utils");

const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors");

const signUp = async (req, res) => {
  const { password, email, name } = req.body;
  const user = await User.create({ name, email, password });
  createCookie(
    { name: name, email: email, role: user.role, userId: user._id },
    res
  );

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email: user.email, role: user.role } });
};

const signOut = async (req, res) => {
  const { userId } = req.user;
  const { password } = req.body;
  if (!password) {
    throw new BadRequestError("Please provide credentials");
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new NotFoundError("User not found");
  }
  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid credentials");
  }

  res.cookie("token", "logout", {
    httpOnly: true,
    signed: process.env.NODE_ENV === "production",
    signed: true,
    expire: new Date(Date.now()),
  });

  await User.deleteOne({ _id: userId });

  res.status(StatusCodes.OK).json({ msg: "Successful sign out" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid credentials");
  }

  createCookie(
    { name: user.name, email: user.email, role: user.role, userId: user._id },
    res
  );
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.email, role: user.role } });
};

const logout = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  res.cookie("token", "logout", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expire: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "Successful logout" });
};

module.exports = {
  signUp,
  login,
  signOut,
  logout,
};
