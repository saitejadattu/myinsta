const asyncHandler = require("express-async-handler");
const User = require("../Models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserQueries = {
  getUsers: asyncHandler(async (request, response) => {
    const users = await User.find();
    response.send(users);
  }),
  updatePassword: async (request, response) => {
    const user = await User.findById(request.id);
    console.log(user);
  },
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
