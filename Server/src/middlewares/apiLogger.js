import { ApiLog } from "../models/records/ApiLogs.js";
import {config} from "../config/env.js";


export const apiLogger = (req, res, next) => {
  if (config.API_LOGGING_ENABLED !== "true") {
    return next();
  }
  const start = Date.now();

  res.on("finish", async () => {
    try {
      await ApiLog.create({
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: res.statusCode,
        duration: Date.now() - start,
        user: req.user?._id || null,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      });
    } catch (err) {
      console.log("API Log Error:", err);
    }
  });

  next();
};
