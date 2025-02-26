import { create } from "zustand";
import { DateObject } from "react-multi-date-picker";
import { WorkShiftTypes } from "../types";

interface ShiftsFormStore {
  shiftName: string;
  dates: DateObject[];
  shifts: WorkShiftTypes["FormShiftState"][];
  isSubmitting: boolean;
  error: string | null;
  searchQuery: string;
  visibleItems: number;

  setShiftName: (name: string) => void;
  setDates: (dates: DateObject[]) => void;
  setShifts: (shifts: WorkShiftTypes["FormShiftState"][]) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setVisibleItems: (count: number) => void;
}

 const useShiftsFormStore = create<ShiftsFormStore>((set) => ({
  shiftName: "",
  dates: [],
  shifts: [],
  isSubmitting: false,
  error: null,
  searchQuery: "",
  visibleItems: 10,

  setShiftName: (name) => set({ shiftName: name }),
  setDates: (dates) => set({ dates }),
  setShifts: (shifts) => set({ shifts }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setVisibleItems: (count) => set({ visibleItems: count }),
}));

export default useShiftsFormStore;
