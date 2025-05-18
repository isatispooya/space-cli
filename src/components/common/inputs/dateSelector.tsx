import React from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
import "./dateSelector.css";

interface DatePickerComponentPropsType {
  format?: string;
  includeTimePicker?: boolean;
  calendar?: typeof persian;
  locale?: typeof persian_fa;
  calendarPosition?: "bottom-right" | "top-right" | "bottom-left" | "top-left";
  value?: DateObject | DateObject[] | null;
  onChange?: (date: DateObject | DateObject[] | null) => void;
  minDate?: DateObject | DateObject[] | null;
  label?: string;
}

const DateSelector: React.FC<DatePickerComponentPropsType> = ({
  format = "DD/MM/YYYY HH:mm",
  includeTimePicker = true,
  calendar = persian,
  locale = persian_fa,
  calendarPosition = "bottom-right",
  value,
  onChange,
  label,
}) => {
  return (
    <div className="date-selector-container">
      {label && (
        <label className="date-selector-label text-sm text-[#29D2C7]">
          {label}
        </label>
      )}
      <DatePicker
        format={format}
        plugins={includeTimePicker ? [<TimePicker position="bottom" />] : []}
        calendar={calendar}
        locale={locale}
        calendarPosition={calendarPosition}
        value={Array.isArray(value) ? value[0] : value}
        onChange={onChange}
        inputClass="custom-date-picker"
      />
    </div>
  );
};

export default DateSelector;
