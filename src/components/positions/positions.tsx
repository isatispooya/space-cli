import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDropDownLine } from "react-icons/ri";

const Position = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const roles = ["مدیر", "کارمند", "کارگر", "سهامدار"];

  return (
    <div className="relative inline-block text-right" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-[#02205F]  font-semibold text-sm px-6 py-3 text-center inline-flex items-center transition-transform transform dark:bg-blue-600 dark:hover:bg-purple-700 dark:focus:ring-blue-800"
        type="button"
        aria-expanded={isOpen}
      >
        نقش
        <motion.div
          className="w-3.5 h-3.5 ml-2 mr-2"
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <RiArrowDropDownLine />
        </motion.div>
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
              {roles.map((role, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="block px-2 py-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {role}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Position;
