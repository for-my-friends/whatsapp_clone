import express from "express";

import { ENV } from "./config/ENV.ts";
import connectDB from "./config/db.ts";

import authRoutes from "./routes/auth.route.ts";
import userRoutes from "./routes/user.route.ts";

const app = express();
const PORT = ENV.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder for uploads
app.use("/uploads", express.static("uploads"));

// test route
app.get("/", (req, res) => {
  res.send("🚀 Express + TypeScript Backend is running successfully!");
});


// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
    connectDB();
});
