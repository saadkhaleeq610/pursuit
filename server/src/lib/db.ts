import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try{
        const mongoURI = process.env.MONGODB_URI as string;
        
        const conn = await mongoose.connect(mongoURI);
        console.log(`Mongodb connected: ${conn.connection.host}`);
    } catch (error: any){
        console.log("Mongodb connection error:", error);
    }
};