import React from "react";
import useApiLogs from "../../../Hooks/useApiLogs";
import Dropdown from "../../../Components/ui/Dropdown";
import Search from "../../../Components/ui/Search";
import Loader from "../../../Components/Loader";
import Button from "../../../Components/ui/Button";
import { MdRefresh } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ApiMethodBadge from "../../Components/Records/APILog/ApiMethodBadge";
import ApiStatusBadge from "../../Components/Records/APILog/ApiStatusBadge";
import ApiDurationBadge from "../../Components/Records/APILog/ApiDurationBadge";

const ApiLogs = () => {
  const {
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
    refresh,
  } = useApiLogs();

  return (
    <div className="min-h-auto bg-(--card) rounded-md border border-(--border)">
      <div className="mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4">
          <h1 className="title">API Logs</h1>
          <div className="flex items-center justify-between">
            <p>
              Total logs:{" "}
              <span className="font-semibold text-(--theme)">
                {pagination.total.toLocaleString()}
              </span>
            </p>
            <Button icon={<MdRefresh />} onClick={refresh}>
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex w-full items-center gap-2">
            <Search
              placeholder="Search by username, email or method..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex gap-3 items-center">
            <Dropdown
              value={selectedStatus}
              onChange={(val) => {
                setSelectedStatus(val);
                setPage(1);
              }}
              options={[
                "All Status",
                "200",
                "201",
                "400",
                "401",
                "403",
                "404",
                "429",
                "500",
              ]}
            />

            <Dropdown
              value={selectedMethod}
              onChange={(val) => {
                setSelectedMethod(val);
                setPage(1);
              }}
              options={[
                "All Methods",
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "HEAD",
                "OPTIONS",
              ]}
            />
          </div>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <div className="flex items-center justify-center text-(--muted-text)">
            <Loader/>
          </div>
        )}

        {error && <div className="py-6 text-center text-red-400">{error}</div>}
        {!loading && !error && (
          <>
            {/* Table */}
            <div className="overflow-x-auto border border-(--border) rounded-md">
              <table className="min-w-full divide-y divide-(--border)">
                <thead className="bg-(--card-foreground)">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                      Method
                    </th>
                    <th className="px-4 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                      Endpoint
                    </th>
                    <th className="px-6 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                      Duration
                    </th>
                    <th className="px-6 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                      User
                    </th>
                    <th className="px-6 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                      IP
                    </th>
                    <th className="px-6 py-3.5 text-left text-sm font-semibold text-(--text-wh)">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--border)">
                  {logs.length > 0 ? (
                    logs.map((log) => (
                      <tr
                        key={log._id}
                        className="hover:bg-(--hover)/30 transition-colors"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <ApiMethodBadge method={log.method} />
                        </td>
                        <td className="px-4 py-4 text-sm opacity-90 break-all">
                          {log.endpoint}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <ApiStatusBadge statusCode={log.statusCode} />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <ApiDurationBadge duration={log.duration} />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {log.user?.email || log.user?.username || "Guest"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {log.ip}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm opacity-70">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-16 text-center text-(--muted-text)"
                      >
                        {loading ? (
                          <Loader />
                        ) : (
                          "No logs found matching your filters"
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.total > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
                {/* Left side: Showing X–Y of Z + Rows per page */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 order-2 sm:order-1 w-full sm:w-auto">
                  <p className="text-sm text-(--muted-text)">
                    Showing{" "}
                    <span className="font-medium text-(--text-wh)">
                      {logs.length > 0 ? (page - 1) * limit + 1 : 0}
                    </span>{" "}
                    –{" "}
                    <span className="font-medium text-(--text-wh)">
                      {Math.min(page * limit, pagination.total)}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-(--theme)">
                      {pagination.total.toLocaleString()}
                    </span>{" "}
                    logs
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-(--muted-text)">Show</span>
                    <Dropdown
                      placement="top"
                      options={["10", "20", "30", "50", "100"]}
                      value={limit.toString()}
                      onChange={(val) => {
                        setLimit(Number(val));
                        setPage(1); // reset to first page when changing per-page count
                      }}
                      className="w-16 min-w-16"
                    />
                    <span className="text-(--muted-text)">per page</span>
                  </div>
                </div>

                {/* Right side: Page buttons */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 flex-wrap">
                    {/* Previous */}
                    <Button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1 || loading}
                      size="sm"
                      variant="outline"
                    >
                      <GrFormPrevious className="text-lg" />
                    </Button>

                    {/* Page numbers with ellipsis logic */}
                    {(() => {
                      const pages = [];
                      const maxVisible = 5;
                      let startPage = Math.max(
                        1,
                        page - Math.floor(maxVisible / 2),
                      );
                      let endPage = Math.min(
                        pagination.totalPages,
                        startPage + maxVisible - 1,
                      );

                      // Adjust start if near the end
                      if (endPage - startPage + 1 < maxVisible) {
                        startPage = Math.max(1, endPage - maxVisible + 1);
                      }

                      // First page + ellipsis if needed
                      if (startPage > 1) {
                        pages.push(
                          <Button
                            key={1}
                            onClick={() => setPage(1)}
                            variant={1 === page ? "primary" : "outline"}
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

                      // Visible page numbers
                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <Button
                            key={i}
                            onClick={() => setPage(i)}
                            variant={i === page ? "primary" : "outline"}
                            size="sm"
                            className="min-w-9"
                          >
                            {i}
                          </Button>,
                        );
                      }

                      // Last page + ellipsis if needed
                      if (endPage < pagination.totalPages) {
                        if (endPage < pagination.totalPages - 1) {
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
                            key={pagination.totalPages}
                            onClick={() => setPage(pagination.totalPages)}
                            variant={
                              pagination.totalPages === page
                                ? "primary"
                                : "outline"
                            }
                            size="sm"
                            className="min-w-9"
                          >
                            {pagination.totalPages}
                          </Button>,
                        );
                      }

                      return pages;
                    })()}

                    {/* Next */}
                    <Button
                      onClick={() =>
                        setPage((p) => Math.min(pagination.totalPages, p + 1))
                      }
                      disabled={page === pagination.totalPages || loading}
                      size="sm"
                      variant="outline"
                    >
                      <GrFormNext className="text-lg" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ApiLogs;
