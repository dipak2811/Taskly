import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { folderPermission } from "../middleware/folderPermission";
import { requireUser } from "../middleware/requireUser";
import * as uploadController from "../controllers/upload.controller";
import multer from "multer";

const router = express.Router();

router.use(deserializeUser, requireUser);
router.use(folderPermission);
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.array("files"), uploadController.uploadFile);

export default router;
