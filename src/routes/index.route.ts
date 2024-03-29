import express from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import projectRouter from "./project.route";
import listRouter from "./list.route";
import taskRouter from "./task.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/projects", projectRouter);
router.use("/lists", listRouter);
router.use("/tasks", taskRouter);

export default router;
