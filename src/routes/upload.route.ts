import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { folderPermission } from "../middleware/folderPermission";
import { requireUser } from "../middleware/requireUser";
import * as uploadController from "../controllers/upload.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);
router.use(folderPermission);

router.post("/", uploadController.uploadFile);

export default router;
