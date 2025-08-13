import React from 'react';

const styles = {
  scheduled: 'bg-blue-50 text-blue-600 ring-1 ring-blue-600',
  'checked-in': 'bg-purple-50 text-purple-600 ring-1 ring-purple-600',
  'in-exam': 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-600',
  cancelled: 'bg-red-100 text-red-600 ring-1 ring-red-600',
};

export default function StatusBadge({ status = 'scheduled', children }) {
  const key = status.toLowerCase();
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${styles[key] || styles.scheduled}`}>
      {children || status}
    </span>
  );
} 