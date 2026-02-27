// Tooltip.jsx
import React, { useState } from 'react';

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 0,
  className = '',
}) => {
  const [show, setShow] = useState(false);
  let timeoutId;

  const showTooltip = () => {
    timeoutId = setTimeout(() => setShow(true), delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutId);
    setShow(false);
  };

  // position অনুযায়ী class
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'left-1/2 -translate-x-1/2 -bottom-1 border-t border-l',
    bottom: 'left-1/2 -translate-x-1/2 -top-1 border-b border-r',
    left: 'top-1/2 -translate-y-1/2 -right-1 border-l border-b',
    right: 'top-1/2 -translate-y-1/2 -left-1 border-r border-t',
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      {/* Tooltip box */}
      <div
        className={`
          pointer-events-none absolute z-50 whitespace-nowrap rounded-md
          bg-(--tooltip-bg) text-white text-sm font-medium
          px-3 py-1.5 shadow-lg backdrop-blur-sm
          transition-all duration-150
          ${show ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
          ${positionClasses[position] || positionClasses.top}
        `}
      >
        {content}

        {/* Arrow */}
        <div
          className={`
            absolute w-2 h-2 rotate-45 bg-(--tooltip-bg)
            border-(--tooltip-bg) ${arrowClasses[position] || arrowClasses.top}
          `}
        />
      </div>
    </div>
  );
};

export default Tooltip;