import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import dayjs from "dayjs";

interface TimePickerProps {
  value?: string | Date | dayjs.Dayjs | null;
  onChange?: (time: string | Date) => void;
  is24Hour?: boolean;
  className?: string;
  minuteStep?: number;
  label?: string;
  returnDateObject?: boolean;
  saveButtonText?: string;
  cancelButtonText?: string;
}
// do not use this component   _________________________________________________________________
const TimePicker: React.FC<TimePickerProps> = ({
  value = "",
  onChange,
  is24Hour = true,
  className = "",
  minuteStep = 1,
  label = "",
  returnDateObject = false,
  saveButtonText = "ذخیره",
  cancelButtonText = "انصراف",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [period, setPeriod] = useState<"AM" | "PM">("PM");
  const timePickerRef = useRef<HTMLDivElement>(null);
  const hoursContainerRef = useRef<HTMLDivElement>(null);
  const minutesContainerRef = useRef<HTMLDivElement>(null);
  const selectedHourRef = useRef<HTMLDivElement>(null);
  const selectedMinuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value) return;

    let dateValue: Date;

    if (typeof value === "string") {
      // اضافه کردن بررسی برای فرمت‌های مختلف
      if (value.includes(".")) {
        // اگر فرمت به صورت "2025.05" باشد
        const [hourStr, minuteStr] = value.split(".");
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        setSelectedHour(hour);
        setSelectedMinute(minute);
        if (!is24Hour) {
          setPeriod(hour >= 12 ? "PM" : "AM");
        }
      } else {
        // فرمت استاندارد "HH:MM" یا "HH:MM AM/PM"
        const [timeStr, periodStr] = value.split(" ");
        const [hourStr, minuteStr] = timeStr.split(":");

        let hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);

        if (!is24Hour && periodStr) {
          setPeriod(periodStr as "AM" | "PM");
          if (periodStr === "PM" && hour < 12) hour += 12;
          if (periodStr === "AM" && hour === 12) hour = 0;
        }

        setSelectedHour(hour);
        setSelectedMinute(minute);
      }
    } else if (value instanceof Date) {
      dateValue = value;
      setSelectedHour(dateValue.getHours());
      setSelectedMinute(dateValue.getMinutes());
      setPeriod(dateValue.getHours() >= 12 ? "PM" : "AM");
    } else if (dayjs.isDayjs(value)) {
      dateValue = value.toDate();
      setSelectedHour(dateValue.getHours());
      setSelectedMinute(dateValue.getMinutes());
      setPeriod(dateValue.getHours() >= 12 ? "PM" : "AM");
    }
  }, [value, is24Hour]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getFormattedTime = useCallback(() => {
    let hour = selectedHour;

    if (!is24Hour) {
      if (period === "PM" && hour < 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;
    }

    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = selectedMinute.toString().padStart(2, "0");

    if (returnDateObject) {
      const now = new Date();
      now.setHours(hour);
      now.setMinutes(selectedMinute);
      now.setSeconds(0);
      return now;
    } else {
      return is24Hour
        ? `${formattedHour}:${formattedMinute}`
        : `${formattedHour}:${formattedMinute} ${period}`;
    }
  }, [selectedHour, selectedMinute, period, is24Hour, returnDateObject]);

  const toggleTimePicker = () => {
    setIsOpen(!isOpen);
  };

  const handleHourChange = (hour: number) => {
    setSelectedHour(hour);
  };

  const handleMinuteChange = (minute: number) => {
    setSelectedMinute(minute);
  };

  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    setPeriod(newPeriod);
  };

  const handleSave = () => {
    if (onChange) {
      onChange(getFormattedTime());
    }
    setIsOpen(false);
  };

  // Generate hours based on 12/24 hour format
  const hours = is24Hour
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => i + 1);

  // Generate minutes based on step
  const minutes = Array.from(
    { length: Math.floor(60 / minuteStep) },
    (_, i) => i * minuteStep
  );

  // Format display time
  const getDisplayTime = () => {
    let hour = selectedHour;

    if (!is24Hour) {
      if (hour === 0) hour = 12;
      if (hour > 12) hour = hour - 12;
    }

    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = selectedMinute.toString().padStart(2, "0");

    return is24Hour
      ? `${formattedHour}:${formattedMinute}`
      : `${formattedHour}:${formattedMinute} ${period}`;
  };

  // Scroll to selected hour and minute when dropdown opens
  useEffect(() => {
    if (isOpen) {
      // Use setTimeout to ensure the DOM has been updated
      setTimeout(() => {
        if (selectedHourRef.current && hoursContainerRef.current) {
          const container = hoursContainerRef.current;
          const element = selectedHourRef.current;

          // Calculate the scroll position to center the selected element
          const containerHeight = container.clientHeight;
          const elementTop = element.offsetTop;
          const elementHeight = element.clientHeight;

          container.scrollTop =
            elementTop - containerHeight / 2 + elementHeight / 2;
        }

        if (selectedMinuteRef.current && minutesContainerRef.current) {
          const container = minutesContainerRef.current;
          const element = selectedMinuteRef.current;

          // Calculate the scroll position to center the selected element
          const containerHeight = container.clientHeight;
          const elementTop = element.offsetTop;
          const elementHeight = element.clientHeight;

          container.scrollTop =
            elementTop - containerHeight / 2 + elementHeight / 2;
        }
      }, 50);
    }
  }, [isOpen]);

  return (
    <div ref={timePickerRef} className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {/* Time Input Display - Minimal Design */}
      <motion.div
        onClick={toggleTimePicker}
        className="flex items-center justify-center px-4 py-2 bg-white text-gray-800 rounded-md cursor-pointer border border-gray-200 transition-all"
        whileHover={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          borderColor: "#5677BC",
          scale: 1.01,
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-center font-medium">{getDisplayTime()}</span>
      </motion.div>

      {/* Time Picker Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-1 bg-white rounded-md shadow-lg overflow-hidden"
            style={{ width: "100%", minWidth: "220px" }}
          >
            <div className="flex justify-between p-2 border-b border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors"
              >
                {cancelButtonText}
              </button>
              <button
                onClick={handleSave}
                className="text-[#5677BC] text-sm font-medium hover:text-gray-800 transition-colors"
              >
                {saveButtonText}
              </button>
            </div>

            <div className="flex justify-center p-2">
              {/* Minutes Column */}
              <div className="flex flex-col items-center mx-2 relative">
                <button
                  className="text-gray-600 hover:text-gray-800 p-1"
                  onClick={() => {
                    const index = minutes.indexOf(selectedMinute);
                    const prevIndex =
                      (index - 1 + minutes.length) % minutes.length;
                    handleMinuteChange(minutes[prevIndex]);
                  }}
                >
                  <FaChevronUp className="w-4 h-4" />
                </button>

                <div
                  ref={minutesContainerRef}
                  className="h-32 overflow-y-scroll no-scrollbar relative"
                >
                  <div className="flex flex-col items-center justify-start py-2">
                    {minutes.map((minute) => (
                      <motion.div
                        key={minute}
                        ref={
                          selectedMinute === minute ? selectedMinuteRef : null
                        }
                        className={`py-1 px-3 my-1 rounded-md cursor-pointer ${
                          selectedMinute === minute
                            ? "bg-[#5677BC] text-white font-bold"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                        onClick={() => handleMinuteChange(minute)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {minute.toString().padStart(2, "0")}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <button
                  className="text-gray-600 hover:text-gray-800 p-1"
                  onClick={() => {
                    const index = minutes.indexOf(selectedMinute);
                    const nextIndex = (index + 1) % minutes.length;
                    handleMinuteChange(minutes[nextIndex]);
                  }}
                >
                  <FaChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center text-gray-800 font-bold">:</div>

              {/* Hours Column */}
              <div className="flex flex-col items-center mx-2 relative">
                <button
                  className="text-gray-600 hover:text-gray-800 p-1"
                  onClick={() => {
                    const index = hours.indexOf(selectedHour);
                    const prevIndex = (index - 1 + hours.length) % hours.length;
                    handleHourChange(hours[prevIndex]);
                  }}
                >
                  <FaChevronUp className="w-4 h-4" />
                </button>

                <div
                  ref={hoursContainerRef}
                  className="h-32 overflow-y-scroll no-scrollbar relative"
                >
                  <div className="flex flex-col items-center justify-start py-2">
                    {hours.map((hour) => (
                      <motion.div
                        key={hour}
                        ref={selectedHour === hour ? selectedHourRef : null}
                        className={`py-1 px-3 my-1 rounded-md cursor-pointer ${
                          selectedHour === hour
                            ? "bg-[#5677BC] text-white font-bold"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                        onClick={() => handleHourChange(hour)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {hour.toString().padStart(2, "0")}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <button
                  className="text-gray-600 hover:text-gray-800 p-1"
                  onClick={() => {
                    const index = hours.indexOf(selectedHour);
                    const nextIndex = (index + 1) % hours.length;
                    handleHourChange(hours[nextIndex]);
                  }}
                >
                  <FaChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* AM/PM Column (only for 12-hour format) */}
              {!is24Hour && (
                <div className="flex flex-col items-center mx-2">
                  <motion.div
                    className={`py-1 px-3 my-1 rounded-md cursor-pointer ${
                      period === "AM"
                        ? "bg-[#5677BC] text-white font-bold"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    onClick={() => handlePeriodChange("AM")}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    AM
                  </motion.div>
                  <motion.div
                    className={`py-1 px-3 my-1 rounded-md cursor-pointer ${
                      period === "PM"
                        ? "bg-[#5677BC] text-white font-bold"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    onClick={() => handlePeriodChange("PM")}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    PM
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimePicker;
