import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";
import toast from "react-hot-toast";
import dayjs from "dayjs";

interface LogListProps {
  onAccept: (selectedTime: Dayjs) => void;
}

const LogoutList: React.FC<LogListProps> = ({ onAccept }) => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  useEffect(() => {
    setSelectedTime(dayjs());
  }, []);

  const handleTimeChange = (newTime: Dayjs | null) => {
    setSelectedTime(newTime);
  };

  const handleAccept = () => {
    if (!selectedTime) {
      toast.error("لطفاً زمان معتبری انتخاب کنید.");
      return;
    }
    onAccept(selectedTime);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="زمان خروج"
            value={selectedTime || null}
            onChange={handleTimeChange}
            slotProps={{
              textField: {
                size: "small",
                className: "w-36",
                sx: {
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    borderColor: "#d1d5db",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "8px 12px",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAccept}
          className="py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
        >
          تایید
        </motion.button>
      </div>
    </div>
  );
};

export default LogoutList;
