import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided " });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded.id).select("-password -refreshToken");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized - invalid token" });
  }
});