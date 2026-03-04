import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

// Helper to ensure secret exists (early fail-fast)
const ensureSecret = (secret, name) => {
  if (!secret) {
    throw new Error(`Missing JWT secret: ${name}. Check your .env file.`);
  }
  return secret;
};

export const generateAccessToken = (userId, expiresIn = "15m") => {
  const secret = ensureSecret(config.JWT_ACCESS_SECRET, "JWT_ACCESS_SECRET");

  // expiresIn priority: .env > function argument > default
  const finalExpiresIn = config.JWT_ACCESS_SECRET_EXPIRES_IN || expiresIn || "15m";

  return jwt.sign(
    { id: userId.toString() }, 
    secret,
    { expiresIn: finalExpiresIn }
  );
};

export const generateRefreshToken = (userId, expiresIn = "7d") => {
  const secret = ensureSecret(config.JWT_REFRESH_SECRET, "JWT_REFRESH_SECRET");

  const finalExpiresIn =  config.JWT_REFRESH_SECRET_EXPIRES_IN || expiresIn || "3d";

  return jwt.sign(
    { id: userId.toString() },
    secret,
    { expiresIn: finalExpiresIn }
  );
};


export const generateTempToken = (userId, expiresIn = "5m", purpose = "temp") => {
  const secret = ensureSecret(config.JWT_TEMP_SECRET, "JWT_TEMP_SECRET");

  const finalExpiresIn =  config.JWT_TEMP_SECRET_EXPIRES_IN ||expiresIn|| "5m";

  return jwt.sign(
    {
      id: userId.toString(),
      purpose,           // optional: "2fa", "reset", "verify" ইত্যাদি
      temp: true,
    },
    secret,
    { expiresIn: finalExpiresIn }
  );
};