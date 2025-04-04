const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the Database");
  } catch (error) {
    console.log("Couldn't connect to database");
    console.log(error);
  }
};

module.exports = connectDB;
