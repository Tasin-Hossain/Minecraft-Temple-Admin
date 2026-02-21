import React from 'react';

export const Input = ({ label,className, placeholder,id, type = "text", ...props }) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-[14px] opacity-90">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`block w-full rounded-md border bg-(--card-foreground) border-(--border) px-4 py-2.5 text-(--text) placeholder-(--muted-text) outline-none focus:border-(--theme) text-[14px] ${className}`}
        {...props}
      />
    </div>
  );
};