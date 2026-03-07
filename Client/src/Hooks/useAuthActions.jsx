// src/hooks/useAuthActions.js
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"; // নতুন যোগ করা
import { setUser, setError, logout } from "../Redux/userSlice.js"; // setLoading remove করা যায় যদি per-action use করি
import { toast } from "react-toastify";
import * as API from "../Api/auth.js";

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const { error: globalError } = useSelector((state) => state.user); // global error optional রাখলাম

  // Per-action loading states (universal & reusable)
  const [loadingStates, setLoadingStates] = useState({
    register: false,
    verifyEmail: false,
    resendVerification: false,
    login: false,
    enable2FA: false,
    confirmEnable2FA: false,
    verify2FA: false,
    disable2FA: false,
    refreshToken: false,
    logout: false,
  });

  // Per-action error states (optional, কিন্তু খুবই কাজের)
  const [actionErrors, setActionErrors] = useState({});

  const setActionLoading = (key, value) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }));
  };

  const setActionError = (key, msg) => {
    setActionErrors((prev) => ({ ...prev, [key]: msg }));
  };

  // Universal helper — actionKey দিয়ে loading & error manage করে
  const handleApiCall = async (
    actionKey,
    apiFn,
    payload = null,
    successMessage = null,
  ) => {
    setActionLoading(actionKey, true);
    setActionError(actionKey, null);
    // dispatch(setError(null)); 

    try {
      const response = await apiFn(payload);

      if (response.data?.user && response.data?.token) {
        dispatch(
          setUser({ user: response.data.user, token: response.data.token }),
        );
      }

      if (successMessage) {
        toast.success(successMessage); 
      }

      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Somting wrong!";

      setActionError(actionKey, errorMsg);
      // dispatch(setError(errorMsg)); // global error set করতে চাইলে রাখো

      toast.error(errorMsg);
      throw error;
    } finally {
      setActionLoading(actionKey, false);
    }
  };

  // Register
  const REGISTER = async (data) => {
    return handleApiCall(
      "register",
      API.REGISTER_API,
      data,
      "Registration successful! Check your email.",
    );
  };

  // Verify Email
  const VERIFY_EMAIL = async (token, id) => {
    return handleApiCall(
      "verifyEmail",
      () => API.VERIFY_EMAIL_API(token, id),
      null,
      "Email verified!",
    );
  };

  // Resend Verification
  const RESEND_VERIFICATION = async (email) => {
    return handleApiCall(
      "resendVerification",
      API.RESEND_VERIFICATION_EMAIL_API,
      email,
      `${email} Verification email resent.`,
    );
  };

  // Login
  const LOGIN = async (data) => {
    return handleApiCall(
      "login",
      API.LOGIN_API,
      data,
      "Login successful!",
    );
  };

  // Enable 2FA
  const ENABLE_2FA = async () => {
    return handleApiCall(
      "enable2FA",
      API.ENABLE_2FA_API,
      null,
      "2FA setup started.",
    );
  };

  // Confirm Enable 2FA
  const CONFIRM_ENABLE_2FA = async (code) => {
    return handleApiCall(
      "confirmEnable2FA",
      API.CONFIRM_ENABLE_2FA_API,
      code,
      "2FA enabled successfully!",
    );
  };

  // Verify 2FA
  const VERIFY_2FA = async (tempToken, code) => {
    return handleApiCall(
      "verify2FA",
      () => API.VERIFY_2FA_API(tempToken, code),
      null,
      "2FA verified!",
    );
  };

  // Disable 2FA
  const DISABLE_2FA = async (password, code) => {
    return handleApiCall(
      "disable2FA",
      () => API.DISABLE_2FA_API(password, code),
      null,
      "2FA disabled.",
    );
  };

  // Refresh Token
  const REFRESH_TOKEN = async () => {
    return handleApiCall(
      "refreshToken",
      API.REFRESH_TOKEN_API,
      null,
    );
  };

  // Logout (logout-এ loading optional, কিন্তু রাখলাম)
  const LOGOUT_USER = async () => {
    setActionLoading("logout", true);
    try {
      await API.LOGOUT_API();
      dispatch(logout());
      console.log("Logged out successfully");
    } catch (err) {
      console.error("Logout failed", err);
      dispatch(logout()); // force logout
    } finally {
      setActionLoading("logout", false);
    }
  };

  return {
    REGISTER,
    VERIFY_EMAIL,
    RESEND_VERIFICATION,
    LOGIN,
    ENABLE_2FA,
    CONFIRM_ENABLE_2FA,
    VERIFY_2FA,
    DISABLE_2FA,
    REFRESH_TOKEN,
    LOGOUT_USER,


    isLoading: loadingStates,      
    actionErrors,

    // Individual loading (সবচেয়ে সহজে ব্যবহার করতে)
    isRegisterLoading: loadingStates.register,
    isLoginLoading: loadingStates.login,
    isVerifyEmailLoading: loadingStates.verifyEmail,
    isResendVerificationLoading: loadingStates.resendVerification,
    isEnable2FALoading: loadingStates.enable2FA,
    isConfirmEnable2FALoading: loadingStates.confirmEnable2FA,
    isVerify2FALoading: loadingStates.verify2FA,
    isDisable2FALoading: loadingStates.disable2FA,
    isRefreshLoading: loadingStates.refreshToken,
    isLogoutLoading: loadingStates.logout,

    // Individual errors
    registerError: actionErrors.register,
    loginError: actionErrors.login,
    // ... প্রয়োজন অনুযায়ী আরও যোগ করো
  };
};