import express from "express";
import { login, logout, signup, checkAuth } from "../controllers/auth.controller";
import { protectRoute } from "../middlewares/auth.middleware";


const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.get("/check", protectRoute, checkAuth);

export default router