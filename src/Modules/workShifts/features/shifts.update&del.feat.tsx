import { DynamicList } from "@/components";
import { useShifts } from "../hooks";
import { SelectInput } from "@/components";
import { useMemo, useEffect, useCallback } from "react";
import { Box, Button } from "@mui/material";
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
} from "../store/shiftsForm.store";
import { TimePickerField } from "../components/timepicker_field";
import { ShiftItem } from "../components/shiftsItem";
import { DeleteDialog } from "../components/delete_dialog";
import { DeleteEntireShiftDialog } from "../components/deleteEntire_dialog";
import { EditForm, ShiftTypes } from "../types/shiftsUpdate.type";

const ShiftsUpdateDel = () => {
  const dispatch = useDispatch();
  const { data } = useShifts.useGetShifts();
  const { mutate: updateShift } = useShifts.useUpdateShift();
  const { mutate: deleteShift } = useShifts.useDeleteShift();
  const { mutate: deleteShiftDay } = useShifts.useDeleteShiftDay();
  const selectedShift = useSelector(selectSelectedShift);
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
    return Array.from(new Set(data.map((item: ShiftTypes) => item.name)));
  }, [data]);

  const filteredShiftData = useMemo(() => {
    if (!data || !selectedShift || !Array.isArray(data)) return [];
    return data.filter((item: ShiftTypes) => item.name === selectedShift);
  }, [data, selectedShift]);

  const defaultTimes = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return { start_time: "08:00:00", end_time: "17:00:00" };
    }
    const firstShift = data[0];
    return {
      start_time: firstShift.shift_dates[0]?.start_time || "08:00:00",
      end_time: firstShift.shift_dates[0]?.end_time || "17:00:00",
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
    (item: ShiftTypes) => {
      dispatch(setEditingId(item.id));
      const firstShiftDate = item.shift_dates[0];
      dispatch(
        setEditForm({
          start_time: firstShiftDate?.start_time || "08:00:00",
          end_time: firstShiftDate?.end_time || "17:00:00",
          work_day: firstShiftDate?.work_day || false,
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
    (field: string, value: string) => {
      dispatch(updateEditForm({ [field]: value }));
    },
    [dispatch]
  );

  const handleDeleteClick = useCallback(
    (item: ShiftTypes) => {
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
      const shiftId = filteredShiftData[0].id;
      deleteShift({ id: shiftId.toString() });
    }
    dispatch(setDeleteEntireShiftDialogOpen(false));
  }, [dispatch, deleteShift, filteredShiftData]);

  const handleDeleteEntireShiftCancel = useCallback(() => {
    dispatch(setDeleteEntireShiftDialogOpen(false));
  }, [dispatch]);

  const handleSave = useCallback(
    (item: ShiftTypes) => {
      const firstShiftDate = item.shift_dates[0];
      updateShift({
        id: item.id.toString(),
        data: {
          start_time: editForm.start_time,
          end_time: editForm.end_time,
          work_day: editForm.work_day,
          day_of_week: firstShiftDate?.day_of_week || "",
          date: firstShiftDate?.date || "",
          shift: item.id,
        },
      });
      dispatch(setEditingId(null));
    },
    [updateShift, editForm, dispatch]
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
          onChange={(value) => dispatch(setSelectedShift(value))}
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
        onSearchChange={(value) => dispatch(setSearchQuery(value))}
        onItemClick={() => {}}
        onLoadMore={() => dispatch(setVisibleItems(visibleItems + 10))}
        renderItem={(item: ShiftTypes) => (
          <ShiftItem
            item={item}
            editingId={editingId}
            editForm={editForm}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onTimeChange={handleTimeChange}
            onDelete={handleDeleteClick}
            onSave={handleSave}
          />
        )}
      />

      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        shiftToDelete={shiftToDelete}
      />

      <DeleteEntireShiftDialog
        isOpen={deleteEntireShiftDialogOpen}
        onClose={handleDeleteEntireShiftCancel}
        onConfirm={handleDeleteEntireShiftConfirm}
        shiftName={selectedShift || ""}
      />
    </>
  );
};

export default ShiftsUpdateDel;
