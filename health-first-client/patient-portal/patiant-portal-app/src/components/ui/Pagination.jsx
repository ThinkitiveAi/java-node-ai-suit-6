import React from 'react';
import Button from './Button';

export default function Pagination({
  page = 1,
  pageSize = 11,
  total = 100,
  onPrev,
  onNext,
}) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded border border-gray-200 bg-white px-4 py-2 text-xs">
      <div className="text-gray-700">Showing {start} to {end} of {total} entries</div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onPrev}>Previous</Button>
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map((n) => (
            <div key={n} className={`grid h-6 w-6 place-items-center rounded ${n===page ? 'bg-[#233853] text-white' : 'text-gray-700'}`}>{String(n).padStart(2,'0')}</div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={onNext}>Next</Button>
      </div>
    </div>
  );
} 