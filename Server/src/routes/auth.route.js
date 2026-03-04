import express from "express";
import { getEmailVerificationController, getRegisterController, getResendVerificationEmailController } from "../controllers/auth.controller.js";


const router = express.Router();

router.post('/register', getRegisterController);
router.get('/verify-email', getEmailVerificationController);
router.post('/resend-verification', getResendVerificationEmailController);


export default router;