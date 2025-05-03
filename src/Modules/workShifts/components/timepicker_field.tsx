import { Box, Typography } from "@mui/material";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { TimePickerFieldProps } from "../types/shiftsUpdate.type";

export const TimePickerField = ({ label, onChange }: TimePickerFieldProps) => {
  const defaultValue = label === "ورود" ? "08:00:00" : "17:00:00";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="subtitle2" sx={{ color: "#475569" }}>
        {label}
      </Typography>
      <DatePicker
        disableDayPicker
        format="HH:mm"
        plugins={[<TimePicker hideSeconds />]}
        calendar={persian}
        locale={persian_fa}
        inputMode="text"
        render={(value, openCalendar) => (
          <Typography
            onClick={openCalendar}
            sx={{
              cursor: "pointer",
              bgcolor: "#f1f5f9",
              px: 2,
              py: 1,
              borderRadius: 1,
            }}
          >
            {value || defaultValue}
          </Typography>
        )}
        onChange={(date) => {
          if (date instanceof DateObject) {
            onChange(date.format("HH:mm:ss"));
          }
        }}
      />
    </Box>
  );
};