import '../validators/envValidators.js'; 

export const config = {
  NODE_ENV: process.env.NODE_ENV ,
  PORT: Number(process.env.PORT) ,

  MONGO_URI: process.env.MONGO_URI,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ,

  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  APP_URL: process.env.APP_URL,

  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS), 
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX),
};
