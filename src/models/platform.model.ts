import mongoose, { Schema, Document } from "mongoose";

interface Platform extends Document {
  name: string;
  url: string;
}

const platformSchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50, unique: true },
    url: { type: String, required: false },
  },
  { timestamps: true }
);

export const Platform = mongoose.model<Platform>("Platform", platformSchema);