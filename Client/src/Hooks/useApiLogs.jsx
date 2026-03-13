// Hooks/useApiLogs.js
import { useEffect, useState, useCallback } from "react";
import { GET_API_LOGS } from "../Api/record";     // ← rename suggestion below

const useApiLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("All Methods");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        limit,
        ...(searchQuery.trim() && { search: searchQuery.trim() }),
        ...(selectedMethod !== "All Methods" && { method: selectedMethod }),
        ...(selectedStatus !== "All Status" && { status: selectedStatus }),
      };

      // Call your wrapper function (it already handles API instance + error shape)
      const result = await GET_API_LOGS(params);

      if (result.success) {
        setLogs(result.logs || []);
        setPagination(result.pagination || {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        });
      } else {
        throw new Error(result.error || "Failed to load logs");
      }
    } catch (err) {
      console.error("fetchLogs error:", err);
      setError(err.message || "Something went wrong");
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchQuery, selectedMethod, selectedStatus]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    selectedMethod,
    setSelectedMethod,
    selectedStatus,
    setSelectedStatus,
    pagination,
    refresh: fetchLogs,
  };
};

export default useApiLogs;