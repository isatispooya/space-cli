import React from "react";
import { Button } from "@/components";
import { useShiftsStore } from "../../store";
import { useShifts } from "../../hooks";

import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { ShiftDateType } from "../../types";
import { Switch } from "@mui/material";
import { convertToTimestamp } from "../../utils";

interface ShiftReviewStepProps {
  onBack: () => void;
  onSuccess: () => void;
}

const ShiftReviewCom: React.FC<ShiftReviewStepProps> = ({
  onBack,
  onSuccess,
}) => {
  const {
    shiftName,
    shiftDates,
    updateShiftDate,
    deleteShiftDate,
    shiftId,
    resetStore,
  } = useShiftsStore();

  const { mutate: createShiftsDates, isPending: isPendingDates } =
    useShifts.useCreateShiftsDates();

  const handleTimeChange = (
    date: string,
    field: "start_time" | "end_time",
    value: string
  ) => {
    const shiftDate = shiftDates[0];
    if (shiftDate) {
      const updatedDays = shiftDate.day.map((d) =>
        d.date === date ? { ...d, [field]: value } : d
      );
      updateShiftDate({
        shift: shiftDate.shift,
        day: updatedDays,
      });
    }
  };

  const handleWorkDayChange = (date: string, newValue: boolean) => {
    const shiftDate = shiftDates[0];
    if (shiftDate) {
      const updatedDays = shiftDate.day.map((d) =>
        d.date === date ? { ...d, work_day: newValue } : d
      );
      updateShiftDate({
        shift: shiftDate.shift,
        day: updatedDays,
      });
    }
  };

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

  const handleSubmit = () => {
    if (!shiftId) {
      console.error("No shift ID found");
      return;
    }

    if (!shiftDates.length || !shiftDates[0].day.length) {
      console.error("No dates selected");
      return;
    }

    const datesToSubmit = [
      {
        shift: shiftId,
        day: shiftDates[0].day.map((date) => ({
          date: convertToTimestamp(date.date),
          start_time: date.start_time,
          end_time: date.end_time,
          work_day: date.work_day,
          day_of_week: date.day_of_week,
        })),
      },
    ];

    createShiftsDates(datesToSubmit, {
      onSuccess: () => {
        resetStore();
        onSuccess();
      },
      onError: (error) => {
        console.error("Error creating shift dates:", error);
      },
    });
  };

  return (
    <div className="mt-4">
      <div className="mb-6 p-6 bg-[#5677BC] rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-100">
              بررسی و ویرایش تاریخ‌های انتخاب شده
            </h2>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-100">نام شیفت:</span>
                <span className="text-[#FFFFFF] font-semibold">
                  {shiftName}
                </span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="text-gray-100">تعداد روزها:</span>
                <span className="bg-[#FFFFFF] text-[#5677BC] px-3 py-1 rounded-full text-sm font-medium">
                  {shiftDates[0]?.day.length || 0} روز
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto p-2 custom-scrollbar">
        {shiftDates[0]?.day.map((date: ShiftDateType) => {
          const persianDate = formatPersianDate(date.date);
          return (
            <div
              key={date.date}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#5677BC] rounded-xl text-white">
                  <span className="text-xl font-bold">{persianDate.day}</span>
                  <span className="text-xs opacity-90">
                    {persianDate.monthName}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-800">
                    {date.day_of_week}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-3 bg-[#5677BC] px-3 py-1.5 rounded-lg">
                      <div className="flex items-center">
                        <input
                          type="time"
                          value={date.start_time}
                          onChange={(e) =>
                            handleTimeChange(
                              date.date,
                              "start_time",
                              e.target.value
                            )
                          }
                          className="bg-transparent border-none text-sm text-gray-100 w-[85px] focus:outline-none"
                        />
                        <span className="text-gray-400 mx-1">-</span>
                        <input
                          type="time"
                          value={date.end_time}
                          onChange={(e) =>
                            handleTimeChange(
                              date.date,
                              "end_time",
                              e.target.value
                            )
                          }
                          className="bg-transparent border-none text-sm text-gray-100 w-[85px] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#5677BC] px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-100">روز کاری</span>
                  <Switch
                    checked={date.work_day}
                    onChange={(e) =>
                      handleWorkDayChange(date.date, e.target.checked)
                    }
                    color="warning"
                    size="small"
                  />
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteShiftDate(date.date)}
                  animationOnHover="scale"
                  animationOnTap="scale"
                  ripple
                >
                  حذف
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #94a3b8;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }
        `}
      </style>

      <div className="mt-6 flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          animationOnHover="scale"
          animationOnTap="scale"
          ripple
          className="flex-1"
        >
          بازگشت
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          isDisabled={isPendingDates || !shiftDates[0]?.day.length}
          animationOnHover="scale"
          animationOnTap="scale"
          ripple
          elevated
          className="flex-1"
        >
          {isPendingDates ? "در حال ثبت..." : "ثبت نهایی"}
        </Button>
      </div>
    </div>
  );
};

export default ShiftReviewCom;
