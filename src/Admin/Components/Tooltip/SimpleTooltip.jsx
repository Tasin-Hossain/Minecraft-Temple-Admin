import React from "react";

export function SimpleTooltip({
  text,
  position,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        transform: "translateY(-50%)",
        zIndex: 9999,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="
        relative
        bg-(--tooltip-bg)
        text-(--text-wh)
        px-4 py-2
        rounded-md
        text-sm font-medium
        whitespace-nowrap 
      "
    >
      {/* Bubble Arrow */}
      <span
        className="
          absolute
          -left-1
          top-1/2
          -translate-y-1/2
          w-4 h-4
          bg-(--tooltip-bg)
          rotate-45
          rounded-sm
        "
      />

      {text}
    </div>
  );
}
