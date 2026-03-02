import React, { useState } from "react";

const SimpleToggle = ({
  name,                 // ← খুব জরুরি তোমার ক্ষেত্রে
  checked,              // controlled value (form.twoFactorEnabled)
  defaultChecked = false,
  onChange,
  size = "md",
  disabled = false,
  label,
  className = "",
  id,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !currentChecked;

    // uncontrolled হলে state আপডেট করো
    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    // native input-এর মতো event object বানিয়ে onChange কল করো
    if (onChange) {
      onChange({
        target: {
          name: name || "toggle",
          type: "checkbox",
          checked: newChecked,
          value: newChecked ? "on" : "off", // optional, কিছু লাইব্রেরিতে লাগে
        },
      });
    }
  };

  // size অনুযায়ী style
  const sizeStyles = {
    sm: "w-8 h-4 after:h-3 after:w-3 after:top-[2px] after:start-[2px]",
    md: "w-11 h-6 after:h-5 after:w-5 after:top-0.5 after:start-0.5",
    lg: "w-14 h-7 after:h-6 after:w-6 after:top-0.5 after:start-0.5",
  };

  const toggleClasses = `
    peer-focus:outline-none 
    rounded-full 
    peer 
    bg-gray-200 
    dark:bg-gray-700 
    peer-checked:bg-(--theme)
    peer-checked:dark:bg-(--theme)
    after:content-[''] 
    after:absolute 
    after:bg-white 
    after:border-gray-300 
    after:border 
    after:rounded-full 
    after:transition-all 
    dark:after:border-gray-600
    peer-checked:after:translate-x-full 
    rtl:peer-checked:after:-translate-x-full
    ${sizeStyles[size] || sizeStyles.md}
  `;

  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={currentChecked}
        onChange={handleToggle}
        disabled={disabled}
        name={name}                    // ← form-এর জন্য জরুরি
        id={id}
        aria-label={label || "Toggle switch"}
      />

      <div className={toggleClasses} />

      {label && (
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
};

export default SimpleToggle;