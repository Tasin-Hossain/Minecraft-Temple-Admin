import "dotenv/config";

const requiredEnv = [
  "NODE_ENV",
  "PORT",
  "MONGO_URI",
  "JWT_ACCESS_SECRET",
  "JWT_ACCESS_SECRET_EXPIRES_IN",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_SECRET_EXPIRES_IN",
  "JWT_TEMP_SECRET",
  "JWT_TEMP_SECRET_EXPIRES_IN",
  "EMAIL_SERVICE",
  "EMAIL_USER",
  "EMAIL_PASS",
  "FRONTEND_URL",
  "APP_URL",
  "RATE_LIMIT_WINDOW_MS",
  "RATE_LIMIT_MAX",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

export const validateEnv = () => {
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("🚨 Missing required environment variables:");
    missing.forEach((key) => console.error(`   - ${key}`));
    console.error("Exiting...");
    process.exit(1);
  }

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.NODE_ENV !== "development" &&
    process.env.NODE_ENV !== "test"
  ) {
    console.error("⚠️ NODE_ENV must be one of: development, production, test");
    process.exit(1);
  }

  if (process.env.JWT_ACCESS_SECRET.length < 32) {
    console.error("⚠️ JWT_ACCESS_SECRET too short!");
    process.exit(1);
  }

  if (process.env.JWT_REFRESH_SECRET.length < 32) {
    console.error("⚠️ JWT_REFRESH_SECRET too short!");
    process.exit(1);
  }

  if (process.env.JWT_TEMP_SECRET.length < 32) {
    console.error("⚠️ JWT_TEMP_SECRET too short!");
    process.exit(1);
  }



  console.log("✅ Environment variables validated successfully");
};
