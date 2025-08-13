import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

export default function SearchableCombobox({
  label = 'Select',
  placeholder = 'Search...',
  items = [], // [{ id, label, subLabel, avatar }]
  value,
  onChange,
  className = '',
  emptyText = 'No results',
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((i) => i.label.toLowerCase().includes(q) || (i.subLabel?.toLowerCase().includes(q)));
  }, [items, query]);

  useEffect(() => {
    if (!open) setActiveIndex(-1);
  }, [open]);

  const commit = (item) => {
    onChange?.(item);
    setQuery('');
    setOpen(false);
    inputRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true);
      e.preventDefault();
      return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') {
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((i) => Math.max(i - 1, 0));
      e.preventDefault();
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      commit(filtered[activeIndex]);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setOpen(false);
      e.preventDefault();
    }
  };

  const activeId = activeIndex >= 0 ? `cb-option-${filtered[activeIndex]?.id}` : undefined;

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="mb-1 block text-xs font-medium text-[#565656]">{label}</label>}
      <div className="relative">
        <div
          className={`flex items-center rounded border border-black/10 bg-white px-2 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary-500`}
        >
          <Search className="mr-1 h-4 w-4 text-gray-500" aria-hidden="true" />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded={open}
            aria-controls="cb-listbox"
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            placeholder={placeholder}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
          <button
            type="button"
            aria-label="Toggle options"
            onClick={() => setOpen((o) => !o)}
            className="ml-2 rounded p-1 text-gray-600 hover:bg-gray-100"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.ul
              id="cb-listbox"
              role="listbox"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg"
            >
              {filtered.length === 0 && (
                <li className="px-2 py-2 text-sm text-gray-500">{emptyText}</li>
              )}
              {filtered.map((item, idx) => (
                <li
                  id={`cb-option-${item.id}`}
                  key={item.id}
                  role="option"
                  aria-selected={value?.id === item.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => commit(item)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm ${
                    idx === activeIndex ? 'bg-primary-50' : 'hover:bg-gray-50'
                  }`}
                >
                  {item.avatar ? (
                    <img src={item.avatar} alt="" className="h-6 w-6 rounded-full" />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-gray-200" />
                  )}
                  <div className="min-w-0">
                    <div className="truncate font-medium text-gray-900">{item.label}</div>
                    {item.subLabel && (
                      <div className="truncate text-xs text-gray-500">{item.subLabel}</div>
                    )}
                  </div>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 