import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin:
    process.env.CLIENT_ORIGIN ||
    "https://role-based-authentication-apmqn9oy2.vercel.app",
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });
