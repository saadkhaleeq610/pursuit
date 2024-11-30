import {generateToken} from "../lib/utils"
import User from "../models/user.model";
import bcrypt from "bcryptjs"
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response): Promise<any> => {

  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  
  const { fullName, email, password } = req.body as { fullName: string; email: string; password: string };
  try {
    if(!fullName || !email || !password){
      return res.status(400).json({message: "All fields are required"})
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    })

    if(newUser){
      generateToken(newUser._id, res)
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      })
    } else {
      res.status(400).json({message: "Invalid user data"});
    }

  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({message: "Internal Server Error"})
    
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const {email, password} = req.body as {email: string, password: string};
  try {
    const user = await User.findOne({email})

    if(!user){
      return res.status(400).json({message:"Invalid Email or Password"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message:"Invalid Password"})
    }

    generateToken(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    })
  } catch (error: any) {
    console.log("Error in login controller", error.message);
    res.status(500).json({message: "Internal server error"});
    
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message: "Logged out successfully"})
  } catch (error: any) {
    console.log("Error in logout controller", error.message);
    
  }
};

export const checkAuth = (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (error: any) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({message: "Internal server error"})
  }
}