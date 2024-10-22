import mongoose, { Schema, Document } from "mongoose";

interface Game extends Document {
  name: string;
  description: string;
  img_url: string;
  platform: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
}

const gameSchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true },
    img_url: { type: String, required: true },
    platform: { type: Schema.Types.ObjectId, ref: "Platform", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export const Game = mongoose.model<Game>("Game", gameSchema);