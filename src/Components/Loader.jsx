import React from 'react';

const Loader = ({
  size = 44,
  color = '', // indigo-500
  thickness = 4,
  speed = 0.8,
  label = '',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="relative"
        style={{
          width: size,
          height: size,
        }}
      >
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            border: `${thickness}px solid transparent`,
            borderTopColor: color,
            borderRightColor: color,
            borderBottomColor: color,
            borderLeftColor: 'transparent',
            animationDuration: `${speed}s`,
          }}
        />
        <div
          className="absolute inset-1.5 rounded-full animate-spin"
          style={{
            border: `${thickness}px solid transparent`,
            borderTopColor: 'transparent',
            borderRightColor: color,
            borderBottomColor: color,
            borderLeftColor: color,
            opacity: 0.4,
            animationDirection: 'reverse',
            animationDuration: `${speed * 1.4}s`,
          }}
        />
      </div>
      {label && <span className="text-sm text-gray-400">{label}</span>}
    </div>
  );
};

export default Loader;