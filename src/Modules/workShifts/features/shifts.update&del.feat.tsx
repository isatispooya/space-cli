import { DynamicList, Button } from "@/components";
import { useShifts } from "../hooks";
import { SelectInput } from "@/components";
import { useMemo, useEffect, useCallback } from "react";
import { shiftTypes } from "../types";
import {
  Switch,
  IconButton,
  Paper,
  Tooltip,
  Chip,
  Box,
  Typography,
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
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedShift,
  selectEditingId,
  selectDeleteDialogOpen,
  selectDeleteEntireShiftDialogOpen,
  selectShiftToDelete,
  selectEditForm,
  selectSearchQuery,
  selectVisibleItems,
  setSelectedShift,
  setEditingId,
  setDeleteDialogOpen,
  setDeleteEntireShiftDialogOpen,
  setShiftToDelete,
  setEditForm,
  updateEditForm,
  setSearchQuery,
  setVisibleItems,
  selectDates,
  setDates,
} from "../store/shiftsForm.store";
import { Dialog } from "@/components/modals";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
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
  const dispatch = useDispatch();
  const { data } = useShifts.useGetShifts();
  const { mutate: updateShift } = useShifts.useUpdateShift();
  const { mutate: deleteShift } = useShifts.useDeleteShift();
  const { mutate: deleteShiftDay } = useShifts.useDeleteShiftDay();
  const selectedShift = useSelector(selectSelectedShift);
  const dates = useSelector(selectDates);
  const searchQuery = useSelector(selectSearchQuery);
  const visibleItems = useSelector(selectVisibleItems);
  const editingId = useSelector(selectEditingId);
  const deleteDialogOpen = useSelector(selectDeleteDialogOpen);
  const deleteEntireShiftDialogOpen = useSelector(
    selectDeleteEntireShiftDialogOpen
  );
  const shiftToDelete = useSelector(selectShiftToDelete);
  const editForm = useSelector(selectEditForm);

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
      dispatch(
        setEditForm({
          start_time: defaultTimes.start_time,
          end_time: defaultTimes.end_time,
          work_day: false,
        })
      );
    }
  }, [defaultTimes, editingId, dispatch]);

  const handleEdit = useCallback(
    (item: shiftTypes) => {
      dispatch(setEditingId(item.id));
      dispatch(
        setEditForm({
          start_time: item.start_time || "08:00:00",
          end_time: item.end_time || "17:00:00",
          work_day: item.work_day,
        })
      );
    },
    [dispatch]
  );

  const handleCancel = useCallback(() => {
    dispatch(setEditingId(null));
    dispatch(
      setEditForm({
        start_time: "08:00:00",
        end_time: "17:00:00",
        work_day: false,
      })
    );
  }, [dispatch]);

  const handleTimeChange = useCallback(
    (field: "start_time" | "end_time", value: string) => {
      dispatch(updateEditForm({ [field]: value }));
    },
    [dispatch]
  );

  const handleDeleteClick = useCallback(
    (item: shiftTypes) => {
      dispatch(setShiftToDelete(item));
      dispatch(setDeleteDialogOpen(true));
    },
    [dispatch]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (shiftToDelete) {
      deleteShiftDay({ id: shiftToDelete.id.toString() });
      dispatch(setDeleteDialogOpen(false));
      dispatch(setShiftToDelete(null));
    }
  }, [dispatch, shiftToDelete, deleteShiftDay]);

  const handleDeleteCancel = useCallback(() => {
    dispatch(setDeleteDialogOpen(false));
    dispatch(setShiftToDelete(null));
  }, [dispatch]);

  const handleDeleteEntireShiftClick = useCallback(() => {
    dispatch(setDeleteEntireShiftDialogOpen(true));
  }, [dispatch]);

  const handleDeleteEntireShiftConfirm = useCallback(() => {
    if (filteredShiftData.length > 0) {
      const shiftId = filteredShiftData[0].shift.id;
      deleteShift({ id: shiftId.toString() });
    }
    dispatch(setDeleteEntireShiftDialogOpen(false));
  }, [dispatch, deleteShift, filteredShiftData]);

  const handleDeleteEntireShiftCancel = useCallback(() => {
    dispatch(setDeleteEntireShiftDialogOpen(false));
  }, [dispatch]);

  const handleSave = useCallback(
    (item: shiftTypes) => {
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
      dispatch(setEditingId(null));
    },
    [updateShift, editForm, dispatch]
  );

  const getWeekDayName = (dayNumber: string) => {
    const day = weekDaysName.find((day) => day.id === dayNumber);
    return day ? day.name : dayNumber;
  };

  const formatToJalali = (date: string) => {
    return moment(date).format("jYYYY/jMM/jDD");
  };

  const renderShiftItem = useCallback(
    (item: shiftTypes) => (
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
                  dispatch(updateEditForm({ work_day: e.target.checked }))
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
    ),
    [
      editingId,
      editForm,
      handleEdit,
      handleCancel,
      handleTimeChange,
      handleDeleteClick,
      handleSave,
      dispatch,
    ]
  );

  const handleDateChange = (dateObjects: DateObject[]) => {
    dispatch(setDates(dateObjects));
  };


  console.log(dates)

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <SelectInput
            options={uniqueShifts.map((shiftName) => ({
              value: shiftName,
              label: shiftName,
            }))}
            label="شیفت ها"
            value={selectedShift}
            onChange={(value) => dispatch(setSelectedShift(value))}
            className="min-w-[200px]"
          />
          <DatePicker
            range
            calendarPosition="bottem-left"
            fixMainPosition
            value={dates}
            minDate={new DateObject({ calendar: persian }).toFirstOfMonth()}
            maxDate={new DateObject({ calendar: persian }).toLastOfMonth()}
            onChange={handleDateChange}
            plugins={[<DatePanel eachDaysInRange position="left" />]}
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            dateSeparator=" - "
            containerStyle={{
              height: "40px",
              minWidth: "260px",
            }}
            style={{
              height: "100%",
              fontSize: "14px",
            }}
          />
        </div>
        {selectedShift && (
          <Button
            color="red"
            onClick={handleDeleteEntireShiftClick}
            className="px-6 py-2 h-[40px] whitespace-nowrap bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          >
            حذف کل شیفت
          </Button>
        )}
      </div>

      <DynamicList
        data={filteredShiftData}
        isPending={false}
        hideSearch={true}
        searchQuery={searchQuery}
        visibleItems={visibleItems}
        onSearchChange={(value) => dispatch(setSearchQuery(value))}
        onItemClick={() => {}}
        onLoadMore={() => dispatch(setVisibleItems(visibleItems + 10))}
        renderItem={renderShiftItem}
      />

      <Dialog
        isOpen={deleteDialogOpen}
        onClose={handleDeleteCancel}
        size="sm"
        header="حذف شیفت"
        hideFooter={false}
        footer={
          <div className="flex gap-2">
            <button
              onClick={handleDeleteCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-700 rounded-md border border-gray-300"
            >
              انصراف
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              حذف
            </button>
          </div>
        }
      >
        <div className="py-4">
          <p className="text-gray-700 text-right">
            آیا از حذف این شیفت اطمینان دارید؟
          </p>
          {shiftToDelete && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                تاریخ: {formatToJalali(shiftToDelete.date)}
              </p>
              <p className="text-sm text-gray-600">
                روز: {getWeekDayName(shiftToDelete.day_of_week)}
              </p>
            </div>
          )}
        </div>
      </Dialog>

      <Dialog
        isOpen={deleteEntireShiftDialogOpen}
        onClose={handleDeleteEntireShiftCancel}
        size="sm"
        header="حذف کل شیفت"
        hideFooter={false}
        footer={
          <div className="flex gap-2 ">
            <button
              onClick={handleDeleteEntireShiftCancel}
              className="px-4 py-2  text-gray-600 hover:text-gray-700 rounded-md border border-gray-300"
            >
              انصراف
            </button>
            <button
              onClick={handleDeleteEntireShiftConfirm}
              className="px-4 py-2  bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              حذف
            </button>
          </div>
        }
      >
        <div className="py-4 text-right">
          <p className="text-gray-700">
            آیا از حذف کل شیفت "{selectedShift}" اطمینان دارید؟
          </p>
          <p className="mt-2 text-sm text-red-500">
            این عملیات غیرقابل بازگشت است و تمام روزهای این شیفت حذف خواهند شد.
          </p>
        </div>
      </Dialog>
    </>
  );
};

export default ShiftsUpdateDel;
