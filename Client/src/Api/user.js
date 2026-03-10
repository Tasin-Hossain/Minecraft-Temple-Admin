import API from "./axiosInstance";

export const ALL_USERS_API = (params) => API.get("/users", { params });
export const USER_BY_ID_API = (id) => API.get(`/users/${id}`);
export const UPDATE_USER_BY_ID_API = (id, formData) => API.put(`/users/${id}`, formData, {headers: {"Content-Type": "multipart/form-data",},});

export const REMOVE_AVATAR_API = (userId) => API.delete(`/users/${userId}/avatar`);
export const REMOVE_BANNER_API = (userId) => API.delete(`/users/${userId}/banner`);
// export const REMOVE_GALLERY_IMAGE_API = (userId, index) => API.delete(`/users/${userId}/gallery/${index}`);