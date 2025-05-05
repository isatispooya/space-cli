import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const convertToTimestamp = (dateString: string) => {
  const persianDate = new DateObject({
    date: dateString,
    calendar: persian,
    locale: persian_fa,
  });
  return persianDate.toDate().toISOString().split("T")[0];
};

export { convertToTimestamp };
