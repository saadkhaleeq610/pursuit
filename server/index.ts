// src/index.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import connectDB from './config/db';

// Initialize environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('MERN Auth API is running');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});