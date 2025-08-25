import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5001,
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",

  //   for jwt token expiration
  NODE_ENV: process.env.NODE_ENV || "development",

  //   for uploading files
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",

  //   for otp
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  SMTP_USER: process.env.SMTP_USER || "",

  //
  STREAM_API_KEY: process.env.STREAM_API_KEY || "",
  STREAM_API_SECRET: process.env.STREAM_API_SECRET || "",
};
