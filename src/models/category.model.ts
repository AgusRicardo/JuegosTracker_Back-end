import mongoose, { Schema, Document } from "mongoose";

interface Category extends Document{
  name: string;
  description: string;
  games: string[];
}

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true, maxlength: 50 },
    games: [{ type: Schema.Types.ObjectId, ref:"Game",required: true }]
  },
  { timestamps: true }
);

export const Category = mongoose.model<Category>("Category", categorySchema);