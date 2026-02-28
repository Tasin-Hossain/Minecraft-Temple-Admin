

import React from "react";
import { MdCheck, MdClose } from "react-icons/md";

const YesNoBadge = ({ value, withIcon = true, size = "default", className = "" }) => {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs gap-1",
    default: "px-1.5 py-0.5 text-[14px] gap-1",
    lg: "px-4 py-1.5 text-base gap-2",
  }[size] || "px-3 py-1 text-sm gap-1.5";

  return (
    <span
      className={`
        inline-flex items-center  rounded-md
        ${value 
          ? "bg-green-500 text-(--text-wh)" 
          : "bg-red-400 text-(--text-wh) "}
        ${sizeStyles}
        ${className}
      `}
    >
      {withIcon && (
        value ? <MdCheck className="text-green-200" /> : <MdClose className="text-red-200" />
      )}
      <span>{value ? "Yes" : "No"}</span>
    </span>
  );
};

export default YesNoBadge;