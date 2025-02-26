import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  IconButton,
} from "@mui/material";
import { TiDeleteOutline } from "react-icons/ti";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { WorkShiftTypes } from "../types";

interface ShiftItemProps {
  shift: WorkShiftTypes["FormShiftState"];
  index: number;
  onDelete: (index: number) => void;
  onUpdate: (
    index: number,
    field: keyof Pick<
      WorkShiftTypes["FormShiftState"],
      "startTime" | "endTime" | "isWorkDay"
    >,
    value: DateObject | boolean
  ) => void;
}

 const ShiftItem = ({
  shift,
  index,
  onDelete,
  onUpdate,
}: ShiftItemProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 2,
      position: "relative",
      width: "100%",
    }}
  >
    <IconButton
      onClick={() => onDelete(index)}
      sx={{ position: "absolute", top: 8, left: 8, color: "#ef4444" }}
    >
      <TiDeleteOutline />
    </IconButton>
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: { xs: 2, sm: 3 },
        width: "100%",
        mt: { xs: 4, sm: 0 },
        pl: { xs: 0, sm: 6 },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          color: "#1e293b",
          minWidth: { xs: "auto", sm: "120px" },
        }}
      >
        <Box
          component="span"
          sx={{
            bgcolor: "#dbeafe",
            color: "#1e40af",
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          {shift.shiftName}
        </Box>
        <Box component="span" sx={{ mx: 1, color: "#64748b" }}>
          |
        </Box>
        {shift.date}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 2, sm: 2 },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <TimePickerField
          label="شروع:"
          value={shift.startTime}
          onChange={(time) => onUpdate(index, "startTime", time)}
        />
        <TimePickerField
          label="پایان:"
          value={shift.endTime}
          onChange={(time) => onUpdate(index, "endTime", time)}
        />
        <WorkDaySwitch
          isWorkDay={shift.isWorkDay}
          onChange={(checked) => onUpdate(index, "isWorkDay", checked)}
        />
      </Box>
    </Box>
  </Box>
);

const TimePickerField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: DateObject;
  onChange: (time: DateObject) => void;
}) => (
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
      value={value}
      onChange={onChange}
    />
  </Box>
);

const WorkDaySwitch = ({
  isWorkDay,
  onChange,
}: {
  isWorkDay: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <FormControlLabel
    control={
      <Switch
        checked={isWorkDay}
        onChange={(e) => onChange(e.target.checked)}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": { color: "#22c55e" },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            bgcolor: "#86efac",
          },
        }}
      />
    }
    label={
      <Typography sx={{ color: isWorkDay ? "#22c55e" : "#ef4444" }}>
        {isWorkDay ? "کاری" : "تعطیل"}
      </Typography>
    }
  />
);

export default ShiftItem;
