import express from "express";
import { getEmailVerificationController, getLoginController, getLogoutController, getRegisterController, getResendVerificationEmailController, getTwoFactorConfirmController, getTwoFactorDisableController, getTwoFactorEnableController, getTwoFactorVerifyController } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/register', getRegisterController);
router.get('/verify-email', getEmailVerificationController);
router.post('/resend-verification', getResendVerificationEmailController);
router.post("/login", getLoginController);

router.post("/2fa/enable", protect, getTwoFactorEnableController);
router.post("/2fa/enable/confirm", protect, getTwoFactorConfirmController);
router.post("/2fa/verify",getTwoFactorVerifyController);
router.post("/2fa/disable", protect, getTwoFactorDisableController);

router.post("/logout", protect, getLogoutController);

export default router;