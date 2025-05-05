import { Grid, Typography } from "@mui/material";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useShiftsStore } from "../../store";
import { useState } from "react";
import "../../styles/datepicker.styles.css";

const ShiftScheduleCom: React.FC = () => {
  const { setShiftDates, shiftId } = useShiftsStore();
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);

  const generateDatesBetween = (startDate: DateObject, endDate: DateObject) => {
    const dates: DateObject[] = [];
    const currentDate = new DateObject(startDate);
    const lastDate = new DateObject(endDate);

    while (currentDate.valueOf() <= lastDate.valueOf()) {
      dates.push(new DateObject(currentDate));
      currentDate.add(1, "day");
    }

    return dates;
  };

  const handleDateChange = (dates: DateObject | DateObject[] | null) => {
    if (!dates) return;

    const dateArray = Array.isArray(dates) ? dates : [dates];

    if (dateArray.length === 2) {
      // If it's a range selection, generate all dates in between
      const allDates = generateDatesBetween(dateArray[0], dateArray[1]);
      setSelectedDates(allDates);

      const newShiftDates = [
        {
          shift: shiftId || 0,
          day: allDates.map((date) => ({
            date: date.format("YYYY-MM-DD"),
            start_time: "08:00",
            end_time: "17:00",
            work_day: true,
            day_of_week: date.weekDay.name,
          })),
        },
      ];

      setShiftDates(newShiftDates);
    } else {
      // For single date selection
      setSelectedDates(dateArray);
      const newShiftDates = [
        {
          shift: shiftId || 0,
          day: dateArray.map((date) => ({
            date: date.format("YYYY-MM-DD"),
            start_time: "08:00",
            end_time: "17:00",
            work_day: true,
            day_of_week: date.weekDay.name,
          })),
        },
      ];

      setShiftDates(newShiftDates);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div className="bg-gray-100 p-6 rounded-xl shadow-sm border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500 shadow-lg shadow-blue-200">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#1e40af",
                    fontSize: "1.25rem",
                    marginBottom: "4px",
                  }}
                >
                  تنظیم زمان‌بندی شیفت
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontSize: "0.875rem" }}
                >
                  لطفاً تاریخ‌های مورد نظر را انتخاب کنید
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-blue-100">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm text-gray-600">
                برای انتخاب محدوده، دو تاریخ را انتخاب کنید
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="custom-datepicker-wrapper">
              <DatePicker
                range
                rangeHover
                calendarPosition="top-center"
                fixMainPosition
                value={selectedDates}
                onChange={handleDateChange}
                plugins={[<DatePanel eachDaysInRange position="left" />]}
                calendar={persian}
                locale={persian_fa}
                highlightToday={false}
                className="custom-datepicker"
                inputClass="custom-input"
                containerClassName="custom-container"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  height: "44px",
                  padding: "8px 12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  backgroundColor: "#f8fafc",
                  color: "#1e293b",
                  outline: "none",
                  transition: "all 0.2s ease-in-out",
                }}
                minDate={new DateObject({ calendar: persian }).subtract(
                  1,
                  "year"
                )}
                maxDate={new DateObject({ calendar: persian }).add(1, "year")}
              />
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ShiftScheduleCom;
