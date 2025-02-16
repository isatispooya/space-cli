import {
  Chip,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import useTimeflowShift from "../hooks/useTimeflowShift";
import { useState, useEffect } from "react";

const Shift = () => {
  const { data } = useTimeflowShift.useGet();
  const [weekDays, setWeekDays] = useState<any[]>([]);
  const [shift, setShift] = useState<string>("");

  const namedate = data ? data.map((item: any) => item.name) : [];

  useEffect(() => {
    if (data && data.length > 0) {
      const shiftData = data[0];
      const daysMap: Record<string, string> = {
        saturday: "شنبه",
        sunday: "یکشنبه",
        monday: "دوشنبه",
        tuesday: "سه‌شنبه",
        wednesday: "چهارشنبه",
        thursday: "پنج‌شنبه",
        friday: "جمعه",
      };

      const extractedDays = Object.keys(daysMap).map((dayKey) => ({
        name: daysMap[dayKey],
        working: shiftData[`${dayKey}_working_day`] || false,
        start: shiftData[`${dayKey}_start`] || "",
        end: shiftData[`${dayKey}_end`] || "",
      }));

      setWeekDays(extractedDays);
    }
  }, [data]);

  const handleTimeChange =
    (index: number, field: "start" | "end") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newWeekDays = [...weekDays];
      newWeekDays[index][field] = event.target.value;
      setWeekDays(newWeekDays);
    };
  const handleChange = (event: SelectChangeEvent) => {
    setShift(event.target.value);
  };


  return (
    <div className="flex flex-col items-center justify-center gap-6 w-[90%] max-w-7xl mb-10 h-full bg-white shadow-2xl rounded-xl p-8 mx-auto">
      <h2 className="text-4xl text-center text-gray-900 font-extrabold mb-4">
        ثبت ساعت کاری
      </h2>

      <div className="w-full space-y-4">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">شیفت ها </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={shift}
            label="شیفت ها "
            onChange={handleChange}
          >
            {namedate.length > 0 &&
              namedate.map((name: string, index: number) => (
                <MenuItem key={index} value={index + 1}>
                  {name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {weekDays.map((day, index) => (
          <div
            key={day.name}
            className="border p-6 rounded-lg flex items-center bg-gray-50 shadow-lg hover:bg-gray-200 transition-colors duration-300"
          >
            <div className="flex justify-between items-center w-full">
              <span className="text-lg text-gray-800 font-semibold">
                {day.name}
              </span>

              {day.working && (
                <div className="flex flex-col items-center mx-4 text-center">
                  <label className="text-sm text-gray-600 mb-1">
                    ساعت شروع
                  </label>
                  <TextField
                    disabled
                    className="bg-white border rounded-lg px-2 py-1 text-center"
                    value={day.start}
                    onChange={handleTimeChange(index, "start")}
                  />
                </div>
              )}

              {!day.working && (
                <Chip label="تعطیل" color="error" variant="outlined" />
              )}

              {day.working && (
                <div className="flex flex-col items-center mx-4 text-center">
                  <label className="text-sm text-gray-600 mb-1">
                    ساعت پایان
                  </label>
                  <TextField
                    disabled
                    className="bg-white ite border rounded-lg px-2 py-1 text-center"
                    value={day.end}
                    onChange={handleTimeChange(index, "end")}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shift;
