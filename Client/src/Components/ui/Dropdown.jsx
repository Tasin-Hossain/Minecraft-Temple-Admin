// components/Dropdown.js
import React, { useState, useRef, useEffect } from 'react';

export default function Dropdown({
  options = [],
  value = '',
  onChange = () => {},
  placeholder = 'Select an option',
  className = '',
  triggerClassName = '',
  menuClassName = '',
  itemClassName = '',
  disabled = false,
  width = 'w-56',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedText = value || placeholder;

  return (
    <div className={`relative inline-block text-left ${className}`} ref={ref}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        className={`
          inline-flex w-full justify-between items-center gap-2
          rounded-lg border border-gray-300 bg-white 
          px-4 py-2.5 text-sm font-medium text-gray-900
          shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          transition-all duration-150
          disabled:opacity-60 disabled:cursor-not-allowed
          ${triggerClassName}
        `}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        <span className="truncate">{selectedText}</span>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute right-0 z-10 mt-2 ${width} origin-top-right
            rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5
            focus:outline-none transform transition-all duration-150
            scale-95 opacity-0 animate-in fade-in zoom-in-95
            ${menuClassName}
          `}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={`
                  group flex w-full items-center px-4 py-2.5 text-sm
                  ${option === value
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                  transition-colors duration-100
                  ${itemClassName}
                `}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
                {option === value && (
                  <span className="ml-auto text-indigo-600 group-hover:text-indigo-700">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}