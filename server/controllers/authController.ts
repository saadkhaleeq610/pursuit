// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Register a new user
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    let user: IUser | null = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Generate JWT
    const token = generateToken(user._id.toString());

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: any) {
    next(error); // Pass error to the error handling middleware
  }
};

// Login user
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Generate JWT
    const token = generateToken(user._id.toString());

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: any) {
    next(error); // Pass error to the error handling middleware
  }
};

// Get current user (Protected Route)
export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.user?._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    next(error); // Pass error to the error handling middleware
  }
};

// Helper function to generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};
