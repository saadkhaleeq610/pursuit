import express from "express"
import cookieParser from 'cookie-parser';
import { Request, Response } from "express"
import { connectDB } from "./lib/db";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes"; 

dotenv.config();

const app = express()
const PORT = process.env.PORT;
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: any) => {
    return res.status(200).json({
        status: "healthy",
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})