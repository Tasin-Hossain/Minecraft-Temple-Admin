import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import AppError from "./utils/AppError.js";
import { config } from "./config/env.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
app.use(cookieParser());


const allowedOrigins = [
  config.FRONTEND_URL,    
  config.APP_URL,    
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,     
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());       
app.use(express.urlencoded({ extended: true }));


// Auth Routes
app.use('/api/auth',authRouter)
app.use('/api',userRouter)


app.get("/", (req, res) => {res.json({ok: true,})});

// 404 handler 
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handler 
app.use(errorHandler);   

export default app;
