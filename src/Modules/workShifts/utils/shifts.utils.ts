import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { WorkShiftTypes } from "../types";

/**
 * Creates default time objects for shift scheduling
 * @returns Object containing default start and end time
 */
export const createDefaultTimes = () => {
  const defaultStartTime = new DateObject({
    calendar: persian,
    locale: persian_fa,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: 8,
    minute: 0,
  });

  const defaultEndTime = new DateObject({
    calendar: persian,
    locale: persian_fa,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: 15,
    minute: 30,
  });

  return { defaultStartTime, defaultEndTime };
};

/**
 * Validates shift data before submission
 * @param shifts Array of shift states
 * @param shiftName Name of the shift
 * @returns Boolean indicating if data is valid
 */
export const validateShiftData = (
  shifts: WorkShiftTypes["FormShiftState"][],
  shiftName: string
): boolean => {
  return (
    shifts.every((shift) => shift.startTime && shift.endTime) &&
    Boolean(shiftName)
  );
};

/**
 * Updates a specific field in a shift
 * @param shifts Current shifts array
 * @param index Index of shift to update
 * @param field Field to update
 * @param value New value
 * @returns Updated shifts array
 */
export const updateShiftField = (
  shifts: WorkShiftTypes["FormShiftState"][],
  index: number,
  field: keyof Pick<
    WorkShiftTypes["FormShiftState"],
    "startTime" | "endTime" | "isWorkDay"
  >,
  value: DateObject | null | boolean
): WorkShiftTypes["FormShiftState"][] => {
  const updatedShifts = [...shifts];
  updatedShifts[index] = {
    ...updatedShifts[index],
    [field]: value,
  };
  return updatedShifts;
};

/**
 * Removes a shift from the shifts array
 * @param shifts Current shifts array
 * @param index Index of shift to delete
 * @returns Updated shifts array
 */
export const removeShift = (
  shifts: WorkShiftTypes["FormShiftState"][],
  index: number
): WorkShiftTypes["FormShiftState"][] => {
  return shifts.filter((_, i) => i !== index);
};
