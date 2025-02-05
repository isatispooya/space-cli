import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  disabled?: boolean;
}

const Accordion = ({
  title,
  children,
  isOpen = false,
  onToggle,
  disabled,
}: AccordionProps) => {
  const handleToggle = () => {
    if (!disabled && onToggle) {
      onToggle();
    }
  };

  console.log(disabled);

  return (
    <div className="border  border-gray-200 rounded-xl dark:border-gray-700">
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500   rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 ${
          disabled ? "bg-gray-300 cursor-not-allowed" : ""
        }`}
      >
        <span className="flex items-center">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <IoIosArrowDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-5  dark:border-gray-700 dark:bg-gray-900">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
