const asyncHandler = require("express-async-handler");
const User = require("../Models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserQueries = {
  getUsers: asyncHandler(async (request, response) => {
    const users = await User.find();
    response.status(200).json({
      users: users,
    });
  }),
  updatePassword: asyncHandler(async (request, response) => {
    const { email, password, newPassword } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      response.status(404);
      throw new Error("UserNot Found");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      response.status(401);
      throw new Error("password wrong!");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateUser = await User({ ...user, password: hashedPassword });
    updateUser.save();
    response.status(201).json({
      message: "password updated successful",
    });
  }),
  userRegister: asyncHandler(async (request, response) => {
    const { password, email } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isUser = await User.findOne({ email });
    if (isUser) {
      response.status(400);
      throw new Error("User already exists");
    }
    const user = new User({ ...request.body, password: hashedPassword });
    await user.save();
    response.status(201).json({
      message: "register successful",
    });
  }),
  userLogin: asyncHandler(async (request, response) => {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      response.status(404);
      throw new Error("User Not Found");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      response.status(401);
      throw new Error("User Details email / password wrong!");
    }
    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    response.status(200).json({
      jwtToken,
    });
  }),
};

module.exports = UserQueries;
