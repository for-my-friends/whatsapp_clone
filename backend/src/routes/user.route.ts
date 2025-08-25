import express from "express";

import { completeProfile } from "../controllers/user.controller.ts";

import { authMiddleware } from "../middlewares/authMiddleware.ts";
import upload from "../middlewares/upload.ts";
import { validate } from "../middlewares/userMiddleware.validate.ts";

import { completeProfileSchema } from "../validations/user.validation.ts";

const router = express.Router();

router.post(
  "/complete-profile",
  authMiddleware,
  upload.single("profileImage"),
  validate(completeProfileSchema),
  completeProfile
);

export default router;
