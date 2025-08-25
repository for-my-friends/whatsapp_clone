import type { Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/authMiddleware";

import User from "../models/user.model.ts";
import cloudinary from "../config/cloudinary.ts";

export const completeProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { name, email, bio, dob } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (name) user.name = name || user.name;
        if (bio) user.bio = bio || user.bio;
        if (email) user.email = email || user.email;
        if (dob) {
            if (!user.dobChanged) {
                user.dob = new Date(dob);
                user.dobChanged = true;
            } else {
                return res.status(403).json({
                    success: false,
                    message: "DOB change requires ID verification. Please upload your ID."
                });
            }
        }
        // Update profile image only if a new image is uploaded
        if (req.file) {
            // Destroy previous image if exists
            if (user.profileImage) {
                const publicId = user.profileImage.split("/").pop()?.split(".")[0];
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId.toString());
                }
            }
            // Upload new image
            const result = await cloudinary.uploader.upload(req.file.path, { folder: "profile-pictures" });
            user.profileImage = result.secure_url;
        }

        await user.save();

        return res.status(200).json({ success: true, message: "Profile updated", user });
        
    } catch (error) {
        console.log("Error in completeProfile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};