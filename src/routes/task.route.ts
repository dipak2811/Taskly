import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import * as taskController from "../controllers/task.controller";
import { folderPermission } from "../middleware/folderPermission";

const router = express.Router();

router.use(deserializeUser, requireUser);
router.use(folderPermission);

router
  .post("/create", taskController.createTask)
  .get("/:listId", taskController.getAllTasks)
  .put("/:taskId", taskController.updateTask)
  .post("/:taskId", taskController.deleteTask)
  .post("/:taskId/comment", taskController.createComment)
  .delete("/comment/:commentId", taskController.deleteComment);

export default router;
