const mongoose = require("mongoose");

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
      validator: async () => {
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
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    trim: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
