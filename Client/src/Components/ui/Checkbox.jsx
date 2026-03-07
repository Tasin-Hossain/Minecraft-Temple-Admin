import React, { useId } from 'react';

export const Checkbox = ({
  id: providedId,
  label,
  checked,
  onChange,
  className = '',
  ...props
}) => {
  // useId() is perfect for accessibility & uniqueness
  const generatedId = useId();
  const finalId = providedId || generatedId;

  return (
    <label
      htmlFor={finalId}
      className={`flex items-center cursor-pointer select-none ${className}`}
    >
      <div className="relative inline-block">
        <input
          id={finalId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer absolute opacity-0 w-0 h-0"
          {...props}
        />

        {/* Custom checkbox box */}
        <div
          className={`
            w-4 h-4
            bg-transparent 
            border-2 border-(--border) rounded
            transition-all duration-200
            peer-checked:bg-(--theme)
            peer-checked:border-(--theme)
            peer-focus:ring-2 peer-focus:ring-(--theme)/30
          `}
        />

        {/* Checkmark */}
        <svg
          className={`
            absolute inset-0 w-4 h-4 pointer-events-none
            opacity-0 peer-checked:opacity-100 transition-opacity duration-200
          `}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {label && (
        <span className="ml-2.5 text-sm text-(--muted-text)">
          {label}
        </span>
      )}
    </label>
  );
};