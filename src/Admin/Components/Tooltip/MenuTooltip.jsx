import React from "react";

export function MenuTooltip({
  children,
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
        zIndex: 9999,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="
        relative
          bg-(--tooltip-bg)
        text-(--text-wh)
        px-2 py-2
        min-w-30
        rounded-md
        text-sm font-medium
        whitespace-nowrap transition
      "
    >
      <div className="pointer-events-none absolute inset-0 rounded-md border border-(--border)" />

      <div className="relative z-10 flex flex-col gap-2 ">
        {children}
      </div>
    </div>
  );
}
