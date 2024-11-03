// DropdownButton.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DropdownButton = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="mb-2">
      <button
        onClick={toggleDropdown}
        className="w-full bg-gray-600 text-white font-semibold py-2 px-3 text-left rounded-md hover:bg-gray-700 transition duration-300 ease-in-out flex items-center justify-between"
      >
        <span>{label}</span>
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-2"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="ml-4 mt-2 bg-gray-500 rounded-md p-2 shadow-md"
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="dropdown-item py-1 px-2 text-white hover:bg-gray-400 rounded-md transition duration-200 ease-in-out"
              >
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownButton;
