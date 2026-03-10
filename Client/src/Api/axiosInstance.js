import axios from "axios";
import { store } from "../Redux/store.js";
import { logout } from "../Redux/userSlice.js";

// =======================
// Axios Instances
// =======================

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// refresh request এর জন্য আলাদা instance (interceptor loop prevent)
const refreshAPI = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// =======================
// Token Helpers
// =======================

const getAccessToken = () => localStorage.getItem("accessToken");
const removeAccessToken = () => localStorage.removeItem("accessToken");
const setAccessToken = (token) => localStorage.setItem("accessToken", token);

// =======================
// Logout Handler
// =======================

export const handleLogout = () => {
  removeAccessToken();
  store.dispatch(logout());
  window.location.href = "/login";
};

// =======================
// Request Interceptor
// =======================

API.interceptors.request.use(
  (config) => {

    // refresh endpoint এ access token লাগবে না
    if (config.url.includes("/auth/refresh")) {
      return config;
    }

    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// Refresh Token Function
// =======================

const refreshToken = async () => {
  try {

    const response = await refreshAPI.post("/auth/refresh");

    console.log("Token refreshed:", response.data);

    return response.data.accessToken;

  } catch (error) {

    throw error;

  }
};

// =======================
// Response Interceptor
// =======================

API.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    // 401 Unauthorized
    if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      try {

        const newToken = await refreshToken();

        console.log("New access token:", newToken);

        setAccessToken(newToken);

        API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return API(originalRequest);

      } catch (err) {

        handleLogout();

        return Promise.reject(err);

      }
    }

    return Promise.reject(error);
  }
);

export default API;