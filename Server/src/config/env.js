import '../validators/envValidators.js'; 

export const config = {
  NODE_ENV: process.env.NODE_ENV ,
  PORT: Number(process.env.PORT) ,

  MONGO_URI: process.env.MONGO_URI,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_SECRET_EXPIRES_IN: process.env.JWT_ACCESS_SECRET_EXPIRES_IN ,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_SECRET_EXPIRES_IN: process.env.JWT_REFRESH_SECRET_EXPIRES_IN,

  JWT_TEMP_SECRET: process.env.JWT_TEMP_SECRET,
  JWT_TEMP_SECRET_EXPIRES_IN: process.env.JWT_TEMP_SECRET_EXPIRES_IN,
  
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  APP_URL: process.env.APP_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,

  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS), 
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX),
};
