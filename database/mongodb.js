import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

// check for the database URI
if (!DB_URI) {
  throw new Error("Database URI is not defined in the environment variables.");
}

// connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to MongoDB (${NODE_ENV})`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
