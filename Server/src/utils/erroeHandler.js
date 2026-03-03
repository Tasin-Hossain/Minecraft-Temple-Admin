import AppError from '../utils/AppError.js';

const errorHandler = (err, req, res, next) => {
  
  let error = err;

  if (!(err instanceof AppError)) {
    error = new AppError(
      err.message || ' Server Error ',
      err.statusCode || 500
    );
  }

  // response structure (frontend-এর জন্য consistent)
  const response = {
    success: false,
    status: error.status || 'error',
    message: error.message,
    // শুধু development-এ stack দেখাবে
    ...(process.env.NODE_ENV === 'development' && { 
      stack: error.stack,
      errorDetails: err 
    }),
  };

  // common status code mapping (optional improve)
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json(response);
};

export default errorHandler;