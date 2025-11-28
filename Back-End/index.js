const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_CONNECTION).then(async () => {
  console.log("Connected to:", mongoose.connection.name);
  console.log("connectd");
  const db = await mongoose.connection.db;
  console.log("db=>", db.name);
  const collections = await db.listCollections().toArray();
  console.log("DB Name:", mongoose.connection.name);

  console.log("Collections:");
  collections.forEach((col) => console.log(col.name));
});
app.listen(process.env.PORT, () => {
  console.log(` app listening on port ${process.env.PORT}`);
});
