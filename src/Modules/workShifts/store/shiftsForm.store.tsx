// Redux implementation for shifts form
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateObject } from "react-multi-date-picker";
import { WorkShiftTypes, shiftTypes } from "../types";
import { RootState } from "@/store/store";

// Define the state interface
export interface ShiftsFormState {
  shiftName: string;
  dates: DateObject[];
  shifts: WorkShiftTypes["FormShiftState"][];
  isSubmitting: boolean;
  error: string | null;
  searchQuery: string;
  visibleItems: number;
  selectedShift: string;
  editingId: number | null;
  deleteDialogOpen: boolean;
  deleteEntireShiftDialogOpen: boolean;
  shiftToDelete: shiftTypes | null;
  editForm: {
    start_time: string;
    end_time: string;
    work_day: boolean;
  };
}

// Initial state
const initialState: ShiftsFormState = {
  shiftName: "",
  dates: [],
  shifts: [],
  isSubmitting: false,
  error: null,
  searchQuery: "",
  visibleItems: 10,
  selectedShift: "",
  editingId: null,
  deleteDialogOpen: false,
  deleteEntireShiftDialogOpen: false,
  shiftToDelete: null,
  editForm: {
    start_time: "08:00:00",
    end_time: "17:00:00",
    work_day: false,
  },
};

// Create the slice
export const shiftsFormSlice = createSlice({
  name: "shiftsForm",
  initialState,
  reducers: {
    setShiftName: (state, action: PayloadAction<string>) => {
      state.shiftName = action.payload;
    },
    setDates: (state, action: PayloadAction<DateObject[]>) => {
      state.dates = action.payload;
    },
    setShifts: (
      state,
      action: PayloadAction<WorkShiftTypes["FormShiftState"][]>
    ) => {
      state.shifts = action.payload;
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setVisibleItems: (state, action: PayloadAction<number>) => {
      state.visibleItems = action.payload;
    },
    incrementVisibleItems: (state, action: PayloadAction<number>) => {
      state.visibleItems += action.payload;
    },
    setSelectedShift: (state, action: PayloadAction<string>) => {
      state.selectedShift = action.payload;
    },
    setEditingId: (state, action: PayloadAction<number | null>) => {
      state.editingId = action.payload;
    },
    setDeleteDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.deleteDialogOpen = action.payload;
    },
    setDeleteEntireShiftDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.deleteEntireShiftDialogOpen = action.payload;
    },
    setShiftToDelete: (state, action: PayloadAction<shiftTypes | null>) => {
      state.shiftToDelete = action.payload;
    },
    setEditForm: (
      state,
      action: PayloadAction<{
        start_time: string;
        end_time: string;
        work_day: boolean;
      }>
    ) => {
      state.editForm = action.payload;
    },
    updateEditForm: (
      state,
      action: PayloadAction<
        Partial<{
          start_time: string;
          end_time: string;
          work_day: boolean;
        }>
      >
    ) => {
      state.editForm = { ...state.editForm, ...action.payload };
    },
  },
});

// Export actions
export const {
  setShiftName,
  setDates,
  setShifts,
  setIsSubmitting,
  setError,
  setSearchQuery,
  setVisibleItems,
  incrementVisibleItems,
  setSelectedShift,
  setEditingId,
  setDeleteDialogOpen,
  setDeleteEntireShiftDialogOpen,
  setShiftToDelete,
  setEditForm,
  updateEditForm,
} = shiftsFormSlice.actions;

// Export selectors
export const selectShiftsForm = (state: RootState) => state.shiftsForm;
export const selectShiftName = (state: RootState) => state.shiftsForm.shiftName;
export const selectDates = (state: RootState) => state.shiftsForm.dates;
export const selectShifts = (state: RootState) => state.shiftsForm.shifts;
export const selectIsSubmitting = (state: RootState) =>
  state.shiftsForm.isSubmitting;
export const selectError = (state: RootState) => state.shiftsForm.error;
export const selectSearchQuery = (state: RootState) =>
  state.shiftsForm.searchQuery;
export const selectVisibleItems = (state: RootState) =>
  state.shiftsForm.visibleItems;
export const selectSelectedShift = (state: RootState) =>
  state.shiftsForm.selectedShift;
export const selectEditingId = (state: RootState) => state.shiftsForm.editingId;
export const selectDeleteDialogOpen = (state: RootState) =>
  state.shiftsForm.deleteDialogOpen;
export const selectDeleteEntireShiftDialogOpen = (state: RootState) =>
  state.shiftsForm.deleteEntireShiftDialogOpen;
export const selectShiftToDelete = (state: RootState) =>
  state.shiftsForm.shiftToDelete;
export const selectEditForm = (state: RootState) => state.shiftsForm.editForm;

export default shiftsFormSlice.reducer;
