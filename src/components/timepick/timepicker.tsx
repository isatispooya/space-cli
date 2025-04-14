import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface TimePickerProps {
  label?: string;
  initialValue?: Date | null;
  onChange?: (date: Date | null) => void;
  sx?: object;
}

const DynamicTimePicker = ({
  label = "انتخاب زمان",
  initialValue = null,
  onChange,
  sx = { direction: "ltr" },
}: TimePickerProps) => {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(
    initialValue ? dayjs(initialValue) : null
  );

  const handleTimeChange = (newTime: Dayjs | null) => {
    setSelectedTime(newTime);
    if (onChange) {
      onChange(newTime ? newTime.toDate() : null);
    }
  };

  return (
    <TimePicker
      label={label}
      value={selectedTime}
      onChange={handleTimeChange}
      sx={sx}
    />
  );
};

export default DynamicTimePicker;
