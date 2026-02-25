import React from 'react';

export const Checkbox = ({
  id = 'custom-checkbox',
  label,
  defaultChecked = false,
  checked,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center cursor-pointer select-none ${className}`}
    >
      <div className="relative inline-block">
        <input
          id={id}
          type="checkbox"
          defaultChecked={defaultChecked}
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
            border-2 border-(--theme) rounded-sm 
            transition-all duration-250
            peer-checked:bg-(--theme)
            peer-checked:border-(--theme)
          `}
        />

        {/* Checkmark (using borders) */}
        <div
          className={`
            absolute inset-0 
            after:content-[''] 
            after:absolute 
            after:left-0 after:top-0 
            after:w-[1.05em] after:h-[1.05em] 
            after:rounded-md 
            after:border-0 
            after:border-solid 
            after:border-(--theme) 
            after:transition-all after:duration-250 after:delay-100
            peer-checked:after:left-[0.35em] 
            peer-checked:after:top-[0.1em] 
            peer-checked:after:w-[0.35em] 
            peer-checked:after:h-[0.7em] 
            peer-checked:after:border-0 
            peer-checked:after:border-r-[0.15em] 
            peer-checked:after:border-b-[0.15em] 
            peer-checked:after:border-white
            peer-checked:after:rotate-45 
            peer-checked:after:bor 
            peer-checked:after:border-t-0
          `}
        />
      </div>

      {label && (
        <span className="ml-2 text-[14px] text-(--muted-text)">
          {label}
        </span>
      )}
    </label>
  );
};