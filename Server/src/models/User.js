import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_.-]+$/,
        "Username can only contain letters, numbers, underscores, dots and hyphens",
      ],
      lowercase: true,
      index: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // never return password in queries by default
    },

    // ─── Password Reset ────────────────────────────────
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    // ─── Profile Visuals ───────────────────────────────
    avatar: {
      type: String,
      default: "https://example.com/default-avatar.png",
    },
    banner: String,

    // ─── Account Status & Permissions ──────────────────
    role: {
      type: String,
      enum: ["user", "moderator", "admin", "banned"],
      default: "user",
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "banned"],
      default: "active",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: { type: String, default: null },
    emailVerificationTokenExpires: { type: Date, default: null },

    // ─── Authentication & Sessions ─────────────────────
    isLoggedIn: {
      type: Boolean,
      default: false,
    },

    twoFactor: {
      enabled: { type: Boolean, default: false },
      secret: { type: String, select: false }, // base32 secret for TOTP
      backupCodes: [{ type: String, select: false }], // hashed backup codes
    },

    refreshTokens: [
      {
        token: { type: String, required: true, select: false },
        userAgent: String,
        ip: String,
        lastUsed: Date,
        expiresAt: Date,
      },
    ],

    lastLogin: {
      type: Date,
      default: null,
    },

    // ─── User Preferences
    receiveUpdates: {
      type: Boolean,
      default: true,
    },
    agreedToTerms: {
      type: Boolean,
      required: true,
      default: false,
    },
    stayLoggedIn: {
      type: Boolean,
      default: false,
    },

    // ─── OAuth / Social Login
    oauthProviders: [
      {
        provider: {
          type: String,
          enum: ["google", "github", "facebook", "discord", "twitter"],
          required: true,
        },
        providerId: { type: String, required: true },
        email: String,
        displayName: String,
        avatar: String,
        accessToken: String, 
        refreshToken: String,
        connectedAt: { type: Date, default: Date.now },
      },
    ],

    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },

    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },

    stats: {
      totalPosts: { type: Number, default: 0, min: 0 },
      totalReactions: { type: Number, default: 0, min: 0 },
      totalMedals: { type: Number, default: 0, min: 0 },
      totalResources: { type: Number, default: 0, min: 0 },
      totalSales: { type: Number, default: 0, min: 0 },
      totalDownloads: { type: Number, default: 0, min: 0 },
      reviewCount: { type: Number, default: 0, min: 0 },
      averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        set: (v) => Math.round(v * 10) / 10,
      },
    },

    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: Date,
    deletedAt: Date,
  },
  {
    timestamps: true, // automatically adds & updates createdAt + updatedAt
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true },
  },
);

export const User = mongoose.model("User", userSchema);
