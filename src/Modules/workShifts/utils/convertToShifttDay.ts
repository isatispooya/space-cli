import { DateObject } from "react-multi-date-picker";
import { WorkShiftTypes } from "../types";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const convertToShiftDay = (
  shift: WorkShiftTypes["FormShiftState"]
): WorkShiftTypes["ShiftDay"] => {
  const dateObject = new DateObject({
    date: shift.date,
    calendar: persian,
    locale: persian_fa,
  });
  const gregorianDate = dateObject.toDate();

  return {
    date: gregorianDate.toISOString().split("T")[0],
    start_time: shift.startTime ? formatTime(shift.startTime) : null,
    end_time: shift.endTime ? formatTime(shift.endTime) : null,
    work_day: shift.isWorkDay,
  };
};

const formatTime = (time: DateObject): string => {
  const hours = time.hour.toString().padStart(2, "0");
  const minutes = time.minute.toString().padStart(2, "0");
  return `${hours}:${minutes}:00`;
};

export default convertToShiftDay;
