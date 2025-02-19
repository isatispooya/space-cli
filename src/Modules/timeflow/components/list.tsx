import React, { useState } from "react";
import moment from "moment-jalaali";
import { motion } from "framer-motion";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";

interface Log {
  id: number;
  user: {
    first_name: string;
    last_name: string;
  };
  time_parent: string;
  type: "login" | "logout";
}

interface LogListProps {
  logs: Log[];
  onAccept: (logId: number, selectedTime: Dayjs) => void;
}

const LogList: React.FC<LogListProps> = ({ logs, onAccept }) => {
  const [selectedTimes, setSelectedTimes] = useState<{
    [key: number]: Dayjs | null;
  }>({});

  const handleTimeChange = (id: number, newTime: Dayjs | null) => {
    setSelectedTimes((prev) => ({ ...prev, [id]: newTime }));
  };

  const handleAccept = (logId: number) => {
    const selectedTime = selectedTimes[logId];
    if (!selectedTime) {
      alert("لطفاً زمان معتبری انتخاب کنید.");
      return;
    }
    onAccept(logId, selectedTime);
  };

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <motion.div
          key={log.id}
          className="flex flex-wrap items-center justify-between gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex flex-col space-y-1">
            <span className="text-lg font-medium text-gray-800">
              {log.user.first_name} {log.user.last_name}
            </span>
            <span className="text-sm text-gray-600">
              {moment(log.time_parent).format("jYYYY/jMM/jDD HH:mm")}
            </span>

            <span className="text-sm text-gray-600">
              {log.type === "login" ? "ورود" : "خروج"}
            </span>
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label=""
              value={selectedTimes[log.id] || null}
              onChange={(newTime) => handleTimeChange(log.id, newTime)}
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
            onClick={() => handleAccept(log.id)}
            className="py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            تایید
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};

export default LogList;
