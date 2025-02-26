import "moment/locale/fa";
import moment from "moment-jalaali";
import { LoaderLg, TabulatorTable, SelectInput } from "../../../components";
import useShifts from "../hooks/useShifts";
import { useState, useMemo } from "react";
import { shiftTypes } from "../types";

const ShiftsTable = () => {
  const { data } = useShifts.useGetShifts();
  const [selectedShift, setSelectedShift] = useState("");

  const uniqueShifts = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return Array.from(new Set(data.map((item: shiftTypes) => item.shift.name)));
  }, [data]);

  const mappedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data
      ?.filter(
        (item: shiftTypes) =>
          selectedShift === "" || item.shift.name === selectedShift
      )
      .map((item) => ({
        id: item.id ?? 0,
        shift_name: item.shift.name,
        date: moment(item.date).format("jYYYY/jMM/jDD"),
        start_time: item.start_time,
        end_time: item.end_time,
        work_day: item.work_day ? "بله" : "خیر",
        day_of_week: item.day_of_week,
      }));
  }, [data, selectedShift]);

  const columns = () => [
    { title: "تاریخ", field: "date", headerFilter: true },
    { title: "زمان شروع", field: "start_time", headerFilter: true },
    { title: "زمان پایان", field: "end_time", headerFilter: true },
    { title: "روز کاری", field: "work_day", headerFilter: true },
    { title: "روز هفته", field: "day_of_week", headerFilter: true },
  ];

  const ExelData = (item: shiftTypes) => {
    return {
      نام_شیفت: item.shift.name || "نامشخص",
      تاریخ: item.date || "نامشخص",
      ساعت_شروع: item.start_time || "نامشخص",
      ساعت_پایان: item.end_time || "نامشخص",
      روزکاری: item.work_day ?? "نامشخص",
      روزهفته: item.day_of_week || "نامشخص",
    };
  };

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <SelectInput
        options={uniqueShifts.map((shiftName) => ({
          value: shiftName,
          label: shiftName,
        }))}
        label="شیفت ها"
        value={selectedShift}
        onChange={(value) => setSelectedShift(value)}
        className="w-full mx-auto"
      />
      <div className="overflow-x-auto">
        {Array.isArray(data) && data.length > 0 ? (
          <TabulatorTable
            data={mappedData || []}
            columns={columns()}
            title="شیفت ه"
            showActions={true}
            formatExportData={ExelData}
          />
        ) : (
          <LoaderLg />
        )}
      </div>
    </div>
  );
};
export default ShiftsTable;
