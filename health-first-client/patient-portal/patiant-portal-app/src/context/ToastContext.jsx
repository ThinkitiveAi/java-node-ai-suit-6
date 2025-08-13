import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext({ enqueueToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const enqueueToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const ttl = toast.ttl ?? 3000;
    setToasts((prev) => [...prev, { id, ...toast }]);
    if (ttl > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, ttl);
    }
  }, []);

  const remove = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  const value = useMemo(() => ({ enqueueToast }), [enqueueToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-2 z-[100] mx-auto flex max-w-md flex-col gap-2 px-2">
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = icons[t.variant || 'info'] || Info;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`pointer-events-auto flex items-start gap-2 rounded-md border px-3 py-2 shadow-lg ${
                  t.variant === 'success'
                    ? 'border-green-200 bg-green-50 text-green-800'
                    : t.variant === 'error'
                    ? 'border-red-200 bg-red-50 text-red-800'
                    : 'border-blue-200 bg-blue-50 text-blue-800'
                }`}
              >
                <Icon className="mt-0.5 h-4 w-4" />
                <div className="min-w-0">
                  {t.title && <div className="truncate text-sm font-semibold">{t.title}</div>}
                  {t.message && <div className="truncate text-xs opacity-90">{t.message}</div>}
                </div>
                <button
                  onClick={() => remove(t.id)}
                  className="ml-auto rounded p-1 text-current/80 hover:bg-black/5"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
} 