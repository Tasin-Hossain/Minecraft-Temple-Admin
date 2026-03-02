import React from 'react';

export const Input = ({ readOnly,label,className, placeholder,id, type = "text", ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-[14px] text-(--muted-text)">
          {label}
        </label>
      )}
      <input
        id={id}
        readOnly={readOnly}
        type={type}
        placeholder={placeholder}
        className={`block w-full rounded-md border bg-(--card-foreground) border-(--border) px-4 py-2.5 text-(--text-wh) placeholder-(--muted-text) outline-none focus:border-(--theme) read-only:cursor-not-allowed text-[14px] ${className}`}
        {...props}
      />
    </div>
  );
};