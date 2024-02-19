import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import * as taskController from "../controllers/task.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .post("/create", taskController.createTask)
  .get("/:listId", taskController.getAllTasks)
  .put("/:taskId", taskController.updateTask);

export default router;
