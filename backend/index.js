import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import sessionRoutes from "./routes/session.route.js";

dotenv.config();

const app = express();
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);
// Session routes
app.use("/api", sessionRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/wellness";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
