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
  width = 'w-auto',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedText = value || placeholder;

  return (
    <div className={`relative inline-block text-left ${className}`} ref={ref}>
      <button
        type="button"
        disabled={disabled}
        className={`
          inline-flex w-full justify-between items-center gap-2
          rounded-md border border-(--border) bg-(--card-foreground) 
          px-4 py-2.5 text-sm font-medium text-(--muted-text)
           hover:border-(--theme) cursor-pointer transition
          disabled:opacity-60 disabled:cursor-not-allowed
          ${triggerClassName}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="truncate">{selectedText}</span>
        <svg className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`
            absolute left-0 z-50 mt-2 ${width}
            rounded-md bg-(--card-foreground) border border-(--border)
            max-h-auto overflow-y-hidden
            ${menuClassName}
          `}
        >
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-(--muted-text)">
              No options available
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option}
                type="button"
                className={`
                  w-full text-left px-4 py-2.5 text-sm cursor-pointer
                  ${option === value ? 'bg-(--hover) text-(--theme)' : 'text-(--muted-text) hover:bg-(--hover)'}
                  ${itemClassName}
                `}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
                {option === value && <span className="float-right">✓</span>}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}