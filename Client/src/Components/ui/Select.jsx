import React from 'react';
import countryList from 'react-select-country-list';



export const Select = ({ label, id, options, ...props }) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-[14px] opacity-90">
          {label}
        </label>
      )}
      <select
        id={id}
        className="block w-full rounded-md border bg-(--card-foreground) border-(--border) px-4 py-2.5 text-(--text) placeholder-(--muted-text) outline-none focus:border-(--theme) text-[14px]"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};