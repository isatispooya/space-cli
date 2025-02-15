import { Chip, TextField } from "@mui/material";

import useTimeflowShift from "../hooks/useTimeflowShift";
import { useState, useEffect } from "react";

const Shift = () => {
  const { data } = useTimeflowShift.useGet();
  const [weekDays, setWeekDays] = useState<any[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const shiftData = data[0];
      const daysMap: any = {
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

  // const handleSwitchChange =
  //   (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const newWeekDays = [...weekDays];
  //     newWeekDays[index].working = event.target.checked;
  //     setWeekDays(newWeekDays);
  //   };

  const handleTimeChange =
    (index: number, field: "start" | "end") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newWeekDays = [...weekDays];
      newWeekDays[index][field] = event.target.value;
      setWeekDays(newWeekDays);
    };

  // const IOSSwitch = styled((props: SwitchProps) => (
  //   <Switch
  //     focusVisibleClassName=".Mui-focusVisible"
  //     disableRipple
  //     {...props}
  //   />
  // ))(() => ({
  //   width: 50,
  //   height: 30,
  //   padding: 0,
  //   "& .MuiSwitch-switchBase": {
  //     padding: 2,
  //     transitionDuration: "300ms",
  //     "&.Mui-checked": {
  //       transform: "translateX(20px)",
  //       color: "#fff",
  //       "& + .MuiSwitch-track": {
  //         backgroundColor: "#4CAF50",
  //       },
  //     },
  //   },
  //   "& .MuiSwitch-thumb": {
  //     width: 26,
  //     height: 26,
  //     backgroundColor: "#fff",
  //   },
  //   "& .MuiSwitch-track": {
  //     borderRadius: 15,
  //     backgroundColor: "#ccc",
  //     opacity: 1,
  //   },
  // }));

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-[90%] max-w-7xl mb-10 h-full bg-white shadow-2xl rounded-xl p-8 mx-auto">
      <h2 className="text-4xl text-center text-gray-900 font-extrabold mb-4">
        ثبت ساعت کاری
      </h2>

      <div className="w-full space-y-4">
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
                // <div className="flex flex-col items-center mx-4 text-center">
                //   <span className="text-sm text-gray-600 mb-1">تعطیل</span>
                // </div>

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

              {/* <FormControlLabel
                control={
                  <IOSSwitch
                    disabled
                    checked={day.working}
                    onChange={handleSwitchChange(index)}
                  />
                }
                label=""
              /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shift;
