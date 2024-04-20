import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { folderPermission } from "../middleware/folderPermission";
import * as kanbanController from "../controllers/kanban.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);
router.use(folderPermission);

router
  .get("/:listId", kanbanController.getKanbanBoard)
  .post("/move-task", kanbanController.moveTask);

export default router;
