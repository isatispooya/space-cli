import moment from "moment-jalaali";
import { weekDaysName } from "../data";

export const formatToJalali = (date: string) =>
  moment(date).format("jYYYY/jMM/jDD");

export const getWeekDayName = (dayNumber: string) => {
  const day = weekDaysName.find((day) => day.id === dayNumber);
  return day ? day.name : dayNumber;
};
