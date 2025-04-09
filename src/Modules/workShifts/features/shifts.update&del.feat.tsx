import { DynamicList } from "@/components";
import { useShifts } from "../hooks";
import { SelectInput } from "@/components";
import { useMemo, useState, useEffect } from "react";
import { shiftTypes } from "../types";
import {
  Switch,
  IconButton,
  Paper,
  Tooltip,
  Chip,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { weekDaysName } from "../data";
import moment from "moment-jalaali";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

moment.loadPersian({ usePersianDigits: true });

export interface ShiftUpdatePayload {
  start_time: string;
  end_time: string;
  work_day: boolean;
  day_of_week: string;
  date: string;
  shift: number;
}

const TimePickerField = ({
  label,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (time: string) => void;
}) => {
  // Using a simple approach to get it working
  const defaultValue = label === "ورود" ? "08:00:00" : "17:00:00";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="subtitle2" sx={{ color: "#475569" }}>
        {label}
      </Typography>
      <DatePicker
        disableDayPicker
        format="HH:mm"
        plugins={[<TimePicker hideSeconds />]}
        calendar={persian}
        locale={persian_fa}
        inputMode="text"
        render={(value, openCalendar) => (
          <Typography
            onClick={openCalendar}
            sx={{
              cursor: "pointer",
              bgcolor: "#f1f5f9",
              px: 2,
              py: 1,
              borderRadius: 1,
            }}
          >
            {value || defaultValue}
          </Typography>
        )}
        onChange={(date) => {
          if (date instanceof DateObject) {
            onChange(date.format("HH:mm:ss"));
          }
        }}
      />
    </Box>
  );
};

const ShiftsUpdateDel = () => {
  const { data } = useShifts.useGetShifts();
  const { mutate: updateShift } = useShifts.useUpdateShift();
  const { mutate: deleteShift } = useShifts.useDeleteShift();
  const [selectedShift, setSelectedShift] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(10);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteEntireShiftDialogOpen, setDeleteEntireShiftDialogOpen] =
    useState(false);

  const [shiftToDelete, setShiftToDelete] = useState<shiftTypes | null>(null);
  const [editForm, setEditForm] = useState({
    start_time: "08:00:00",
    end_time: "17:00:00",
    work_day: false,
  });

  const handleEdit = (item: shiftTypes) => {
    setEditingId(item.id);
    setEditForm({
      start_time: item.start_time || "08:00:00",
      end_time: item.end_time || "17:00:00",
      work_day: item.work_day,
    });
  };

  const handleCancel = () => {
    setEditingId(null);

    setEditForm({
      start_time: "08:00:00",
      end_time: "17:00:00",
      work_day: false,
    });
  };

  const defaultTimes = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return { start_time: "08:00:00", end_time: "17:00:00" };
    }
    return {
      start_time: data[0].start_time,
      end_time: data[0].end_time,
    };
  }, [data]);

  useEffect(() => {
    if (!editingId) {
      setEditForm((prev) => ({
        ...prev,
        start_time: defaultTimes.start_time,
        end_time: defaultTimes.end_time,
      }));
    }
  }, [defaultTimes, editingId]);

  const uniqueShifts = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return Array.from(new Set(data.map((item: shiftTypes) => item.shift.name)));
  }, [data]);

  const filteredShiftData = useMemo(() => {
    if (!data || !selectedShift) return [];
    return (data as unknown as shiftTypes[]).filter(
      (item) => item.shift.name === selectedShift
    );
  }, [data, selectedShift]);

  const handleTimeChange = (
    field: "start_time" | "end_time",
    value: string
  ) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (item: shiftTypes) => {
    updateShift({
      id: item.id.toString(),
      data: {
        start_time: editForm.start_time,
        end_time: editForm.end_time,
        work_day: editForm.work_day,
        day_of_week: item.day_of_week,
        date: item.date,
        shift: item.shift.id,
      },
    });
  };

  const handleDeleteClick = (item: shiftTypes) => {
    setShiftToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (shiftToDelete) {
      deleteShift({ id: shiftToDelete.id.toString() });
      setDeleteDialogOpen(false);
      setShiftToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setShiftToDelete(null);
  };

  const handleDeleteEntireShiftClick = () => {
    setDeleteEntireShiftDialogOpen(true);
  };

  const handleDeleteEntireShiftConfirm = () => {
    if (data && selectedShift) {
      // Get the first item of the selected shift to get the shift ID
      const shiftItem = (data as unknown as shiftTypes[]).find(
        (item) => item.shift.name === selectedShift
      );

      if (shiftItem && shiftItem.shift.id === 32) {
    
        deleteShift( shiftItem.shift.id );
        setDeleteEntireShiftDialogOpen(false);
        setSelectedShift("");
      }
    }
  };

  const handleDeleteEntireShiftCancel = () => {
    setDeleteEntireShiftDialogOpen(false);
  };

  const getWeekDayName = (dayNumber: string) => {
    const day = weekDaysName.find((day) => day.id === dayNumber);
    return day ? day.name : dayNumber;
  };

  const formatToJalali = (date: string) => {
    return moment(date).format("jYYYY/jMM/jDD");
  };

  const renderShiftItem = (item: shiftTypes) => (
    <Paper elevation={1} className="p-4 hover:shadow-md transition-shadow">
      {editingId === item.id ? (
        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center gap-2 min-w-[120px]">
            <span className="text-gray-600 whitespace-nowrap">تاریخ:</span>
            <span className="font-medium">{formatToJalali(item.date)}</span>
          </div>
          <div className="flex items-center gap-2 min-w-[120px]">
            <span className="text-gray-600">روز:</span>
            <span className="font-medium">
              {getWeekDayName(item.day_of_week)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <TimePickerField
              label="ورود"
              value={editForm.start_time}
              onChange={(value) => handleTimeChange("start_time", value)}
            />
            <TimePickerField
              label="خروج"
              value={editForm.end_time}
              onChange={(value) => handleTimeChange("end_time", value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">روز کاری:</span>
            <Switch
              checked={editForm.work_day}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  work_day: e.target.checked,
                }))
              }
              size="small"
            />
          </div>
          <div className="flex gap-2 mr-auto">
            <IconButton
              size="small"
              onClick={() => handleSave(item)}
              color="primary"
            >
              <SaveIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleCancel} color="error">
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center gap-2 min-w-[120px]">
            <span className="text-gray-600">تاریخ:</span>
            <span className="font-medium">{formatToJalali(item.date)}</span>
          </div>
          <div className="flex items-center gap-2 min-w-[120px]">
            <span className="text-gray-600">روز:</span>
            <span className="font-medium">
              {getWeekDayName(item.day_of_week)}
            </span>
          </div>
          <div className="flex items-center gap-2 min-w-[120px]">
            <span className="text-gray-600">ورود:</span>
            <span className="font-medium">{item.start_time}</span>
          </div>
          <div className="flex items-center gap-2 min-w-[120px]">
            <span className="text-gray-600">خروج:</span>
            <span className="font-medium">{item.end_time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">روز کاری:</span>
            <Chip
              label={item.work_day ? "بله" : "خیر"}
              size="small"
              color={item.work_day ? "success" : "default"}
              variant="outlined"
            />
          </div>
          <div className="mr-auto flex gap-2">
            <Tooltip title="ویرایش">
              <IconButton size="small" onClick={() => handleEdit(item)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="حذف">
              <IconButton
                size="small"
                onClick={() => handleDeleteClick(item)}
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}
    </Paper>
  );

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
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
        {selectedShift && (
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteEntireShiftClick}
            sx={{ whiteSpace: "nowrap" }}
          >
            حذف کل شیفت
          </Button>
        )}
      </Box>

      <DynamicList
        data={filteredShiftData}
        isPending={false}
        hideSearch={true}
        searchQuery={searchQuery}
        visibleItems={visibleItems}
        onSearchChange={setSearchQuery}
        onItemClick={() => {}}
        onLoadMore={() => setVisibleItems((prev) => prev + 10)}
        renderItem={renderShiftItem}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="delete-dialog-title" className="text-center">
          تایید حذف شیفت
        </DialogTitle>
        <DialogContent>
          <Typography>
            آیا از حذف این شیفت مطمئن هستید؟
            {shiftToDelete && (
              <Box
                component="span"
                sx={{ display: "block", mt: 1, color: "text.secondary" }}
              >
                تاریخ: {formatToJalali(shiftToDelete.date)}
                <br />
                روز: {getWeekDayName(shiftToDelete.day_of_week)}
              </Box>
            )}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            color="primary"
          >
            انصراف
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            autoFocus
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteEntireShiftDialogOpen}
        onClose={handleDeleteEntireShiftCancel}
        aria-labelledby="delete-entire-shift-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          id="delete-entire-shift-dialog-title"
          className="text-center"
        >
          تایید حذف کل شیفت
        </DialogTitle>
        <DialogContent>
          <Typography>
            آیا از حذف تمام موارد این شیفت مطمئن هستید؟
            {selectedShift && (
              <Box
                component="span"
                sx={{ display: "block", mt: 1, color: "text.secondary" }}
              >
                نام شیفت: {selectedShift}
              </Box>
            )}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleDeleteEntireShiftCancel}
            variant="outlined"
            color="primary"
          >
            انصراف
          </Button>
          <Button
            onClick={handleDeleteEntireShiftConfirm}
            variant="contained"
            color="error"
            autoFocus
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShiftsUpdateDel;
