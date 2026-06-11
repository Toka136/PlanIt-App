require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouing = require("../Back-End/routing/userRoting");
const authRouing = require("../Back-End/routing/authRouting");
const taskRouting = require("./routing/taskRouting");
const { statusText, message } = require("./utils/appError");
const responsStatus = require("./utils/responseStatus");
const path = require("path");
const { upload_default } = require("./utils/uploadDefalt");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
mongoose.connect(process.env.MONGO_CONNECTION).then(async () => {
  console.log("Connected to:", mongoose.connection.name);
  // console.log("connectd");
  const db = await mongoose.connection.db;
  const collections = await db.listCollections().toArray();
});
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});
app.use("/api/users", userRouing);
app.use("/api/auth/", authRouing);
app.use("/api/tasks", taskRouting);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((req, res) => {
  
  res.status(404).json({
    statusText: responsStatus.FAILED,
    message: "This resource is not availabe",
  });
});
app.use((error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(error.statusCode || 400).json({
      status: error.status || responsStatus.FAILED,
      message: error.message,
    });
  }

  return res.status(error.statusCode || 500).json({
    status: error.status || responsStatus.ERROR,
    message: error.message,
  });
});
app.listen(process.env.PORT||4000, () => {
  console.log(` app listening on port ${process.env.PORT}`);
});
