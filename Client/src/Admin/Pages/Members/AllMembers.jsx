import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button, { IconButton } from "../../../Components/ui/Button";
import {
  MdDeleteOutline,
  MdOutlineRemoveRedEye,
  MdRefresh,
  MdOutlineEdit,
} from "react-icons/md";
import Search from "../../../Components/ui/Search";
import Dropdown from "../../../Components/ui/Dropdown";
import RoleBadge from "../../../Components/RoleBadge";
import BanStatusBadge from "../../../Components/BanStatusBadge";
import Tooltip from "../../../Components/Tooltip";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Modal from "../../../Components/PopUp";

// assuming api is imported where deleteUser is defined
import api from "../../../Api/users"; // adjust path
import { useAllUsers } from "../../../Hooks/useAllUsers";
import Loader from "../../../Components/Loader";


const AllMembers = () => {
  const {
    users,
    totalItems,
    totalPages,
    loading,
    error,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    selectedRole,
    setSelectedRole,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    refresh,
  } = useAllUsers();

  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete?._id) return;

    try {
      await api.deleteUser(userToDelete._id);
      refresh(); // list refresh after delete
    } catch (err) {
      console.error("Delete failed:", err);
      // TODO: toast/notification দেখাতে পারো
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatJoinedDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-auto bg-(--card) rounded-md border border-(--border)">
      <div className="mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4">
          <h1 className="title">All Members</h1>
          <div className="flex items-center justify-between">
            <p>
              Total users:{" "}
              <span className="font-semibold text-(--theme)">{totalItems}</span>
            </p>
            <Button icon={<MdRefresh />} onClick={refresh}>
              Refresh
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex w-full items-center gap-2">
            <Search
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center">
            <Dropdown
              options={["All Status", "active", "suspended", "banned"]}
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
            <Dropdown
              options={[
                "All Roles",
                "member",
                "premium",
                "ultimate",
                "support",
                "moderator",
                "developer",
                "system-dev",
                "admin",
                "management",
                "guest",
              ]}
              value={selectedRole}
              onChange={setSelectedRole}
            />
          </div>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <div className="flex items-center justify-center text-(--muted-text)">
            <Loader/>
          </div>
        )}

        {error && <div className="py-12 text-center text-red-400">{error}</div>}

        {!loading && !error && (
          <>
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
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-(--hover)/20 transition-colors"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.avatar}
                                alt={`${user.username}'s avatar`}
                                className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm"
                                onError={(e) => {
                                  e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`;
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
                                  onClick={() =>
                                    navigate(
                                      `/admin/users/${user._id}/edit`,
                                    )
                                  }
                                />
                              </Tooltip>

                              <Tooltip content="View" position="top">
                                <IconButton
                                  icon={<MdOutlineRemoveRedEye />}
                                  className="border-(--theme)/25 text-(--muted-text)"
                                  onClick={() =>
                                    navigate(`/admin/users/${user._id}`)
                                  }
                                />
                              </Tooltip>

                              <Tooltip content="Delete" position="top">
                                <IconButton
                                  icon={<MdDeleteOutline />}
                                  className="bg-red-400 text-white border border-(--border)"
                                  onClick={() => handleDeleteClick(user)}
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
                    {users.length > 0
                      ? (currentPage - 1) * itemsPerPage + 1
                      : 0}
                  </span>{" "}
                  –{" "}
                  <span className="font-medium text-(--text-wh)">
                    {Math.min(currentPage * itemsPerPage, totalItems)}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-(--theme)">{totalItems}</span>{" "}
                  users
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-(--muted-text)">Show</span>
                  <Dropdown
                    placement="top"
                    options={["10", "20", "30", "50"]}
                    value={itemsPerPage.toString()}
                    onChange={(val) => setItemsPerPage(Number(val))}
                    className="w-16 min-w-16"
                  />
                  <span className="text-(--muted-text)">per page</span>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 flex-wrap">
                  <Button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    size="sm"
                  >
                    <GrFormPrevious />
                  </Button>

                  {(() => {
                    const pages = [];
                    const maxVisible = 5;
                    let startPage = Math.max(
                      1,
                      currentPage - Math.floor(maxVisible / 2),
                    );
                    let endPage = Math.min(
                      totalPages,
                      startPage + maxVisible - 1,
                    );

                    if (endPage - startPage + 1 < maxVisible) {
                      startPage = Math.max(1, endPage - maxVisible + 1);
                    }

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
          </>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Confirm Delete"
          width="420px"
          maxWidth="90%"
          className="border border-(--border)"
        >
          <div className="p-6 space-y-2">
            <p className="">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {userToDelete?.username || "this user"}?
              </span>
              ?
            </p>

            <p className="text-sm text-red-400">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>

              <Button
                variant="outline"
                className="bg-red-400 text-white"
                onClick={handleConfirmDelete}
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AllMembers;
