import { validateEnv } from "./validators/envValidators.js";
import { config } from "./config/env.js";
import app from "./app.js";
import connectDB from "./config/db.js";

// ENV validate
validateEnv();

const startSever = async () => {
  try {

    // mongodb
    await connectDB();
    
    app.listen(config.PORT, () => {
      console.log(
        `🚀 Server running in ${config.NODE_ENV} mode on port ${config.PORT}`,
      );
    });
  } catch (error) {
    console.error("❌ Startup failed:", error.message);
    process.exit(1);
  }
};

startSever();
