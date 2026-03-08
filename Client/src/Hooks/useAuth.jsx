import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_API,
  LOGOUT_API,
  REGISTER_API,
  RESEND_VERIFICATION_EMAIL_API,
  VERIFY_2FA_API,
} from "../Api/auth";
import { setUser, setLoading, setError, logout } from "../Redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.user,
  );

  // REGISTER
  const useRegister = async (formData) => {
    try {
      dispatch(setLoading(true));

      const res = await REGISTER_API(formData);
      if (res.data.success) {
        navigate("/verify", { state: { email: formData.email } });
        toast.success(res.data.message);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Login failed";

      dispatch(setError(message));
      toast.error(message);
      return error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // RESEND VERIFICATION
  const useResendVerification = async (email) => {
    if (!email) return toast.error("No email available to resend.");

    try {
      dispatch(setLoading(true));
      const res = await RESEND_VERIFICATION_EMAIL_API(email);
       if (res.data.success) {
        toast.success(`${email} email resent!`);
      }
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Login failed";

      dispatch(setError(message));
      toast.error(message);
      return err;
    } finally {
      dispatch(setLoading(false));
    }
    
  };

  // userVerifyEmail -> THERE OWN VerifyEmail.jsx page
 

  // 🔐 LOGIN
  const useLogin = async (formData) => {
    try {
      dispatch(setLoading(true));

      const res = await LOGIN_API(formData);
      if (res.data.need2FA === true) {
        localStorage.setItem("tempToken", res.data.tempToken);
        toast.info("Please verify the 2FA code");
        navigate("/2fa/verify"); // TwoFAVerify page
        return;
      }

      if (res.data.success) {
        dispatch(
          setUser({
            user: res.data.user,
            token: res.data.accessToken,
          }),
        );

        localStorage.setItem("accessToken", res.data.accessToken);

        toast.success(res.data.message);

        navigate("/admin");
        console.log(res);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Login failed";

      dispatch(setError(message));
      toast.error(message);
      return err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // TWO_FACTOR_VERIFY
  const useTwoFactorVerify = async (code) => {
    try {
      dispatch(setLoading(true));

      const tempToken = localStorage.getItem("tempToken");
      if (!tempToken) {
        toast.error("Temp token missing");
        return;
      }

      const res = await VERIFY_2FA_API(tempToken, code);

      if (res.data.success) {
        dispatch(
          setUser({
            user: res.data.user,
            token: res.data.accessToken,
          }),
        );

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.removeItem("tempToken");

        toast.success("2FA verified successfully");

        navigate("/admin");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Login failed";

      dispatch(setError(message));
      toast.error(message);
      return err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // useLogout -> THERE OWN axiosInstance.js page

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    useRegister,
    useResendVerification,
    useLogin,
    useTwoFactorVerify,
  };
};

export default useAuth;
