const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const connectToDB = require("./connectToDB.js");
const User = require("./Models/User.js");
const asyncHandler = require("express-async-handler");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const PORT = process.env.PORT;

connectToDB;
app.use((req,res)=>{
    
})
app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.send(users);
  })
);

app.post("/register", async (req, res) => {
  const user = await User(req.body);
  user.save();
  res.send("created");
});
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
