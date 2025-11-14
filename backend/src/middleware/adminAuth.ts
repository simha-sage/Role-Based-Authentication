// middleware/adminAuth.ts
import { Request, Response, NextFunction } from "express";

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // This assumes 'authMiddleware' has already run and attached 'user' to the request
  const user = (req as any).user;

  if (!user || user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: Admin access required" });
  }

  // If user is admin, proceed to the next handler
  next();
}
