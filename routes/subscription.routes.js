import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
  getSubscriptionById,
  getSubscriptions,
  deleteSubscriptionById,
  updateSubscriptionById,
  cancelSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getSubscriptions);
subscriptionRouter.get("/:id", authorize, getSubscriptionById);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", authorize, updateSubscriptionById);
subscriptionRouter.delete("/:id", authorize, deleteSubscriptionById);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
// cancel subscription by user id
subscriptionRouter.post("/cancel/:id", authorize, cancelSubscription);
// upcoming subscription
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ message: "get upcoming renewals" }),
);

export default subscriptionRouter;
