import { toast } from "react-hot-toast";
import moment from "moment-jalaali";

/**
 * Formats a date to ISO string for API requests
 */
export const formatTimeForAPI = (date: Date | null): string | null => {
  if (!date) return null;
  return new Date(date).toISOString();
};

/**
 * Formats a date for display in Jalali calendar
 */
export const formatTimeForDisplay = (date: string | null): string => {
  if (!date) return "تاریخ نامشخص";
  return moment(date).format("jYYYY/jMM/jDD - HH:mm");
};

/**
 * Validates if a time is valid for submission
 */
export const validateTime = (time: Date | null): boolean => {
  if (!time) {
    toast.error("زمان معتبری وجود ندارد.");
    return false;
  }
  return true;
};

/**
 * Gets the appropriate time value (selected or default)
 */
export const getTimeValue = (
  logId: number,
  selectedTimes: Record<number, Date | null>,
  defaultTime: string | null
): Date | null => {
  if (selectedTimes[logId] !== undefined) {
    return selectedTimes[logId];
  }
  return defaultTime ? new Date(defaultTime) : null;
};
