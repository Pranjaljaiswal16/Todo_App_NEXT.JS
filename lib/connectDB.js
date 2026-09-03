import mongoose from "mongoose";

const DB_URI = process.env.DB_URL;

export const connectDB = async () => {
  try {
    if (!DB_URI) {
      throw new Error("DB_URL is not defined in .env");
    }

    if (mongoose.connection.readyState === 1) {
      console.log("Already connected!");
      return;
    }

    await mongoose.connect(DB_URI);

    console.log("Database connected!");
  } catch (err) {
    console.log("Database connection error:", err);
    console.log("Database not connected!");
    process.exit(1);
  }
};