import type { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import type { AuthenticatedRequest } from "../middlewares/authMiddleware";

import User from "../models/user.model.ts";

import cloudinary from "../config/cloudinary.ts";
import { ENV } from "../config/ENV.ts";

import sendOtp from "../utils/otp.ts";
import { validatePhoneNumber } from "../utils/phoneValidate.ts";

// Helper: generate 6-digit code
const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const regiter = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }

    let user = await User.findOne({ phone });

    const code = generateCode();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // validate phone number
    const validation = validatePhoneNumber(phone);
    if (!validation.valid) {
      return res
        .status(400)
        .json({ success: false, message: validation.message });
    }

    if (!user) {
      user = await User.create({
        phone,
        verificationCode: code,
        codeExpires: expires,
      });
    } else {
      user.verificationCode = code;
      user.codeExpires = expires;
      await user.save();
    }

    // Send OTP via SMS
    const message = `Your verification code is ${code}`;
    try {
      const smsResponse = await sendOtp({ message, phoneNumber: phone });
      if (!smsResponse.status) {
        return res
          .status(500)
          .json({ success: false, message: "Failed to send OTP" });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error sending OTP" });
    }

    res.status(200).json({
      success: true,
      message: "Verification code sent",
      userId: user._id,
    });
  } catch (error) {
    console.log("Error in register:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const verifyCode = async (req: Request, res: Response) => {
  try {
    const { phone, code, deviceId, referredBy } = req.body;
    if (!phone || !code)
      return res.status(400).json({ message: "Phone and code required" });

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.codeExpires || user.codeExpires < new Date()) {
      return res.status(400).json({ message: "Code expired" });
    }
    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid code" });
    }

    // Logout previous device and set new deviceId
    if (deviceId) {
      user.deviceId = deviceId;
    }

    // Referral logic: only if user is new and referredBy is provided
    if (!user.isVerified && referredBy) {
      const referredUser = await User.findOne({ referralCode: referredBy });
      if (referredUser) {
        referredUser.points = (referredUser.points ?? 0) + 10;
        await referredUser.save();
        user.referredBy = referredBy;
      }
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.codeExpires = undefined;
    await user.save();

    // generate token
    const token = jwt.sign(
      { user: { id: user._id } },
      ENV.JWT_SECRET as string
    );

    return res.status(200).json({
      message: "Phone verified",
      token,
    });
  } catch (error) {
    console.log("Error in verifyCode:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const changePhoneNumber = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { oldPhoe, newPhone } = req.body;
    if (!oldPhoe || !newPhone) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Old and new phone numbers are required",
        });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.phone !== oldPhoe) {
      return res
        .status(400)
        .json({ success: false, message: "Old phone number does not match" });
    }

    const existingUser = await User.findOne({ phone: newPhone });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "New phone number already in use" });
    }

    user.phone = newPhone;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Phone number updated successfully" });
  } catch (error) {
    console.log("Error in changePhoneNumber:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteAccount = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Delete profile image from Cloudinary if exists
    if (user.profileImage) {
      const publicId = user.profileImage.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId.toString());
      }
    }

    await User.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAccount:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
