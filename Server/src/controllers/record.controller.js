// controllers/record.controller.js
import { ApiLog } from "../models/records/ApiLogs.js";

export const getApiLogs = async (req, res) => {
  try {
    // ── Query parameters ─────────────────────────────────────
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || ""; // username or method
    const status = req.query.status || ""; // e.g. 200, 404, 500,...
    const method = req.query.method || ""; // GET, POST, ...
    const sortBy = req.query.sortBy || "createdAt"; // createdAt, statusCode, duration,...
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    // Build filter object
    const filter = {};

    // Text search in method OR username/email
    if (search.trim()) {
      filter.$or = [
        { method: { $regex: search.trim(), $options: "i" } },
        { "user.email": { $regex: search.trim(), $options: "i" } },
        { "user.username": { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (method && method !== "All Methods") {
      filter.method = method.toUpperCase();
    }

    if (status && status !== "All Status") {
      // status can be string "200" or number
      filter.statusCode = Number(status);
    }

    // ── Pagination & sorting ─────────────────────────────────
    const skip = (page - 1) * limit;

    const sort = { [sortBy]: sortOrder };

    // Execute query
    const logsQuery = ApiLog.find(filter)
      .populate("user", "username email")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const [logs, total] = await Promise.all([
      logsQuery,
      ApiLog.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      logs,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("getApiLogs error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      logs: [],
      pagination: null,
    });
  }
};
