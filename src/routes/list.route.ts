import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import * as listController from "../controllers/list.controller";
import { folderPermission } from "../middleware/folderPermission";

const router = express.Router();

router.use(deserializeUser, requireUser);
router.use(folderPermission);

router
  .post("/create", listController.createList)
  .get("/:folderId", listController.getAllLists)
  .put("/:listId", listController.editList)
  .delete("/:listId", listController.deleteList);

export default router;
