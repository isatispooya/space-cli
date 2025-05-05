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
    <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
          <span className="text-lg font-bold">{persianDate.day}</span>
          <span className="text-xs opacity-90">{persianDate.monthName}</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg">
    
              <div className="flex items-center">
                <input
                  type="time"
                  value={date.start_time}
                  onChange={(e) =>
                    onTimeChange(date.id, "start_time", e.target.value)
                  }
                  className="bg-transparent border-none text-xs text-gray-600 w-[70px] focus:outline-none"
                />
                <span className="text-gray-400 mx-1">-</span>
                <input
                  type="time"
                  value={date.end_time}
                  onChange={(e) =>
                    onTimeChange(date.id, "end_time", e.target.value)
                  }
                  className="bg-transparent border-none text-xs text-gray-600 w-[70px] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-lg">
          <span className="text-xs text-gray-600">
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
          size="xs"
          onClick={() => onDelete(date.id)}
          isLoading={isDeleting}
          animationOnHover="scale"
          animationOnTap="scale"
          ripple
        >
          <Trash size={14} />
          حذف
        </Button>
      </div>
    </div>
  );
};

export default ShiftDateItemCom;
