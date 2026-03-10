import { useState, useEffect, useCallback } from "react";
import { USER_BY_ID_API } from "../Api/user";

export const useUserFetch = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await USER_BY_ID_API(userId);
      setUser(response.data.data);

      const { data } = response.data;

      setUser(data || null);
    } catch (err) {
      console.error("User fetch error:", err);

      setError(err?.response?.data?.message || "Failed to load user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refresh = () => {
    fetchUser();
  };

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
    refresh,
  };
};