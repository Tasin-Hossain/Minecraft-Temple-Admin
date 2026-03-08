import API from "./axiosInstance";


export const REGISTER_API = (data) =>  API.post("/register", data);
export const VERIFY_EMAIL_API = (token,id) =>  API.get(`/verify-email?token=${token}&id=${id}`);
export const RESEND_VERIFICATION_EMAIL_API = (email) =>  API.post("/resend-verification-email", {email});
export const LOGIN_API = (data) =>  API.post("/login", data);

export const ENABLE_2FA_API = () => API.post("/2fa/enable");
export const CONFIRM_ENABLE_2FA_API = (code) => API.post("/2fa/enable/confirm", {code});
export const VERIFY_2FA_API = (tempToken, code) =>API.post(`/2fa/verify?tempToken=${tempToken}`, {code,});
export const DISABLE_2FA_API = (password,code) => API.post("/2fa/disable", {password,code});

export const REFRESH_TOKEN_API = () => API.post("/refresh", {}, {withCredentials: true});
export const REFRESH_TOKEN_CHECKER  = () => API.get("/chech-refresh-token", {}, {withCredentials: true});

export const LOGOUT_API = () => API.post("/logout", {}, {withCredentials: true});