import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.route.js";
import AppError from "./utils/AppError.js";


const app = express();

app.use(express.json());       
app.use(express.urlencoded({ extended: true }));


// Auth Routes
app.use('/api/auth',authRouter)


app.get("/", (req, res) => {res.json({ok: true,})});

// 404 handler 
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handler 
app.use(errorHandler);   

export default app;
