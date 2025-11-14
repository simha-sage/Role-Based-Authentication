import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    let token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : (req as any).cookies?.token;

    if (!token) {
      const cookieHeader = req.headers.cookie;
      if (cookieHeader) {
        const match = cookieHeader
          .split(";")
          .map((c) => c.trim())
          .find((c) => c.startsWith("token="));
        if (match) {
          token = decodeURIComponent(match.split("=")[1] || "");
        }
      }
    }
    console.log("Extracted token:", token);
    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: "Unauthorized" });
    }
    const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      console.log("User not found for id:", payload.id);
      return res.status(401).json({ message: "Unauthorized" });
    }
    (req as any).user = user;
    next();
  } catch (err) {
    console.log("Token verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
