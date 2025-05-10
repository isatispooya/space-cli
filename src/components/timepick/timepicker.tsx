import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface TimePickerPropsType {
  label?: string;
  initialValue?: Date | null;
  onChange?: (date: Date | null) => void;
  className?: string;
  direction?: "ltr" | "rtl";
}

const DynamicTimePicker = ({
  label = "انتخاب زمان",
  initialValue = null,
  onChange,
  className = "",
  direction = "ltr",
}: TimePickerPropsType) => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(
    initialValue ? dayjs(initialValue) : null
  );

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":");
    const newTime = dayjs().hour(parseInt(hours)).minute(parseInt(minutes));
    setSelectedTime(newTime);
    if (onChange) {
      onChange(newTime.toDate());
    }
  };

  return (
    <div className={`w-full max-w-sm min-w-[160px] mt-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-500 mb-1">
          {label}
        </label>
      )}
      <input
        type="time"
        dir={direction}
        className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded pl-8 pr-2 py-2 transition duration-300 ease hover:border-slate-400 shadow-sm cursor-pointer"
        value={selectedTime ? selectedTime.format("HH:mm") : ""}
        onChange={handleTimeChange}
      />
    </div>
  );
};

export default DynamicTimePicker;
