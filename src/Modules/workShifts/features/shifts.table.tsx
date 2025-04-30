import "moment/locale/fa";
import moment from "moment-jalaali";
import { LoaderLg, TabulatorTable, SelectInput } from "../../../components";
import useShifts from "../hooks/useShifts";
import { useState, useMemo } from "react";
import { shiftTypes } from "../types";
import { weekDaysName } from "../data";
import { useNavigate } from "react-router-dom";

const ShiftsTable = () => {
  const { data, isLoading } = useShifts.useGetShifts();
  const [selectedShift, setSelectedShift] = useState("");
  const navigate = useNavigate();

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
        day_of_week: weekDaysName.find((day) => day.id === item.day_of_week)
          ?.name,
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

  if (isLoading) {
    return <LoaderLg />;
  }

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 max-w-md">
          <SelectInput
            options={uniqueShifts.map((shiftName) => ({
              value: shiftName,
              label: shiftName,
            }))}
            label="شیفت ها"
            value={selectedShift}
            onChange={(value) => setSelectedShift(value)}
            className="w-full"
          />
        </div>
        <button
          onClick={() => navigate("/shifts/update&del")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-4 flex items-center"
        >
          <span>مدیریت شیفت‌ها</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        {selectedShift && Array.isArray(data) && data.length > 0 ? (
          <TabulatorTable
            data={mappedData || []}
            columns={columns()}
            title="شیفت ه"
            showActions={true}
            formatExportData={ExelData}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            {selectedShift
              ? "هیچ داده‌ای یافت نشد"
              : "لطفاً یک شیفت را انتخاب کنید"}
          </div>
        )}
      </div>
    </div>
  );
};
export default ShiftsTable;
