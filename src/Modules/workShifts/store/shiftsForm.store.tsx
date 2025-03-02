// Redux implementation for shifts form
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateObject } from "react-multi-date-picker";
import { WorkShiftTypes } from "../types";
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

// Export reducer
export default shiftsFormSlice.reducer;
