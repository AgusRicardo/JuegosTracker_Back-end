import mongoose, { Schema, Document } from "mongoose";

interface Game extends Document {
  name: string;
  description: string;
  img_url: string;
  platform: string;
  category: string;
  ownerId: number;
}

const gameSchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true },
    img_url: { type: String, required: true },
    platform: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref:"Category",required: true },
    ownerId: { type: Schema.Types.ObjectId, ref:"User", required: true },
  },
  { timestamps: true }
);

export const Game = mongoose.model<Game>("Game", gameSchema);