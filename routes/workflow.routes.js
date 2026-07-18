import { Router } from "express";

const workflowRouter = Router();

workflowRouter.get("/", (req, res) => {
  res.send({ message: "get all workflows" });
});

export default workflowRouter;
