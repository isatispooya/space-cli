import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AgreementPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  title?: string;
  description?: string;
  terms: string[];
  checkboxLabel?: string;
  cancelButtonText?: string;
  acceptButtonText?: string;
}

const AgreementPopup = ({
  isOpen,
  onClose,
  onAccept,

  title = "شرایط و قوانین",
  description = "لطفا شرایط و قوانین را مطالعه و تایید کنید:",
  terms,
  checkboxLabel = "من با شرایط و قوانین موافقم",
  cancelButtonText = "انصراف",
  acceptButtonText = "تایید",
}: AgreementPopupProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCancel = () => {
    setIsChecked(false);
    onClose();
    navigate('/underwriting/table');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl"
      >
        <h2 className="mb-6 text-2xl font-bold text-gray-800">{title}</h2>

        <div className="max-h-64 overflow-y-auto mb-6 text-gray-600 custom-scrollbar">
          <p className="mb-4 text-gray-500">{description}</p>
          <div className="space-y-3">
            {terms.map((term, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <p className="text-sm">{`${index + 1}. ${term}`}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="h-5 w-5 rounded border-2 border-gray-300 text-[#5677BC] 
                  focus:ring-[#5677BC] transition-colors peer"
              />
              {isChecked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0"
                />
              )}
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              {checkboxLabel}
            </span>
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 
              hover:bg-gray-100 rounded-lg transition-colors"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onAccept}
            disabled={!isChecked}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all
              ${
                isChecked
                  ? "bg-[#5677BC] hover:bg-[#4666AB] active:scale-95"
                  : "bg-blue-300 cursor-not-allowed opacity-70"
              }`}
          >
            {acceptButtonText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AgreementPopup;
