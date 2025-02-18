import React from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

interface DatePickerComponentProps {
  format?: string;
  includeTimePicker?: boolean;
  calendar?: typeof persian;
  locale?: typeof persian_fa;
  calendarPosition?: "bottom-right" | "top-right" | "bottom-left" | "top-left";
  value?: DateObject | DateObject[] | null;
  onChange?: (date: DateObject | DateObject[] | null) => void;
  style?: React.CSSProperties;
}

const DateSelector: React.FC<DatePickerComponentProps> = ({
  format = "DD/MM/YYYY HH:mm",
  includeTimePicker = true,
  calendar = persian,
  locale = persian_fa,
  calendarPosition = "bottom-right",
  value,
  onChange,
  style = {
    width: "100%",
    minWidth: "250px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
  },
}) => {
  return (
    <DatePicker
      format={format}
      plugins={includeTimePicker ? [<TimePicker position="bottom" />] : []}
      calendar={calendar}
      locale={locale}
      calendarPosition={calendarPosition}
      value={Array.isArray(value) ? value[0] : value}
      style={style}
      onChange={onChange}
    />
  );
};

export default DateSelector;
