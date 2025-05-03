import { Paper, IconButton, Switch, Chip, Tooltip } from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon, Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { TimePickerField } from "./timepicker_field";
import { formatToJalali, getWeekDayName } from "../utils/dateutils";
import { ShiftItemProps } from "../types/shiftsUpdate.type";

export const ShiftItem = ({
  item,
  editingId,
  editForm,
  onEdit,
  onCancel,
  onTimeChange,
  onDelete,
  onSave,
}: ShiftItemProps) => {
  const firstShiftDate = item.shift_dates[0];

  if (editingId === item.id) {
    return (
      <Paper elevation={1} className="p-4 hover:shadow-md transition-shadow">
        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center gap-2 min-w-[120px]">
            <span className="text-gray-600 whitespace-nowrap">تاریخ:</span>
            <span className="font-medium">{formatToJalali(firstShiftDate?.date || "")}</span>
          </div>
          <div className="flex items-center gap-2 min-w-[120px]">
            <span className="text-gray-600">روز:</span>
            <span className="font-medium">
              {getWeekDayName(firstShiftDate?.day_of_week || "")}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <TimePickerField
              label="ورود"
              onChange={(value) => onTimeChange("start_time", value)}
            />
            <TimePickerField
              label="خروج"
              onChange={(value) => onTimeChange("end_time", value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">روز کاری:</span>
            <Switch
              checked={editForm.work_day}
              onChange={(e) => onTimeChange("work_day", e.target.checked.toString())}
              size="small"
            />
          </div>
          <div className="flex gap-2 mr-auto">
            <IconButton size="small" onClick={() => onSave(item)} color="primary">
              <SaveIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onCancel} color="error">
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </Paper>
    );
  }

  return (
    <Paper elevation={1} className="p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-row items-center gap-4">
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-gray-600">تاریخ:</span>
          <span className="font-medium">{formatToJalali(firstShiftDate?.date || "")}</span>
        </div>
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-gray-600">روز:</span>
          <span className="font-medium">
            {getWeekDayName(firstShiftDate?.day_of_week || "")}
          </span>
        </div>
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-gray-600">ورود:</span>
          <span className="font-medium">{firstShiftDate?.start_time || ""}</span>
        </div>
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-gray-600">خروج:</span>
          <span className="font-medium">{firstShiftDate?.end_time || ""}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">روز کاری:</span>
          <Chip
            label={firstShiftDate?.work_day ? "بله" : "خیر"}
            size="small"
            color={firstShiftDate?.work_day ? "success" : "default"}
            variant="outlined"
          />
        </div>
        <div className="mr-auto flex gap-2">
          <Tooltip title="ویرایش">
            <IconButton size="small" onClick={() => onEdit(item)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="حذف">
            <IconButton size="small" onClick={() => onDelete(item)} color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Paper>
  );
};