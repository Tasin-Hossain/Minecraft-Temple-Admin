import React, { useState, useMemo, useEffect } from "react";
import Button, { IconButton } from "../../../Components/ui/Button";
import {
  MdDeleteOutline,
  MdFilterList,
  MdOutlineRemoveRedEye,
  MdRefresh,
} from "react-icons/md";
import Search from "../../../Components/ui/Search";
import Dropdown from "../../../Components/ui/Dropdown";
import RoleBadge from "../../../Components/RoleBadge";
import BanStatusBadge from "../../../Components/BanStatusBadge";
import { MdOutlineEdit } from "react-icons/md";
import Tooltip from "../../../Components/Tooltip";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import users from "../../../Api/users";

const AllMembers = () => {
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("both");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();

  // unique roles + "All Roles"
  const roles = useMemo(() => {
    const uniqueRoles = [...new Set(users.map((user) => user.role))];
    return ["All Roles", ...uniqueRoles.sort()];
  }, []);

  // unique Status + "All Status"
  const status = useMemo(() => {
    const uniqueStatus = [...new Set(users.map((user) => user.status))];
    return ["All Status", ...uniqueStatus.sort()];
  }, []);

  const filteredUsers = useMemo(() => {
    let result = users;

    if (selectedRole !== "All Roles") {
      result = result.filter((user) => user.role === selectedRole);
    }

    if (selectedStatus !== "All Status") {
      result = result.filter((user) => user.status === selectedStatus);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();

      result = result.filter((user) => {
        const nameLower = user.username.toLowerCase();
        const emailLower = user.email.toLowerCase();

        if (searchBy === "both") {
          return nameLower.startsWith(query) || emailLower.startsWith(query);
        }
        if (searchBy === "name") {
          return nameLower.startsWith(query);
        }
        if (searchBy === "email") {
          return emailLower.startsWith(query);
        }
        return false;
      });
    }

    return result;
  }, [users, selectedRole, selectedStatus, searchQuery, searchBy]);

  const formatJoinedDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short", // Jan, Feb...
      day: "numeric",
      year: "numeric", // → Jan 12, 2025
    });
  };

  // Pagination calculation
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Filter/search বা itemsPerPage চেঞ্জ হলে page 1-এ ফিরে যাওয়া
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRole, selectedStatus, searchQuery, searchBy, itemsPerPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const searchPlaceholder = {
    both: "Search by name or email...",
    name: "Search by name...",
    email: "Search by email...",
  }[searchBy];

  return (
    <div className="min-h-auto bg-(--card) rounded-md border border-(--border)">
      <div className="mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4">
          <h1 className="title">All Members</h1>
          <div className="flex items-center justify-between">
            <p>
              Total users:{" "}
              <span className="font-semibold text-(--theme)">
                {users.length}
              </span>
            </p>
            <div>
              <Button icon={<MdRefresh />}>Refresh</Button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex w-full items-center gap-2">
            <Search
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Dropdown
              options={["Both", "Name", "Email"]}
              value={searchBy.charAt(0).toUpperCase() + searchBy.slice(1)}
              onChange={(value) => setSearchBy(value.toLowerCase())}
              className="w-25"
            />
          </div>

          <div className="flex gap-2 items-center">
            <Dropdown
              options={status}
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
            <Dropdown
              options={roles}
              value={selectedRole}
              onChange={setSelectedRole}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-md border border-(--border) bg-(--card)">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-(--border)">
              <thead className="bg-(--card-foreground)">
                <tr>
                  <th className="px-6 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                    Avatar
                  </th>
                  <th className="px-2 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                    Name
                  </th>
                  <th className="px-6 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                    Email
                  </th>
                  <th className="px-6 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                    Role
                  </th>
                  <th className="px-6 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                    Joined
                  </th>
                  <th className="relative px-6 py-3.5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-(--border)">
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-(--hover)/20 transition-colors"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={`${user.username}'s avatar`}
                            className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/40?text=${user.name[0]}`;
                            }}
                          />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-[14px] opacity-70">
                        {user.username}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-[14px] opacity-70">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <BanStatusBadge status={user.status} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-[13px] opacity-70">
                       {formatJoinedDate(user.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Tooltip content="Edit" position="top">
                            <IconButton
                              icon={<MdOutlineEdit />}
                              className="border-(--theme)/25 text-(--muted-text)"
                            />
                          </Tooltip>

                          <Tooltip content="View" position="top">
                            <IconButton
                              icon={<MdOutlineRemoveRedEye />}
                              className="border-(--theme)/25 text-(--muted-text)"
                              onClick={() =>
                                navigate(`/admin/all-members/${user.id}`)
                              }
                            />
                          </Tooltip>
                          <Tooltip content="Delete" position="top">
                            <IconButton
                              icon={<MdDeleteOutline />}
                              className="border-(--theme)/25 text-red-400"
                            />
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center text-(--muted-text)"
                    >
                      No users found
                      {selectedRole !== "All Roles"
                        ? ` for "${selectedRole}"`
                        : ""}
                      {selectedStatus !== "All Status"
                        ? ` with status "${selectedStatus}"`
                        : ""}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination + Per Page Selector */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 order-2 sm:order-1 w-full sm:w-auto">
            <p className="text-sm text-(--muted-text)">
              Showing{" "}
              <span className="font-medium text-(--text-wh)">
                {totalItems === 0 ? 0 : indexOfFirstItem + 1}
              </span>{" "}
              –{" "}
              <span className="font-medium text-(--text-wh)">
                {Math.min(indexOfLastItem, totalItems)}
              </span>{" "}
              of <span className="font-bold text-(--theme)">{totalItems}</span>{" "}
              users
            </p>

            {/* Per Page Dropdown */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-(--muted-text)">Show</span>
              <Dropdown
                placement="top"
                options={["10", "20", "30", "50"]}
                value={itemsPerPage.toString()}
                onChange={(val) => {
                  setItemsPerPage(Number(val));
                  setCurrentPage(1);
                }}
                className="w-16 min-w-16"
              />
              <span className="text-(--muted-text)">per page</span>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 flex-wrap">
              {/* Previous */}
              <Button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                size="sm"
              >
                <GrFormPrevious />
              </Button>

              {/* Page numbers with ellipsis */}
              {(() => {
                const pages = [];
                const maxVisible = 5;
                let startPage = Math.max(
                  1,
                  currentPage - Math.floor(maxVisible / 2),
                );
                let endPage = Math.min(totalPages, startPage + maxVisible - 1);

                if (endPage - startPage + 1 < maxVisible) {
                  startPage = Math.max(1, endPage - maxVisible + 1);
                }

                // First page
                if (startPage > 1) {
                  pages.push(
                    <Button
                      key={1}
                      onClick={() => goToPage(1)}
                      variant={1 === currentPage ? "primary" : "outline"}
                      size="sm"
                      className="min-w-9"
                    >
                      1
                    </Button>,
                  );
                  if (startPage > 2) {
                    pages.push(
                      <span
                        key="start-ellipsis"
                        className="px-1 text-(--muted-text)"
                      >
                        ...
                      </span>,
                    );
                  }
                }

                // Visible pages
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <Button
                      key={i}
                      onClick={() => goToPage(i)}
                      variant={i === currentPage ? "primary" : "outline"}
                      size="sm"
                      className="min-w-9"
                    >
                      {i}
                    </Button>,
                  );
                }

                // Last page
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <span
                        key="end-ellipsis"
                        className="px-1 text-(--muted-text)"
                      >
                        ...
                      </span>,
                    );
                  }
                  pages.push(
                    <Button
                      key={totalPages}
                      onClick={() => goToPage(totalPages)}
                      variant={
                        totalPages === currentPage ? "primary" : "outline"
                      }
                      size="sm"
                      className="min-w-9"
                    >
                      {totalPages}
                    </Button>,
                  );
                }

                return pages;
              })()}
              {/* next */}
              <Button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                size="sm"
              >
                <GrFormNext />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMembers;
