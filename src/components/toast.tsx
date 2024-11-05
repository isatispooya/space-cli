// src/components/Toast.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "../../store/toastStore";

const Toast: React.FC = () => {
  const { message, icon, isVisible } = useToastStore();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="flex p-4">
            <div className="shrink-0">{icon}</div>
            <div className="ms-3">
              <p className="text-sm text-gray-700 dark:text-neutral-400">
                {message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
