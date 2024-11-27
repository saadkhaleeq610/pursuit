import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    fullName: string;
    email: string;
    password: string;
}

const userSchema: Schema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true,
        trim: true
    },
    fullName: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true,
        trim: true 
    }},
    {timestamps: true}
);

export default mongoose.model<IUser>('User', userSchema);