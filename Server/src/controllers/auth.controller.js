import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { config } from "../config/env.js";
import { verificationEmail } from "../templates/verificationEmail.js";
import { welcomeEmail } from "../templates/welcomeEmail.js";
import { sendEmail } from "../services/email.service.js";


// Register Controller
export const getRegisterController = asyncHandler(async (req, res) => {
  const { username, email, password, agreedToTerms } = req.body;

  // 1. Required fields validation
  if (!username || !email || !password) {
    throw new AppError("Username, email and password are required", 400);
  }

  if (!agreedToTerms) {
    throw new AppError("You must agree to the terms and privacy policy", 400);
  }

  // 2. Check for existing user
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new AppError("This email is already registered", 409);
    }
    if (existingUser.username === username) {
      throw new AppError("This username is already taken", 409);
    }
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 12); // 12 rounds better for 2025

  // 4. Generate secure verification token
  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  const emailVerificationTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

  // 5. Create user (inside transaction if possible)
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    agreedToTerms: true,
    emailVerificationToken,
    emailVerificationTokenExpires,
  });

  try {
    // 6. Send verification email
    const verifyUrl = `${config.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`;
    const verificationTemplate = verificationEmail({
      name: user.username,
      verifyUrl,
    });

    await sendEmail(user.email, verificationTemplate);

  } catch (emailError) {
    // Email failed → delete the user (rollback)
    await User.findByIdAndDelete(user._id);
    throw new AppError("Failed to send verification email. Please try again later.", 500);
  }

  // 8. Success response
  res.status(201).json({
    success: true,
    message: "Registration successful! Please check your email to verify your account.",
    data: user,
  });
});


