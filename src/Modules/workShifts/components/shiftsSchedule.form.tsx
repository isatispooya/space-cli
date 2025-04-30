import { Grid, Typography } from "@mui/material";
import { FormInput } from "@/components/common/inputs";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { WorkShiftTypes } from "../types";

const ShiftSchedule = ({
  shiftName,
  dates,
  onShiftNameChange,
  onDateChange,
}: WorkShiftTypes["ShiftScheduleProps"]) => (
  <Grid container spacing={3} direction="row" justifyContent="space-between">
    <Grid item xs={5}>
      <FormInput
        value={shiftName}
        onChange={(e) => onShiftNameChange(e.target.value)}
        label="نام شیفت"
        placeholder="نام شیفت را وارد کنید"
      />
    </Grid>
    <Grid item xs={6}>
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
        format="YYYY/MM/DD"
        dateSeparator=" - "
        style={{
          width: "100%",
          height: "40px",
          padding: "8.5px 14px",
          fontSize: "1rem",
          borderRadius: "4px",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          backgroundColor: "transparent",
        }}
        containerStyle={{
          width: "100%",
        }}
      />
    </Grid>
  </Grid>
);

export default ShiftSchedule;
