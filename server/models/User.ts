// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string; // Explicitly define the _id field
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
