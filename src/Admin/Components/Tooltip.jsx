import React from "react";

export default function Tooltip({
  children,
  position,
  hasChildren = false,
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
        bg-linear-to-b from-[#111] to-black
        text-white
        px-3 py-2
        rounded-lg
        min-w-40
        text-sm transition-all
      "
    >
      {/* 🔥 Arrow → ONLY if menu has NO children */}
      {!hasChildren && (
        <span
          className="
            absolute -left-1.5 top-1/2 -translate-y-1/2
            w-3 h-3
            bg-[#1a1919]
            rotate-45
          "
        />
      )}

      {/* Soft border */}
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-white/10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-1">
        {children}
      </div>
    </div>
  );
}
