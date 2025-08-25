import express from "express";
import { regiter, verifyCode, changePhoneNumber, deleteAccount } from "../controllers/auth.controller.ts";

import { validate } from "../middlewares/authMiddleware.validate.ts";

import { registerAccount, verifyCode as verifyCodeSchema, changePhoneNumber as changePhoneSchema } from "../validations/auth.validation.ts";

const router = express.Router();

router.post("/register", validate(registerAccount), regiter);
router.post("/verify-code", validate(verifyCodeSchema), verifyCode);

router.post("/change-phone", validate(changePhoneSchema), changePhoneNumber);
router.delete("/delete-account", deleteAccount);

export default router;
