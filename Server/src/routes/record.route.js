import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getApiLogs } from "../controllers/record.controller.js";

const router = express.Router();

router.get("/api-logs", protect, getApiLogs);

export default router;
