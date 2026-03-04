import express from "express";
import { getEmailVerificationController, getRegisterController } from "../controllers/auth.controller.js";


const router = express.Router();

router.post('/register', getRegisterController);
router.post('/verify-email', getEmailVerificationController);


export default router;