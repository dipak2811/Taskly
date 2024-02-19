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
  .get("/:listId", taskController.getAllTasks);

export default router;
