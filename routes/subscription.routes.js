import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ message: "get all subscriptions" }),
);
subscriptionRouter.get("/:id", (req, res) =>
  res.send({ message: "get subscription by id" }),
);
subscriptionRouter.post("/", (req, res) =>
  res.send({ message: "create subscription" }),
);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ message: "update subscription by id" }),
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ message: "delete subscription by id" }),
);
subscriptionRouter.get("/user/:userId", (req, res) =>
  res.send({ message: "get subscriptions by user id" }),
);
// cancel subscription by user id
subscriptionRouter.post("/cancel/:userId", (req, res) =>
  res.send({ message: "cancel subscription by user id" }),
);
// upcoming subscription
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ message: "get upcoming renewals" }),
);

export default subscriptionRouter;
