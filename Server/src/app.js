import express from 'express';
import errorHandler from './utils/erroeHandler.js';
const app = express();

app.use(express.json());

app.get("/",(req, res)=>{
  res.json({
    ok: true
  })
})

// erro handler
app.use(errorHandler);

export default app;