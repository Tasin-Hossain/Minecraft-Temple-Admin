import API from "./axiosInstance";


export const REGISTER_API = (data) =>  API.post("/auth/register", data);
export const VERIFY_EMAIL_API = (token,id) =>  API.get(`/auth/verify-email?token=${token}&id=${id}`);
export const RESEND_VERIFICATION_EMAIL_API = (email) =>  API.post("/auth/resend-verification-email", {email});
export const LOGIN_API = (data) =>  API.post("/auth/login", data);

export const ENABLE_2FA_API = () => API.post("/auth/2fa/enable");
export const CONFIRM_ENABLE_2FA_API = (code) => API.post("/auth/2fa/enable/confirm", {code});
export const VERIFY_2FA_API = (tempToken, code) =>API.post(`/auth/2fa/verify?tempToken=${tempToken}`, {code,});
export const DISABLE_2FA_API = (password,code) => API.post("/auth/2fa/disable", {password,code});

export const REFRESH_TOKEN_API = () => API.post("/auth/refresh", {}, {withCredentials: true});
export const REFRESH_TOKEN_CHECKER  = () => API.get("/auth/chech-refresh-token", {}, {withCredentials: true});

export const LOGOUT_API = () => API.post("/auth/logout", {}, {withCredentials: true});