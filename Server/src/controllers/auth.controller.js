import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { config } from "../config/env.js";
import { verificationEmail } from "../templates/verificationEmail.js";
import { welcomeEmail } from "../templates/welcomeEmail.js";
import { sendEmail } from "../services/email.service.js";
import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  generateTempToken,
} from "../utils/tokenGenerator.js";
import ms from "ms";
import qrcode from "qrcode";

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
    const verifyUrl = `${config.FRONTEND_URL}/verify-email?token=${emailVerificationToken}&id=${user._id}`;
    const verificationTemplate = verificationEmail({
      name: user.username,
      verifyUrl,
    });

    await sendEmail(user.email, verificationTemplate);
  } catch (emailError) {
    // Email failed → delete the user (rollback)
    await User.findByIdAndDelete(user._id);
    throw new AppError(
      "Failed to send verification email. Please try again later.",
      500,
    );
  }

  // 8. Success response
  res.status(201).json({
    success: true,
    message:
      "Registration successful! Please check your email to verify your account.",
    data: user,
  });
});

// Email Verification Controller
export const getEmailVerificationController = asyncHandler(async (req, res) => {
  const { token, id } = req.query;

  // 1. Early input validation
  if (!token || !id) {
    throw new AppError("Missing verification parameters", 400);
  }

  // 2. Find user + select only needed fields (performance)
  const user = await User.findById(id, {
    email: 1,
    username: 1,
    isVerified: 1,
    emailVerificationToken: 1,
    emailVerificationTokenExpires: 1,
  });

  if (!user) {
    throw new AppError("Invalid verification link – user not found", 404);
  }

  // 3. Already verified → early return (common case)
  if (user.isVerified) {
    return res.status(200).json({
      success: true,
      message: "Email was already verified.",
      alreadyVerified: true,
    });
  }

  // 4. Token validation in one readable condition
  const tokenIsInvalid =
    user.emailVerificationToken !== token ||
    !user.emailVerificationTokenExpires ||
    user.emailVerificationTokenExpires < Date.now();
  if (tokenIsInvalid) {
    throw new AppError("Verification link is invalid or has expired", 400);
  }

  // 5. Update in one atomic operation
  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;

  // 6. Save + send welcome email in parallel (faster response)
  await Promise.all([
    user.save(),
    sendEmail(user.email, welcomeEmail({ name: user.username })),
  ]).catch((err) => {
    console.error("Welcome email failed after verification:", err);
  });

  return res.status(200).json({
    success: true,
    message: "Email verified successfully! You can now log in.",
    email: user.email,
  });
});

// Resend verification email controller
export const getResendVerificationEmailController = asyncHandler(
  async (req, res) => {
    const { email } = req.body;

    if (!email) {
      throw new AppError("Email is required", 400);
    }
    const user = await User.findOne(
      { email },
      {
        email: 1,
        username: 1,
        isVerified: 1,
        emailVerificationToken: 1,
        emailVerificationTokenExpires: 1,
      },
    );

    if (!user) {
      throw new AppError("No account found with that email", 404);
    }

    if (user.isVerified) {
      throw new AppError("This email is already verified", 400);
    }

    // Generate new token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationTokenExpires = emailVerificationTokenExpires;

    await user.save();

    // Send verification email
    const verifyUrl = `${config.FRONTEND_URL}/verify-email?token=${emailVerificationToken}&id=${user._id}`;
    const verificationTemplate = verificationEmail({
      name: user.username,
      verifyUrl,
    });

    await sendEmail(user.email, verificationTemplate);

    return res.status(200).json({
      success: true,
      message: "Verification email resent! Please check your inbox.",
    });
  },
);

// Login Controller
export const getLoginController = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password, stayLoggedIn } = req.body;

  // Validate input
  if (!usernameOrEmail || !password) {
    throw new AppError("Username/email and password are required", 400);
  }
  // Find user by email or username
  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  }).select("+password");

  if (!user) {
    throw new AppError("User not Found", 404);
  }

  // Check if email is activated
  if (user.status !== "active") {
    throw new AppError("Account not active", 403);
  }

  // Check password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError("Invalid password!", 401);
  }

  // If 2FA enabled,
  if (user.twoFactor?.enabled) {
    const tempToken = generateTempToken(user._id);
    console.log("2FA required, temp token issued:", tempToken);
    throw new AppError("Two-factor authentication required", 401, {
      tempToken,
    });
  }

  const accessToken = generateAccessToken(user._id);
  let refreshToken = generateRefreshToken(user._id);

  if (stayLoggedIn) {
    user.refreshTokens.push({
      token: refreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      lastUsed: new Date(),
      expiresAt: new Date(
        Date.now() + ms(config.JWT_REFRESH_SECRET_EXPIRES_IN),
      ),
    });
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: ms(config.JWT_REFRESH_SECRET_EXPIRES_IN), //30days
    });

    user.stayLoggedIn = true;
  } else {
    refreshToken = generateRefreshToken(user._id, "1d");

    user.refreshTokens.push({
      token: refreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      lastUsed: new Date(),
      expiresAt: new Date(Date.now() + ms("1d")),
    });

    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    });

    user.stayLoggedIn = false;
  }

  user.isLoggedIn = true;
  user.lastLogin = new Date();

  await user.save();
  return res.status(200).json({
    message: "Login successful",
    success: true,
    accessToken,
    stayLoggedIn: user.stayLoggedIn,
    user,
  });
});

// 2FA Enabled
export const getTwoFactorEnableController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("+twoFactor.secret");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.twoFactor?.enabled) {
    throw new AppError("Two-factor authentication is already enabled", 400);
  }

  const secret = speakeasy.generateSecret({
    name: `Minecraft Temple (${user.email})`,
  });

  const QRCode = await qrcode.toDataURL(secret.otpauth_url);

  user.twoFactor.secret = secret.base32;

  await user.save();

  return res.status(200).json({
    message: "Two-factor authentication enabled",
    success: true,
    QRCode,
    secret: secret.base32, // In production, you might not want to send the secret back to the client
  });

});

// 2Fa Connfirmation Controller
export const getTwoFactorConfirmController = asyncHandler(async (req, res) => {
  const {code} = req.body;

  const user = await User.findById(req.user._id).select("+twoFactor.secret");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if(user.twoFactor?.enabled) {
    throw new AppError("Two-factor authentication is enabled", 400);
  }
  
  const ok = speakeasy.totp.verify({
    secret: user.twoFactor.secret,
    encoding: "base32",
    token: code,
    window: 1, // allow 30s clock skew
  });

  if (!ok) {
    throw new AppError("Invalid two-factor code", 401);
  }

  user.twoFactor.enabled = true;
  await user.save();
    return res.status(200).json({
    message: "Two-factor authentication enabled successfully",
    success: true,
  });
});

// 2FA Verify Controller
export const getTwoFactorVerifyController = asyncHandler(async (req, res) => {
  const tempToken = req.query.tempToken; // query param
  const { code } = req.body;

  if (!tempToken || !code) {
    throw new AppError("Temp token and 2FA code are required", 400);
  }

  let payload;

  try {
    payload = jwt.verify(tempToken, config.JWT_TEMP_SECRET);
  } catch (err) {
    throw new AppError("Invalid temp token", 401);
  }
  const user = await User.findById(payload.id).select("+twoFactor.secret");
 
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.twoFactor?.secret) {
    throw new AppError(
      "Two-factor authentication not set up for this account",
      400,
    );
  }

  // verify the TOTP code using the user's secret
  const ok = speakeasy.totp.verify({
    secret: user.twoFactor.secret,
    encoding: "base32",
    token: code,
    window: 1, // allow 30s clock skew
  });

  if (!ok) {
    throw new AppError("Invalid two-factor code", 401);
  }

  // 2FA code is valid → issue regular tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshTokens.push({
    token: refreshToken,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
    lastUsed: new Date(),
    expiresAt: new Date(Date.now() + ms(config.JWT_REFRESH_SECRET_EXPIRES_IN)),
  });

  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: ms(config.JWT_REFRESH_SECRET_EXPIRES_IN),
  });

  return res.status(200).json({
    message: "Two-factor authentication successful",
    success: true,
    accessToken,
    user,
  });
});

// 2FA Disable Controller
export const getTwoFactorDisableController = asyncHandler(async (req, res) => {
  const { code ,password } = req.body;

  if (!code || !password) {
    throw new AppError("2FA code and password are required", 400);
  }

  const user = await User.findById(req.user._id).select("+twoFactor.secret +password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.twoFactor?.enabled) {
    throw new AppError("Two-factor authentication is not enabled", 400);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError("Invalid password", 401);
  }

  const ok = speakeasy.totp.verify({
    secret: user.twoFactor.secret,
    encoding: "base32",
    token: code,
    window: 1, // allow 30s clock skew
  });

  if (!ok) {
    throw new AppError("Invalid two-factor code", 401);
  }

  user.twoFactor.enabled = false;
  user.twoFactor.secret = undefined;
  await user.save();
  return res.status(200).json({
    message: "Two-factor authentication disabled successfully",
    success: true,
  });

});

// Logout Controller
export const getLogoutController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const user = await User.findOne({ "refreshTokens.token": tokenHash });
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(
        (t) => t.token !== tokenHash,
      );
      user.stayLoggedIn = false;
      user.isLoggedIn = false;
      await user.save();
    }
  }
  
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
  });

  return res.status(200).json({
    message: "Logout successful",
    success: true,
  });
});