require("express-async-errors");
const cookieParser = require("cookie-parser");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const notFoundMiddleware = require("./middlewares/notFound");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const express = require("express");
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

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
