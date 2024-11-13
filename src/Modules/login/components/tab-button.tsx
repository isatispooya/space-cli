import * as React from "react";
import { motion } from "framer-motion";

interface TabButtonProps {
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
}

const TabButton: React.FC<TabButtonProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center mb-4 mr-8 space-x-4 md:space-x-6">
      <motion.button
        className={` py-2 px-4 md:py-3 md:px-6  transition-all duration-300 ease-in-out  ${
          activeTab === "login"
            ? " text-black border-b-2 border-gray-900 "
            : " text-black  "
        }`}
        onClick={() => onTabChange("login")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ورود
      </motion.button>
      <motion.button
        className={`py-2 px-4 md:py-3 md:px-6 transition-all duration-300 ease-in-out   ${
          activeTab === "signup"
            ? " text-black border-b-2 border-gray-900 "
            : " text-black  "
        }`}
        onClick={() => onTabChange("signup")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ثبت نام
      </motion.button>
    </div>
  );
};

export default TabButton;
