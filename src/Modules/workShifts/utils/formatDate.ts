import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const formatPersianDate = (dateString: string) => {
  const date = new DateObject({
    date: dateString,
    calendar: persian,
    locale: persian_fa,
  });
  return {
    day: date.format("D"),
    month: date.format("M"),
    monthName: date.format("MMMM"),
  };
};

export { formatPersianDate };
