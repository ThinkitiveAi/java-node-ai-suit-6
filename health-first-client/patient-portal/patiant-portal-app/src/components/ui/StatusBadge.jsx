import React from 'react';

const styles = {
  scheduled: 'bg-[#F6F8FB] text-[#5980BF] ring-1 ring-[#5980BF]',
  'checked-in': 'bg-[#FEFAFF] text-[#E8A6FF] ring-1 ring-[#E8A6FF]',
  'in-exam': 'bg-[#F7F6FF] text-[#6B58FF] ring-1 ring-[#6B58FF]',
  cancelled: 'bg-[#FEF2F2] text-[#EC2020] ring-1 ring-[#EC2020]',
};

export default function StatusBadge({ status = 'scheduled', children }) {
  const key = status.toLowerCase();
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${styles[key] || styles.scheduled}`}>
      {children || status}
    </span>
  );
} 