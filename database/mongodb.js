import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

// check for the database URI
if (!DB_URI) {
  throw new Error("Database URI is not defined in the environment variables.");
}

// connect to the database
// Guarded against re-connecting on every invocation, since serverless
// platforms (e.g. Vercel) can reuse the module across warm invocations.
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(DB_URI);
  console.log(`Connected to MongoDB (${NODE_ENV})`);
};

export default connectDB;
