import { motion, AnimatePresence } from "framer-motion";
import LogoutList from "../../../Modules/timeflow/components/logout.list";
import { useEffect, useRef } from "react";
import { useTimeflow } from "@/Modules/timeflow/hooks";

const VerifyLogoutPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const popupRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;

      // Check if click is on MUI components
      const isMuiComponent =
        target.closest(".MuiPickersPopper-root") ||
        target.closest(".MuiDialog-root") ||
        target.closest(".MuiPaper-root") ||
        target.closest(".MuiBackdrop-root") ||
        target.closest(".MuiPopover-root") ||
        target.closest(".MuiModal-root");

      // If clicking on MUI component, prevent any closing
      if (isMuiComponent) {
        e.stopPropagation();
        return;
      }

      // If clicking outside popup and not on MUI component, close
      if (
        popupRef.current &&
        !popupRef.current.contains(target as Node) &&
        !isMuiComponent
      ) {
        onClose();
      }
    };

    if (isOpen) {
      // Use capture phase to intercept events before they reach other handlers
      document.addEventListener("mousedown", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            ref={popupRef}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                ثبت زمان خروج
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>
            <LogoutList onAccept={() => {}} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VerifyLogoutPopup;
