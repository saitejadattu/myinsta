const express = require("express");
const Router = express.Router();
const UserQueries = require("../Controllers/UserController.js");

Router.get("/all", UserQueries.getUsers);
Router.put("/forgot-password", UserQueries.updatePassword);
Router.post("/register", UserQueries.userRegister);
Router.post("/login", UserQueries.userLogin);

module.exports = Router;
