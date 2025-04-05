require("express-async-errors");
const cookieParser = require("cookie-parser");
const fileUploader = require("express-fileupload");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const cloudinary = require("cloudinary").v2;
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const notFoundMiddleware = require("./middlewares/notFound");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const reviewRouter = require("./routes/review");
const orderRouter = require("./routes/order");

const express = require("express");
const PORT = process.env.PORT;
const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
    message: "To many requests from this IP. Please try again later",
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(fileUploader({ useTempFiles: true }));
app.use(cookieParser(process.env.JWT_SECRET));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/order", orderRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server listen on Port ${PORT}`);
    });
  } catch (error) {}
};

start();
