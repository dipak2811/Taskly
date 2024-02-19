import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import * as projectController from "../controllers/project.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .post("/create", projectController.createProject)
  .get("/", projectController.getAllProjects)
  .put("/:projectId", projectController.editFolder);

export default router;
