import express from "express";
import * as authController from "../controllers/auth.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createUserSchema,
  loginUserSchema,
  verifyEmailSchema,
} from "../schemas/user.schema";

const router = express.Router();

// Register user
router
  .post(
    "/register",
    validate(createUserSchema),
    authController.registerUserHandler
  )
  .post("/login", validate(loginUserSchema), authController.loginUserHandler)
  .get("/logout", deserializeUser, requireUser, authController.logoutHandler)
  .get("/refresh", authController.refreshAccessTokenHandler)
  .get(
    "/verifyemail/:verificationCode",
    validate(verifyEmailSchema),
    authController.verifyEmailHandler
  );

export default router;
