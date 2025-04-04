const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email must be provided."],
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please provide valid email.",
    ],
    validate: {
      validator: async function () {
        const existingUser = await mongoose
          .model("User")
          .findOne({ email: this.email });
        if (existingUser) {
          return false;
        } else {
          return true;
        }
      },
      message: "This email has already been taken.",
    },
  },

  role: {
    type: String,
    required: [true, "Please provide a role"],
    enum: {
      values: ["user", "admin"],
      message: "Please provide a valid role",
    },
    default: "user",
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    trim: true,
  },
});

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();
  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }
});

UserSchema.methods.checkPassword = async function (candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password);
  return match;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
