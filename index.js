const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const connectToDB = require("./connectToDB.js");
const userRouter = require("./Routes/UserRoute.js");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const PORT = process.env.PORT;

connectToDB;

app.use("/user", userRouter);
app.use((error, request, response, next) => {
  const statusCode =
    response.statusCode && response.statusCode !== 200
      ? response.statusCode
      : 500;
  response.status(statusCode).json({
    success: false,
    message: error.message,
  });
});
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
