import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PositionBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-right">
      <button
        onClick={toggleDropdown}
        className=" text-white   font-semibold  text-sm px-6 py-3 text-center inline-flex items-center transition-transform transform  dark:bg-blue-600 dark:hover:bg-purple-700 dark:focus:ring-blue-800"
        type="button"
      >
        نقش
        <motion.svg
          className="w-3.5 h-3.5 ml-2 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 z-20 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <a
                  href="#"
                  className="block px-4 py-3 transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  مدیر
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-3 transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  کارمند
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-3 transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  کارگر
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-3 transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  سهامدار
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PositionBtn;
