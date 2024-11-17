
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DropdownButton from "../../components/dropdown";

const ArrivalAndDeparture = () => {
  const [isParentOpen, setIsParentOpen] = useState(false);

  const toggleParentDropdown = () => setIsParentOpen(!isParentOpen);

  return (
    <div className="w-full">
      <button
        onClick={toggleParentDropdown}
        className="w-full bg-gray-700 text-white font-semibold py-2 px-4 text-left rounded-md hover:bg-gray-800 transition duration-300 ease-in-out flex items-center justify-between"
      >
        <span>ورود و خروج</span>
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: isParentOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-2"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isParentOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-2 ml-4"
          >
            <DropdownButton
              label="Arrival Times"
              items={["8:00 AM", "10:00 AM", "12:00 PM"]}
            />
            <DropdownButton
              label="Departure Times"
              items={["5:00 PM", "6:00 PM", "8:00 PM"]}
            />
            <DropdownButton
              label="Custom Times"
              items={["Select a Time", "10:30 AM", "4:15 PM"]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArrivalAndDeparture;
