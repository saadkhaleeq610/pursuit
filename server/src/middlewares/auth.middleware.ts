import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";

// Extend Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized - Invalid token" });
      return;
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = user; // Attach user to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error: any) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
