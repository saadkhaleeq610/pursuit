import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (userId: any, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as any, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};