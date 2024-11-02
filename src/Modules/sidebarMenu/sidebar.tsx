import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <motion.div
      dir="rtl"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-[300px] bg-gradient-to-b from-gray-100 to-gray-300 shadow-xl z-30 rounded-l-2xl"
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-400">
        <h2 className="text-xl text-gray-800 font-bold">ابزار ها</h2>
        <button
          onClick={toggleSidebar}
          className="text-gray-800 text-3xl hover:text-red-500 transition duration-300"
        >
          <MdClose />
        </button>
      </div>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-col space-y-6 p-6"
      >
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <a
            href="#"
            className="text-gray-800 text-lg font-medium hover:text-gray-600"
          >
            صفحه اصلی
          </a>
        </motion.li>
        <motion.li>
          <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-800 text-lg font-medium hover:text-gray-600 focus:outline-none"
          >
            درباره ما
            <FaChevronDown
              className={`ml-2 transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isDropdownOpen && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-2 ml-4 space-y-4"
            >
              <li>
                <a
                  href="#"
                  className="text-gray-700 text-md hover:text-gray-500"
                >
                  تاریخچه ما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 text-md hover:text-gray-500"
                >
                  تیم ما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 text-md hover:text-gray-500"
                >
                  چشم‌انداز ما
                </a>
              </li>
            </motion.ul>
          )}
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <a
            href="#"
            className="text-gray-800 text-lg font-medium hover:text-gray-600"
          >
            خدمات
          </a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <a
            href="#"
            className="text-gray-800 text-lg font-medium hover:text-gray-600"
          >
            تماس
          </a>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default Sidebar;
