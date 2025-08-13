import React from 'react';

export function Table({ children, className = '' }) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  );
}

export function THead({ children }) {
  return (
    <thead className="bg-[#E7E7E7] text-gray-700">
      {children}
    </thead>
  );
}

export function TH({ children, className = '' }) {
  return (
    <th className={`px-3 py-2 text-left text-sm font-medium ${className}`}>{children}</th>
  );
}

export function TBody({ children }) {
  return <tbody className="bg-white">{children}</tbody>;
}

export function TR({ children, className = '' }) {
  return <tr className={`border-b border-gray-200 ${className}`}>{children}</tr>;
}

export function TD({ children, className = '' }) {
  return <td className={`px-3 py-2 text-sm text-gray-700 ${className}`}>{children}</td>;
} 