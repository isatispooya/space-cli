import { DateObject } from "react-multi-date-picker";
import WorkShiftTypes, { shiftTypes } from "./workShiftTypes";

export interface statesTypes {
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


export interface SetStatesTypes {
    // Form data actions
    setShiftName: (name: string) => void;
    setDates: (dates: DateObject[]) => void;
    setShifts: (shifts: WorkShiftTypes["FormShiftState"][]) => void;
  
    // UI state actions
    setIsSubmitting: (isSubmitting: boolean) => void;
    setError: (error: string | null) => void;
    setSearchQuery: (query: string) => void;
    setVisibleItems: (items: number) => void;
    incrementVisibleItems: (amount: number) => void;
    setSelectedShift: (shift: string) => void;
    setEditingId: (id: number | null) => void;
  
    // Dialog actions
    setDeleteDialogOpen: (open: boolean) => void;
    setDeleteEntireShiftDialogOpen: (open: boolean) => void;
    setShiftToDelete: (shift: shiftTypes | null) => void;
  
    // Edit form actions
    setEditForm: (form: {
      start_time: string;
      end_time: string;
      work_day: boolean;
    }) => void;
    updateEditForm: (
      form: Partial<{ start_time: string; end_time: string; work_day: boolean }>
    ) => void;
  }