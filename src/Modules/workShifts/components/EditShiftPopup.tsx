import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment-jalaali";
import { shiftTypes } from "../types";
import { createPortal } from "react-dom";

interface EditShiftPopupProps {
  shift: shiftTypes;
  onClose: () => void;
  onSave: (updatedShift: shiftTypes) => void;
}

const EditShiftPopup = ({ shift, onClose, onSave }: EditShiftPopupProps) => {
  const [editedShift, setEditedShift] = useState(shift);

  const handleSave = useCallback(() => {
    onSave(editedShift);
  }, [editedShift, onSave]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
        onClick={handleBackdropClick}
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
          style={{ position: "relative", zIndex: 10000 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
            <h2 className="text-xl font-bold text-white">ویرایش شیفت</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاریخ
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={moment(editedShift.date).format("jYYYY/jMM/jDD")}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    readOnly
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="fas fa-calendar"></i>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  زمان شروع
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={editedShift.start_time}
                    onChange={(e) =>
                      setEditedShift({
                        ...editedShift,
                        start_time: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="fas fa-clock"></i>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  زمان پایان
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={editedShift.end_time}
                    onChange={(e) =>
                      setEditedShift({
                        ...editedShift,
                        end_time: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="fas fa-clock"></i>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="work_day"
                  checked={editedShift.work_day}
                  onChange={(e) =>
                    setEditedShift({
                      ...editedShift,
                      work_day: e.target.checked,
                    })
                  }
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
                />
                <label
                  htmlFor="work_day"
                  className="text-sm font-medium text-gray-700"
                >
                  روز کاری
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                انصراف
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                ذخیره تغییرات
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default EditShiftPopup;
