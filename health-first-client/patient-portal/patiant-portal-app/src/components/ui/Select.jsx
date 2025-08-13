import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({ label, helper, options = [], value, onChange, placeholder, id, className = '', ...props }) {
  const selectId = id || `select-${Math.random().toString(36).slice(2)}`;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
      </div>
      {helper && <p className="mt-1 text-xs text-gray-500">{helper}</p>}
    </div>
  );
} 