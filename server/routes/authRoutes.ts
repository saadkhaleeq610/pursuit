// src/routes/authRoutes.ts
import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, getCurrentUser);

export default router;
