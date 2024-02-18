import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import * as listController from "../controllers/list.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .post("/create", listController.createList)
  .get("/:folderId", listController.getAllLists);

export default router;
