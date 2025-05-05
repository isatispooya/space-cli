import { ShiftDateResType } from "../../types";
import { Switch } from "@mui/material";
import { formatPersianDate } from "../../utils";
import { Button } from "@/components";
import { Trash } from "lucide-react";


const ShiftDateItemCom = ({
  date,
  onTimeChange,
  onWorkDayChange,
  onDelete,
  isDeleting,
}: {
  date: ShiftDateResType;
  onTimeChange: (
    dateId: number,
    field: "start_time" | "end_time",
    value: string
  ) => void;
  onWorkDayChange: (dateId: number, newValue: boolean) => void;
  onDelete: (dateId: number) => void;
  isDeleting: boolean;
}) => {
  const persianDate = formatPersianDate(date.date);

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
          <span className="text-xl font-bold">{persianDate.day}</span>
          <span className="text-xs opacity-90">{persianDate.monthName}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">
            {date.day_of_week || "بدون نام روز"}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-lg">
              <svg
                className="w-4 h-4 text-blue-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex items-center">
                <input
                  type="time"
                  value={date.start_time}
                  onChange={(e) =>
                    onTimeChange(date.id, "start_time", e.target.value)
                  }
                  className="bg-transparent border-none text-sm text-gray-600 w-[85px] focus:outline-none"
                />
                <span className="text-gray-400 mx-1">-</span>
                <input
                  type="time"
                  value={date.end_time}
                  onChange={(e) =>
                    onTimeChange(date.id, "end_time", e.target.value)
                  }
                  className="bg-transparent border-none text-sm text-gray-600 w-[85px] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-600">
            {date.work_day ? "روز کاری" : "روز تعطیل"}
          </span>
          <Switch
            checked={date.work_day}
            onChange={(e) => onWorkDayChange(date.id, e.target.checked)}
            color="primary"
            size="small"
          />
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(date.id)}
          isLoading={isDeleting}
          animationOnHover="scale"
          animationOnTap="scale"
          ripple
        >
          <Trash size={16} />
          حذف
        </Button>
      </div>
    </div>
  );
};

export default ShiftDateItemCom;
