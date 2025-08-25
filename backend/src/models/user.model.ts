import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  phone: string;
  name?: string | undefined;
  bio?: string | undefined;
  dob?: Date | undefined;
  profileImage?: string | undefined;
  verificationCode?: string | undefined;
  codeExpires?: Date | undefined;
  isVerified: boolean;
  deviceId?: string;

  // Email
  email?: string | undefined;
  emailVerified?: boolean | undefined;
  emailVerificationCode?: string | undefined;
  emailCodeExpires?: Date | undefined;

  // Referrals / points
  points?: number;
  referralCode?: string;
  referredBy?: string | undefined;

  dobChanged?: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    phone: { type: String, required: true, unique: true },
    name: { type: String },
    bio: { type: String },
    dob: { type: Date },
    profileImage: { type: String },
    verificationCode: { type: String },
    codeExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    deviceId: { type: String },

    // Email
    email: { type: String, unique: true, sparse: true },
    emailVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String },
    emailCodeExpires: { type: Date },

    // Referrals / points
    points: { type: Number, default: 0 },
    referralCode: { type: String, unique: true },
    referredBy: { type: String },
    dobChanged: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);
export default User;
