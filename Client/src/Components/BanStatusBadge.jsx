// src/components/UserStatusBadge.jsx
import React from "react";

// react-icons (শুধু যা দরকার তাই import করা)
import { FaCheckCircle, FaUserSlash, FaBan } from "react-icons/fa";

function BanStatusBadge({ status = "Active" }) {
  const lowerStatus = (status || "").toLowerCase().trim();

  let badgeClasses = "";
  let Icon = FaCheckCircle; // default
  let label = "Active";

  switch (lowerStatus) {
    case "suspended":
      badgeClasses = "bg-(--status-suspended) text-white"; 
      Icon = FaUserSlash;
      label = "Suspended";
      break;

    case "banned":
      badgeClasses = "bg-(--status-blocked) text-red-400"; // লাল
      Icon = FaBan;
      label = "Banned";
      break;

    default:
      badgeClasses = "bg-(--status-active) text-green-500"; // গাঢ় ধূসর
      Icon = FaCheckCircle;
      label = "Active";
      break;
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 
        py-1 px-2.5
        rounded-md text-xs font-bold capitalize
        ${badgeClasses}
      `}
    >
      <Icon className="h-3 w-3.5" />
      {label}
    </span>
  );
}

export default BanStatusBadge;