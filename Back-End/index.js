require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouing = require("./routing/userRoting");
const authRouing = require("./routing/authRouting");
const taskRouting = require("./routing/taskRouting");

const responsStatus = require("./utils/responseStatus");
const path = require("path");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});

// Database connection
let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_CONNECTION)
      .then(() => {
        console.log("Connected to:", mongoose.connection.name);
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
};

// Ensure database connection before API requests
app.use(async (req, res, next) => {
  try {
    console.log("Mongo URI exists:", !!process.env.MONGO_CONNECTION);

    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    res.status(503).json({
      status: "ERROR",
      message: "Database connection failed",
    });
  }
});

app.use("/api/users", userRouing);
app.use("/api/auth", authRouing);
app.use("/api/tasks", taskRouting);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res) => {
  res.status(404).json({
    statusText: responsStatus.FAILED,
    message: "This resource is not available",
  });
});

app.use((error, req, res, next) => {
  console.error(error);

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

// Export Express app for Vercel
module.exports = app;