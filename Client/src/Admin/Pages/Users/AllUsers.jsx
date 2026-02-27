import React, { useState, useMemo, useEffect } from "react";
import Button, { IconButton } from "../../../Components/ui/Button";
import {
  MdDeleteOutline,
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
const users = [
  // Admin (2 জন)
  {
    id: 1,
    name: "Rahim Uddin",
    email: "rahim@example.com",
    role: "management",
    status: "Active",
    joined: "Jan 12, 2025",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: 5,
    name: "Fatema Begum",
    email: "fatema.admin@company.bd",
    role: "Admin",
    status: "active",
    joined: "Aug 15, 2024",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },

  // Moderator (3 জন)
  {
    id: 4,
    name: "Sadia Islam",
    email: "sadia.islam@company.bd",
    role: "Moderator",
    status: "Active",
    joined: "Feb 10, 2025",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop",
  },
  {
    id: 6,
    name: "Rashed Khan",
    email: "rashed.mod@gmail.com",
    role: "Moderator",
    status: "Active",
    joined: "Nov 03, 2024",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
  {
    id: 12,
    name: "Nusrat Jahan",
    email: "nusrat.mod@yahoo.com",
    role: "Moderator",
    status: "Suspended",
    joined: "Jun 20, 2025",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  },

  // Pixel (custom role – 2 জন)
  {
    id: 2,
    name: "Karim Hossain",
    email: "karim.h@gmail.com",
    role: "premium",
    status: "Suspended",
    joined: "Mar 05, 2025",
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop",
  },
  {
    id: 8,
    name: "Shakib Ahmed",
    email: "shakib.pixel@design.bd",
    role: "system dev",
    status: "Suspended",
    joined: "Apr 18, 2025",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
  },

  // User (8 জন – সবচেয়ে বেশি)
  {
    id: 3,
    name: "Ayesha Akter",
    email: "ayesha99@yahoo.com",
    role: "Ultimate",
    status: "banned",
    joined: "Oct 28, 2024",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: 7,
    name: "Md. Imran Hossain",
    email: "imran.user@gmail.com",
    role: "User",
    status: "banned",
    joined: "Dec 01, 2024",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: 9,
    name: "Sumaiya Rahman",
    email: "sumaiya.r@outlook.com",
    role: "User",
    status: "Active",
    joined: "May 14, 2025",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  },
  {
    id: 10,
    name: "Jahidul Islam",
    email: "jahid.bd@gmail.com",
    role: "User",
    status: "Active",
    joined: "Jul 22, 2025",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
  {
    id: 13,
    name: "Rina Khatun",
    email: "rina.khatun@hotmail.com",
    role: "User",
    status: "Inactive",
    joined: "Sep 05, 2025",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop",
  },
  {
    id: 15,
    name: "Arif Mahmud",
    email: "arif.m@proton.me",
    role: "User",
    status: "Active",
    joined: "Jan 30, 2026",
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop",
  },
  {
    id: 17,
    name: "Laila Akter",
    email: "laila.akter99@gmail.com",
    role: "User",
    status: "Active",
    joined: "Feb 15, 2026",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: 19,
    name: "Sohan Mia",
    email: "sohan.mia@yahoo.com",
    role: "User",
    status: "Pending",
    joined: "Mar 10, 2026",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
  },

  // Support (2 জন – নতুন যোগ করলাম)
  {
    id: 11,
    name: "Tania Sultana",
    email: "tania.support@company.bd",
    role: "Support",
    status: "Active",
    joined: "Aug 10, 2025",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop",
  },
  {
    id: 16,
    name: "Hasibul Hasan",
    email: "hasib.support@gmail.com",
    role: "Support",
    status: "Active",
    joined: "Oct 05, 2025",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },

  // Guest (2 জন – নতুন)
  {
    id: 14,
    name: "Guest Visitor One",
    email: "guest1@temp.com",
    role: "Guest",
    status: "Inactive",
    joined: "Feb 01, 2026",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
  },
  {
    id: 18,
    name: "Anonymous User",
    email: "anon@guest.bd",
    role: "Guest",
    status: "Active",
    joined: "Mar 01, 2026",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
  },

  // Developer (1 জন – নতুন)
  {
    id: 20,
    name: "Zubair Ahmed",
    email: "zubair.dev@tech.bd",
    role: "Developer",
    status: "Active",
    joined: "Apr 05, 2025",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop",
  },
];

const AllUsers = () => {
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("both");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // নতুন state — ডিফল্ট ১০

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
        const nameLower = user.name.toLowerCase();
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
    <div className="min-h-screen bg-(--card) rounded-md border border-(--border)">
      <div className="mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4">
          <h1 className="title">All Users</h1>
          <div className="flex items-center justify-between">
            <p>
              Total users:{" "}
              <span className="font-semibold text-(--theme)">{users.length}</span>
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
                            alt={`${user.name}'s avatar`}
                            className="h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/40?text=${user.name[0]}`;
                            }}
                          />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-[14px] opacity-70">
                        {user.name}
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
                      <td className="whitespace-nowrap px-6 py-4 text-sm opacity-70">
                        {user.joined}
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
                      {selectedRole !== "All Roles" ? ` for "${selectedRole}"` : ""}
                      {selectedStatus !== "All Status" ? ` with status "${selectedStatus}"` : ""}
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
              of{" "}
              <span className="font-bold text-(--theme)">{totalItems}</span> users
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
                <GrFormPrevious/>
              </Button>

              {/* Page numbers with ellipsis */}
              {(() => {
                const pages = [];
                const maxVisible = 5;
                let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
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
                    </Button>
                  );
                  if (startPage > 2) {
                    pages.push(
                      <span key="start-ellipsis" className="px-1 text-(--muted-text)">
                        ...
                      </span>
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
                    </Button>
                  );
                }

                // Last page
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <span key="end-ellipsis" className="px-1 text-(--muted-text)">
                        ...
                      </span>
                    );
                  }
                  pages.push(
                    <Button
                      key={totalPages}
                      onClick={() => goToPage(totalPages)}
                      variant={totalPages === currentPage ? "primary" : "outline"}
                      size="sm"
                      className="min-w-9"
                    >
                      {totalPages}
                    </Button>
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

export default AllUsers;