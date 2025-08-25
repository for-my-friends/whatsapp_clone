# 📱 Express + TypeScript Backend

This is a backend API built with **Express.js** and **TypeScript**.  
It includes user authentication with **phone number, email, and passkeys**,  
support for **two-step verification**, **Cloudinary profile uploads**,  
and **Stream Chat integration**.

---

## 🚀 Features

- User create account with **phone number**
- **OTP verification** for phone
- Profile management (name, bio, DOB, profile image, email)
- Profile image upload with **Multer + Cloudinary**
- Single device login (logout previous device if new login)
- Option to block unknown accounts from messaging
- Invite friends and earn points
- JWT-based authentication
- MongoDB database with Mongoose

---

## 📂 Project Structure

src/
│── config/ # Database, Cloudinary, environmen variables, sms configs
│── controllers/ # Request handlers
│── middlewares/ # Authentication & security middlewares
│── models/ # Mongoose models
│── routes/ # Express routes
│── utils/ # Helpers (otp, mail, etc.)
|__ validations/ # input validation
│── server.ts # Entry point



---

## 🔧 Installation

Clone the repository:

```bash
git clone https://github.com/for-my-friends/whatsapp_clone.git
cd your-backend
Install dependencies:

bash
Copy
Edit
npm install
⚙️ Environment Variables
Create a .env file in the root directory with the following:

env
Copy
Edit
PORT=5001
MONGO_URI=*********

JWT_SECRET=*********
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=*********
CLOUDINARY_API_KEY=*********
CLOUDINARY_API_SECRET=*********

# SMTP (phone service)
SMTP_HOST=***********
SMTP_PASS=********
SMTP_USER=*******

# Stream Chat
STREAM_API_KEY=*********
STREAM_API_SECRET=*********
▶️ Running the Project
Development mode (with hot reload):

bash
Copy
Edit
npm run dev
Production build:

bash
Copy
Edit
npm run build
npm start
📡 API Endpoints
Auth
POST /api/auth/register → Register with phone

POST /api/auth/verify-code → Verify OTP

Profile
PUT /api/auth/change-phone → change the old phone number

POST /api/user/complete-profile → complete profile #(name, email, dob, bio)
