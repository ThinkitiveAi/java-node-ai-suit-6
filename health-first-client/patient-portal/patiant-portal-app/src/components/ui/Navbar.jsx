import React from 'react';

const menuItems = ['Dashboard', 'Scheduling', 'Patients', 'Communications', 'Billing', 'Referral', 'Reports', 'Settings'];

export default function Navbar({ active = 'Scheduling' }) {
  return (
    <nav className="sticky top-0 z-40 w-full bg-[#233853] text-white">
      <div className="mx-auto flex h-10 w-full max-w-screen-2xl items-center gap-3 px-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-white" aria-hidden="true" />
          <span className="text-sm font-medium">Sample EMR</span>
        </div>
        <div className="mx-4 hidden flex-1 items-center gap-3 overflow-x-auto no-scrollbar sm:flex">
          {menuItems.map((item) => {
            const isActive = item === active;
            return (
              <div key={item} className={`relative px-2 py-1 text-xs ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`}>
                {item}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-white" />
                )}
              </div>
            );
          })}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="h-5 w-px bg-white/30" />
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-white/80" />
            <div className="h-5 w-5 rounded-full bg-white/80" />
            <div className="h-5 w-5 rounded-full bg-white/80" />
          </div>
        </div>
      </div>
    </nav>
  );
} 