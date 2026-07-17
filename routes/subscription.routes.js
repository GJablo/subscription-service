import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
  getSubscriptionById,
  getSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getSubscriptions);
subscriptionRouter.get("/:id", authorize, getSubscriptionById);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ message: "update subscription by id" }),
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ message: "delete subscription by id" }),
);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
// cancel subscription by user id
subscriptionRouter.post("/cancel/:userId", (req, res) =>
  res.send({ message: "cancel subscription by user id" }),
);
// upcoming subscription
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ message: "get upcoming renewals" }),
);

export default subscriptionRouter;
