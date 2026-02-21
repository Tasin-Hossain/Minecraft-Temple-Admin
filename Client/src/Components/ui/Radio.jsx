import React from 'react';

export const Radio = ({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
  icon: Icon,       
  title,         
  ...props
}) => {
  return (
    <div className="group relative flex items-start gap-2 py-1.5">
      {/* Radio input + custom circle */}
      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
        <input
          id={id}
          name={name}
          type="radio"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            peer absolute inset-0 h-full w-full cursor-pointer opacity-0
            disabled:cursor-not-allowed
          `}
          {...props}
        />

        {/* Visual radio circle */}
        <div className={`
          h-4.5 w-4.5 rounded-full border-2 transition-all duration-200
          ${disabled 
            ? 'border-(--theme) bg-gray-100 opacity-60' 
            : 'border-(--theme) group-hover:border-gray-500'
          }
          peer-checked:border-(--theme) peer-checked:bg-(--theme)
        `}>
          {/* Inner dot when checked */}
          <div className={`
            absolute inset-0 m-auto h-2.5 w-2.5 scale-0 rounded-full bg-(--text)
            transition-transform duration-200
            peer-checked:scale-100
          `} />
        </div>
      </div>

      {/* Label + icon + title area */}
      <div className="flex min-w-0 flex-1 items-start gap-2">
        {Icon && (
          <div className={`
            mt-0.5 text-xl 
            ${disabled ? 'text-gray-400' : ' group-hover:text-(--theme)'}
            transition-colors
          `}>
            <Icon />
          </div>
        )}

        <div className="flex flex-col">
          <label
            htmlFor={id}
            className={`
              select-none font-medium leading-6
              ${disabled 
                ? 'cursor-not-allowed text-gray-400' 
                : 'cursor-pointer text-[14px] group-hover:text-(--theme)'
              }
              transition-colors
            `}
          >
            {label}
          </label>

          {title && (
            <p className={`
              ${disabled ? '' : ''}
            `}>
              {title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};