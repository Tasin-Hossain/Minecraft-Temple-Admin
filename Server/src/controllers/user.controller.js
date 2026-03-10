import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Profile from "../models/Profile.js";
import cloudinary from "../config/cloudinary.js";
import { extractPublicId } from "../helpers/extractPublicId.js";
/**
 * |@desc   Get all users (Admin / Management only)
 * |@route   GET /api/users
 * |@access  Private (Admin, Management, System-Dev)
 * |@query  ?page=1&limit=20&role=premium&status=active&search=john
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  // ─── Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  // ─── Build filter object
  const filter = {};

  // Filter by role (exact match)
  if (req.query.role) {
    filter.role = req.query.role;
  }

  // Filter by status (active / suspended / banned)
  if (req.query.status) {
    filter.status = req.query.status;
  }

  // Filter by verification status
  if (req.query.isVerified !== undefined) {
    filter.isVerified = req.query.isVerified === "true";
  }

  // Text search on username OR email (case-insensitive partial match)
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search.trim(), "i");
    filter.$or = [{ username: searchRegex }, { email: searchRegex }];
  }

  // ─── Query
  const usersQuery = User.find(filter)
    .select(
      "username email avatar banner role status isVerified createdAt updatedAt balance totalEarnings stats.profile",
    )
    .sort({ createdAt: -1 }) // newest first
    .skip(skip)
    .limit(limit)
    .lean();

  // ─── Run queries in parallel ──────────────────
  const [users, total] = await Promise.all([
    usersQuery,
    User.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: users.length,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
    data: users,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId).populate("profile").lean();

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const getUserUpdate = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId).populate("profile").lean();

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const toBool = (val) =>
    val === true || val === "true" || val === "1" || val === 1;

  const {
    username,
    email,
    role,
    status,
    isVerified,
    twoFactorEnabled,
    stayLoggedIn,
    receiveUpdates,
    agreedToTerms,
    customTitle,
    creatorTagLine,
    dateOfBirth,
    location,
    Gender,
    occupation,
    website,
    aboutYou,
    socialLinks: socialLinksJson,
  } = req.body;

  // User fields update
  if (username?.trim()) user.username = username.trim();
  if (email?.trim()) user.email = email.trim();
  if (role?.trim()) user.role = role.trim();
  if (status?.trim()) user.status = status.trim();

  if (isVerified !== undefined) user.isVerified = toBool(isVerified);
  if (stayLoggedIn !== undefined) user.stayLoggedIn = toBool(stayLoggedIn);
  if (receiveUpdates !== undefined)
    user.receiveUpdates = toBool(receiveUpdates);
  if (agreedToTerms !== undefined) user.agreedToTerms = toBool(agreedToTerms);

  if (twoFactorEnabled !== undefined) {
    if (!user.twoFactor) user.twoFactor = {};
    user.twoFactor.enabled = toBool(twoFactorEnabled);
  }

  // Files handling (avatar/banner/gallery) — upload + update user
  let avatarUrl, bannerUrl, avatarPublicId, bannerPublicId;
  // let galleryUrls = [], galleryPublicIds = [];

  if (req.files) {
    try {
      // Avatar
      if (req.files.avatar?.[0]) {
        avatarUrl = req.files.avatar[0].path; // secure_url
        avatarPublicId = req.files.avatar[0].filename; // public_id (recommended)
        // অথবা fallback: যদি filename না থাকে তাহলে url থেকে extract
        // avatarPublicId = avatarUrl.split('/').slice(-2).join('/').split('.')[0];

        user.avatar = avatarUrl;
        user.avatarPublicId = avatarPublicId; // নতুন field
      }

      // Banner
      if (req.files.banner?.[0]) {
        bannerUrl = req.files.banner[0].path;
        bannerPublicId = req.files.banner[0].filename;

        user.banner = bannerUrl;
        user.bannerPublicId = bannerPublicId;
      }

      // Gallery (multiple) — যদি চাও
      // if (req.files.gallery?.length > 0) {
      //   galleryUrls = req.files.gallery.map(file => file.path);
      //   galleryPublicIds = req.files.gallery.map(file => file.filename);
      //
      //   user.gallery = galleryUrls;
      //   user.galleryPublicIds = galleryPublicIds;  // array
      // }

      await user.save(); // সব save হবে একসাথে
    } catch (uploadError) {
      console.error("Upload error:", uploadError);
      res.status(500);
      throw new Error("Media upload failed: " + uploadError.message);
    }
  }

  // Profile handling
  let profile = await Profile.findOne({ user: user._id });
  if (!profile) {
    profile = new Profile({ user: user._id });
  }

  if (customTitle !== undefined) profile.customTitle = customTitle.trim();
  if (creatorTagLine !== undefined)
    profile.creatorTagLine = creatorTagLine.trim();
  if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;
  if (location !== undefined) profile.location = location.trim();
  if (Gender !== undefined) profile.Gender = Gender.trim();
  if (occupation !== undefined) profile.occupation = occupation.trim();
  if (website !== undefined) profile.website = website.trim();
  if (aboutYou !== undefined) profile.aboutYou = aboutYou.trim();

  // Social Links merge
  if (socialLinksJson) {
    try {
      const parsed = JSON.parse(socialLinksJson);
      if (typeof parsed === "object" && parsed !== null) {
        profile.socialLinks = {
          ...profile.socialLinks,
          ...Object.fromEntries(
            Object.entries(parsed).filter(([_, v]) => v?.trim() && v != null),
          ),
        };
      }
    } catch (err) {
      console.error("Social links parse error:", err);
    }
  }

  await profile.save();

  // Link profile to user if needed
  if (!user.profile || !user.profile.equals(profile._id)) {
    user.profile = profile._id;
    await user.save();
  }

  // Final populated user return — শুধু এখানে একটা response
  const updatedUser = await User.findById(user._id).populate("profile").lean();

  res.status(200).json({
    success: true,
    message: "User and profile updated successfully",
    data: updatedUser,
    // optional: uploaded media URLs যদি frontend-এ দরকার
    uploaded: {
      avatar: avatarUrl,
      banner: bannerUrl,
      // gallery: galleryUrls
    },
  });
});

// Remove Avatar
export const removeAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Authorization check
  if (
    req.user._id.toString() !== user._id.toString() &&
    req.user.role !== "admin"
  ) {
    res.status(403);
    throw new Error("Not authorized to remove avatar");
  }

  if (user.avatarPublicId) {
    // Cloudinary থেকে delete
    await cloudinary.uploader.destroy(user.avatarPublicId, {
      resource_type: "image",
    });
  } else if (user.avatar) {
    // যদি publicId না থাকে (old data), url থেকে extract করে চেষ্টা করো
    const publicId = extractPublicId(user.avatar);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    }
  }

  // DB clear
  const avatarPath = User.schema.path("avatar"); // User মডেলের schema
  const defaultAvatar = avatarPath.options.default || null;

  user.avatar = defaultAvatar;
  user.avatarPublicId = null;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Avatar removed successfully",
    avatar: null,
  });
});

// Remove Banner
export const removeBanner = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Authorization check (optional: শুধু owner বা admin)
    if (
      req.user._id.toString() !== user._id.toString() &&
      req.user.role !== "admin"
    ) {
      res.status(403);
      throw new Error("Not authorized");
    }

    // Safe delete
    if (user.bannerPublicId) {
      try {
        await cloudinary.uploader.destroy(user.bannerPublicId, {
          resource_type: "image",
        });
      } catch (cloudErr) {
        console.error("Cloudinary delete failed (banner):", cloudErr.message);
        // continue anyway - DB clear করো
      }
    } else if (user.banner) {
      console.warn("No publicId for banner, skipping Cloudinary delete");
    }

    const bannerPath = User.schema.path("banner"); // User মডেলের schema
    const defaultBanner = bannerPath.options.default || null;

    user.banner = defaultBanner;
    user.bannerPublicId = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Banner removed successfully",
      banner: null,
    });
  } catch (error) {
    console.error("removeBanner error:", error.stack);
    res.status(500).json({
      success: false,
      message: "Failed to remove banner",
      error: error.message,
    });
  }
});

// Remove specific gallery image by index (0-based)
// export const removeGalleryImage = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   // authorization check...
//    if (req.user._id.toString() !== user._id.toString() && req.user.role !== 'admin') {
//     res.status(403);
//     throw new Error('Not authorized to remove avatar');
//   }

//   const index = parseInt(req.params.index);

//   if (isNaN(index) || index < 0 || !user.gallery || index >= user.gallery.length) {
//     res.status(400);
//     throw new Error('Invalid gallery index');
//   }

//   const publicId = user.galleryPublicIds?.[index] || extractPublicId(user.gallery[index]);

//   if (publicId) {
//     await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
//   }

//   // Remove from arrays
//   user.gallery.splice(index, 1);
//   if (user.galleryPublicIds) user.galleryPublicIds.splice(index, 1);

//   await user.save();

//   res.status(200).json({
//     success: true,
//     message: 'Gallery image removed',
//     gallery: user.gallery
//   });
// });
