const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(`Failed to Connect DB ${err.message}`));
