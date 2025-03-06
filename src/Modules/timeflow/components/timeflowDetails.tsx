import { useTimeflow } from "../hooks";
import { LoaderLg, TabulatorTable } from "../../../components";
import { ColumnDefinition } from "tabulator-tables";
import moment from "moment-jalaali";
import { ExelData } from "../data";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";

const TimeflowDetails = () => {
  const [selectedDate, setSelectedDate] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );

  const { data, isLoading } = useTimeflow.useGetTimeflowDetails(
    selectedDate.year,
    selectedDate.month.number
  );

  const handleDateChange = (date: DateObject | null) => {
    console.log(date?.year);

    if (date) {
      setSelectedDate(date);
    }
  };

  const mappedData = data?.map((item: any) => ({
    ...item,
    date: moment(item.date).format("jYYYY/jMM/jDD"),
    time_start: `${moment(item.date).format("jYYYY/jMM/jDD")} ${moment(
      item.time_start,
      "HH:mm:ss"
    ).format("HH:mm")}`,
    time_end: `${moment(item.date).format("jYYYY/jMM/jDD")} ${moment(
      item.time_end,
      "HH:mm:ss"
    ).format("HH:mm")}`,
    type: item.type === "working" ? "زمان حضور" : " غیبت",
    user_id: item.user_id,
    first_name: item.user_detail.first_name,
    last_name: item.user_detail.last_name,
    uniqueIdentifier: item.user_detail.uniqueIdentifier,
  }));

  if (isLoading) {
    return <LoaderLg />;
  }

  const columns = (): ColumnDefinition[] => [
    {
      title: "نام",
      field: "first_name",
      headerFilter: true,
    },
    {
      title: "نام خانوادگی",
      field: "last_name",
      headerFilter: true,
    },
    {
      title: "کد ملی",
      field: "uniqueIdentifier",
      headerFilter: true,
    },
    {
      title: "غیبت",
      field: "absence",
      headerFilter: true,
    },
    {
      title: "مرخصی",
      field: "leave",
      headerFilter: true,
    },
    {
      title: "موظفی",
      field: "limit_time",
      headerFilter: true,
    },
    {
      title: "ماموریت",
      field: "mission",
      headerFilter: true,
    },
    {
      title: "کاری",
      field: "working",
      headerFilter: true,
    },
  ];

  return (
    <>
      <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col items-center mb-[100px]">
        <DatePicker
          onlyMonthPicker
          format="MMMM YYYY"
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          value={selectedDate}
          onChange={handleDateChange}
          style={{
            marginBottom: "1rem",
            border: "1px solid gray",
            borderRadius: "0.5rem",
            padding: "1.3rem",
            textAlign: "center",
            fontSize: "1.5rem",
            backgroundColor: "#f9fafb",
          }}
        />
        <div className="overflow-x-auto w-full">
          <TabulatorTable
            data={mappedData || []}
            columns={columns()}
            title="اطلاعات کاربران"
            showActions={true}
            formatExportData={ExelData}
          />
        </div>
      </div>
    </>
  );
};

export default TimeflowDetails;
