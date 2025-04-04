const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");
const { checkPermission, createCookie } = require("../utils");

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({}).select("-password ");
  res.status(StatusCodes.OK).json({ users: allUsers });
};

const getUser = async (req, res) => {
  const { userId, role } = req.user;
  const { id } = req.params;

  checkPermission(id, userId, role);

  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
      __v: user.__v,
    },
  });
};

const showUser = async (req, res) => {
  const { name, email, role, userId } = req.user;
  res.status(StatusCodes.OK).json({ user: { name, email, role, _id: userId } });
};

const updateUser = async (req, res) => {
  const { role, userId } = req.user;
  const { id } = req.params;
  const { name, email } = req.body;
  checkPermission(id, userId, role);

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { name, email },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new NotFoundError("User not found");
  }

  createCookie(
    { name: user.name, email: user.email, role: user.role, userId: user._id },
    res
  );

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
      __v: user.__v,
    },
  });
};

const deleteUser = async (req, res) => {
  const { role, userId } = req.user;
  const { id } = req.params;
  checkPermission(id, userId, role);

  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  await User.deleteOne({ _id: id });

  res.status(StatusCodes.OK).json({ msg: "User successfully deleted" });
};

const updatePassword = async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  if (!newPassword || !oldPassword) {
    throw new BadRequestError("Please provide credentials");
  }

  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isPasswordCorrect = await user.checkPassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid credentials");
  }

  await User.findOneAndUpdate(
    { _id: req.user.userId },
    { password: newPassword },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ msg: "Password successfully updated" });
};

module.exports = {
  getAllUsers,
  getUser,
  showUser,
  updateUser,
  deleteUser,
  updatePassword,
};
