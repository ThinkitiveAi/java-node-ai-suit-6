import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-2xl' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            aria-hidden="true"
            onClick={onClose}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              className={`w-full ${maxWidth} bg-white rounded-lg shadow-2xl overflow-hidden`}
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            >
              {title && (
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 id="modal-title" className="text-base font-semibold text-gray-900">{title}</h2>
                </div>
              )}
              <div className="p-4">{children}</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 