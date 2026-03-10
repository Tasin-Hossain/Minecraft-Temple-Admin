import { useState, useEffect, useCallback } from "react";
import { ALL_USERS_API } from "../Api/user";

export const useAllUsers = (initialFilters = {}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [selectedRole, setSelectedRole] = useState(
    initialFilters.role || "All Roles"
  );

  const [selectedStatus, setSelectedStatus] = useState(
    initialFilters.status || "All Status"
  );

  const [searchQuery, setSearchQuery] = useState(initialFilters.search || "");

  /**
   * Fetch users
   */
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      // role filter
      if (selectedRole !== "All Roles") {
        params.role = selectedRole.toLowerCase();
      }

      // status filter
      if (selectedStatus !== "All Status") {
        params.status = selectedStatus.toLowerCase();
      }

      // search
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const response = await ALL_USERS_API(params);

      // Axios response
      const { data, pagination } = response.data;

      setUsers(data || []);
      setTotalItems(pagination?.total || 0);
      setTotalPages(pagination?.totalPages || 1);
    } catch (err) {
      console.error("Users fetch error:", err);

      setError(err?.response?.data?.message || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    itemsPerPage,
    selectedRole,
    selectedStatus,
    searchQuery,
  ]);

  /**
   * Auto fetch
   */
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /**
   * Reset page when filters change
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRole, selectedStatus, searchQuery, itemsPerPage]);

  /**
   * Manual refresh
   */
  const refresh = () => {
    fetchUsers();
  };

  return {
    // users data
    users,
    totalItems,
    totalPages,
    loading,
    error,

    // pagination
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,

    // filters
    selectedRole,
    setSelectedRole,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,

    // actions
    fetchUsers,
    refresh,
  };
};


