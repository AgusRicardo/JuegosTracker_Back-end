import mongoose, { Schema, Document } from "mongoose";

interface Category extends Document {
  name: string;
  description: string;
  icon_url?: string;
}

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50, unique: true },
    description: { type: String, required: true, maxlength: 500 }, 
    icon_url: { type: String },
  },
  { timestamps: true }
);

export const Category = mongoose.model<Category>("Category", categorySchema);