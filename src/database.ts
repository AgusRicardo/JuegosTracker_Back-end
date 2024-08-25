import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
  } catch (error) {
    console.log("Error: ", error);
    console.error(error);
    process.exit(1);
  }
}

export default connectDB;