import express from "express";
import { protect } from "../middlewares/authMiddleware.js"; // admin middleware যোগ করো যদি থাকে
import {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserUpdate,
  removeAvatar,
  removeBanner,
  updateUser,
} from "../controllers/user.controller.js";

import { uploadProfileMedia } from "../middlewares/uploadCloudinary.js";

const router = express.Router();

router.get("/users", protect, getAllUsers);

router.get("/users/:id", protect, getUserById);
router.get("/users/:id/edit", protect, getUserUpdate);
router.put("/users/:id", protect, uploadProfileMedia, updateUser);

router.delete('/users/:id/avatar', protect, removeAvatar);
router.delete('/users/:id/banner', protect, removeBanner);
// router.delete('/users/:id/gallery/:index', protect, removeGalleryImage);

router.delete("/users/:id", protect, deleteUser);

export default router;
