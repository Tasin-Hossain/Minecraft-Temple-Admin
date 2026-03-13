

import API from "./axiosInstance";


export const GET_API_LOGS = async (params = {}) => {
  try {
    const res = await API.get("/admin/api-logs", { params });

   
    return {
      logs: res.data.logs || [],
      pagination: res.data.pagination || {
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
      success: res.data.success || false,
    };
  } catch (error) {
    console.error("Get API Logs failed:", error?.response?.data || error.message);
    return {
      logs: [],
      pagination: null,
      success: false,
      error: error?.response?.data?.message || "Failed to load logs",
    };
  }
};

