import { Grid, Typography } from "@mui/material";
import { FormInput } from "@/components/common/inputs";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface ShiftScheduleProps {
  shiftName: string;
  dates: DateObject[];
  onShiftNameChange: (value: string) => void;
  onDateChange: (dates: DateObject[]) => void;
}

const ShiftSchedule = ({
  shiftName,
  dates,
  onShiftNameChange,
  onDateChange,
}: ShiftScheduleProps) => (
  <Grid container spacing={3} direction="column">
    <Grid item xs={12}>
      <FormInput
        value={shiftName}
        onChange={(e) => onShiftNameChange(e.target.value)}
        label="نام شیفت"
        placeholder="نام شیفت را وارد کنید"
      />
    </Grid>
    <Grid item xs={12}>
      <Typography
        variant="subtitle1"
        sx={{ mb: 1, fontWeight: 500, color: "#475569" }}
      >
        انتخاب بازه تاریخ
      </Typography>
      <DatePicker
        range
        calendarPosition="top-left"
        fixMainPosition
        value={dates}
        minDate={new DateObject({ calendar: persian }).toFirstOfMonth()}
        maxDate={new DateObject({ calendar: persian }).toLastOfMonth()}
        onChange={onDateChange}
        plugins={[<DatePanel eachDaysInRange position="left" />]}
        calendar={persian}
        locale={persian_fa}
      />
    </Grid>
  </Grid>
);

export default ShiftSchedule;
