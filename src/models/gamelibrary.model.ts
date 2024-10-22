import mongoose, { Schema, Document } from "mongoose";

interface GameLibrary extends Document {
  user: Schema.Types.ObjectId;
  game: Schema.Types.ObjectId;
}

const gameLibrarySchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    game: { type: Schema.Types.ObjectId, ref: "Game", required: true }
  },
  { timestamps: true }
);

export const GameLibrary = mongoose.model<GameLibrary>("GameLibrary", gameLibrarySchema);
