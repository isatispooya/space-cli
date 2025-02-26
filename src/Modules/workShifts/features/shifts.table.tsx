import "moment/locale/fa";
import moment from "moment-jalaali";
import { TabulatorTable } from "../../../components";
import useShifts from "../hooks/useShifts";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { useState, useMemo } from "react";
import { shiftTypes } from "../types";

const ShiftsTable = () => {
  const { data } = useShifts.useGetShifts();
  const [selectedShift, setSelectedShift] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedShift(event.target.value as string);
  };

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
    { title: "تاریخ", field: "date" },
    { title: "زمان شروع", field: "start_time" },
    { title: "زمان پایان", field: "end_time" },
    { title: "روز کاری", field: "work_day" },
    { title: "روز هفته", field: "day_of_week" },
  ];

  const ExelData = (item: shiftTypes) => {
    return {
      نام_شیفت: item.shift.name || "نامشخص",
      تاریخ_شروع: moment(item.start_time).format("jYYYY/jMM/jDD"),
      تاریخ_پایان: moment(item.end_time).format("jYYYY/jMM/jDD"),
      روزکاری: item.work_day,
      روزهفته: item.day_of_week,
    };
  };

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <FormControl sx={{ width: "80%", mx: "auto" }}>
        <InputLabel id="shift-select-label">شیفت ها</InputLabel>
        <Select
          labelId="shift-select-label"
          id="shift-select"
          value={selectedShift}
          label="شیفت ها"
          onChange={handleChange}
        >
          <MenuItem value="">همه</MenuItem>
          {uniqueShifts.map((shiftName: string) => (
            <MenuItem key={shiftName} value={shiftName}>
              {shiftName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="overflow-x-auto">
        {Array.isArray(data) && data.length > 0 ? (
          <TabulatorTable
            data={mappedData || []}
            columns={columns()}
            title="اطلاعات کاربران"
            showActions={true}
            formatExportData={ExelData}
          />
        ) : (
          <div className="w-full flex flex-col justify-center items-center p-12 gap-4">
            <svg
              className="w-16 h-16 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-400 text-lg font-medium">
              اطلاعاتی موجود نیست
            </p>
            <p className="text-gray-300 text-sm">
              لطفاً بعداً دوباره تلاش کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ShiftsTable;
