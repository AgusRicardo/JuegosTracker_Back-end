import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  name: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, maxlength: 50, unique: true },
    isAdmin: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<User>("User", userSchema);
