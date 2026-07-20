import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./database/mongodb.js";

import subscriptionRouter from "./routes/subscription.routes.js";
import workflowRouter from "./routes/workflow.routes.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(arcjetMiddleware); // Apply Arcjet middleware to all routes

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/workflows", workflowRouter);
app.use(errorMiddleware);

// Connecting here (rather than in the listen callback) means the app is
// ready to serve requests as soon as it's imported, which is required for
// serverless platforms that import this module without calling listen().
await connectDB();

export default app;
