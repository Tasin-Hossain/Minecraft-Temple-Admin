import axios from "axios";
import {store} from "../Redux/store.js";
import { REFRESH_TOKEN_API } from "./auth.js";
import { logout } from "../Redux/userSlice.js";


// Axios Instance

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});


// Token Helpers
const getAccessToken = () => localStorage.getItem("accessToken");
const removeAccessToken = () => localStorage.removeItem("accessToken");
const setAccessToken = (token) => localStorage.setItem("accessToken", token);

// Logout Handler
export const handleLogout = () => {
  removeAccessToken();
  store.dispatch(logout());
  window.location.href = "/login";
};


// Request Interceptor
API.interceptors.request.use((config) => {

    const token = getAccessToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Refresh Token Logic
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const refreshToken = async () => {
  try {
    const response = await REFRESH_TOKEN_API();
    return response.data.accessToken;
  } catch (error) {
    throw error;
  }
};


// Response Interceptor
API.interceptors.response.use((response) => response, async (error) => {
    
  const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized
    if (error.response.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();

        setAccessToken(newToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        onRefreshed(newToken);

        return api(originalRequest);

      } catch (err) {

        handleLogout();
        return Promise.reject(err);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;