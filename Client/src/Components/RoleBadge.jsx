// src/components/RoleBadge.jsx
import React from "react";

// react-icons imports (যতটা দরকার ততটাই import করো – tree-shaking হয়)
import {
  FaShieldAlt, // admin
  FaUserShield, // systemAdmin
  FaTools, // developer
  FaUser, // guest / default
  FaHeadset, // support
  FaStar, // premium
  FaCrown, // ultimate
  FaBriefcase, // management
} from "react-icons/fa";
import { FaServer } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";


function RoleBadge({ role }) {
  const lowerRole = (role || "").toLowerCase().trim();

  let badgeClasses = "";
  let Icon = FaUser; // default icon

  switch (lowerRole) {
    case "management":
      badgeClasses = "bg-[#FF2424]  ";
      Icon = FaBriefcase;
      break;

    case "admin":
      badgeClasses = "bg-[#FF2424] ";
      Icon = FaTools;
      break;

    case "system dev":
      badgeClasses = "bg-[#FF2424] ";
      Icon = FaServer;
      break;

    case "developer":
      badgeClasses = "bg-[#e86100] ";
      Icon = FaCode;
      break;

    case "moderator":
      badgeClasses = "bg-purple-500";
      Icon = FaShieldAlt;
      break;

    case "support":
      badgeClasses = "bg-[#30b504]";
      Icon = FaHeadset; 
      break;
    case "guest":
      badgeClasses = "bg-[#cc7f04]";
      Icon = IoHeart;
      break;
    case "ultimate":
      badgeClasses = "bg-[#00A0D4]";
      Icon = FaCrown; 
      break
    case "premium":
      badgeClasses = "bg-[#00A9A1]";
      Icon = FaStar;
      break;

    default:
      badgeClasses = "bg-[#333e50] text-white! ";
      Icon = FaUser;
      break;
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 py-1 px-2.5
        rounded-md text-xs font-bold capitalize text-white
       ${badgeClasses}
      `}
    >
      <Icon className="h-3 w-3.5" />
      {role || "Member"}
    </span>
  );
}

export default RoleBadge;
