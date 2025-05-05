import { create } from "zustand";
import { ShiftsStateType } from "../types";

interface ExtendedShiftsStateType extends ShiftsStateType {
  searchQuery: string;
  visibleItems: number;
  setSearchQuery: (query: string) => void;
  setVisibleItems: (items: number | ((prev: number) => number)) => void;
}

const useShiftsStore = create<ExtendedShiftsStateType>()((set) => ({
  shiftName: "",
  shiftId: null,
  setShiftName: (name) => set({ shiftName: name }),
  setShiftId: (id) => set({ shiftId: id }),
  shiftDates: [],
  selectedShiftDate: null,
  setShiftDates: (dates) => set({ shiftDates: dates }),
  addShiftDate: (date) =>
    set((state) => ({
      shiftDates: [...state.shiftDates, date],
    })),
  updateShiftDate: (date) =>
    set((state) => ({
      shiftDates: state.shiftDates.map((d) => (d.id === date.id ? date : d)),
    })),
  deleteShiftDate: (id) =>
    set((state) => ({
      shiftDates: state.shiftDates.filter((d) => d.id !== id),
    })),
  setSelectedShiftDate: (date) => set({ selectedShiftDate: date }),
  clearShiftDates: () => set({ shiftDates: [] }),
  searchQuery: "",
  visibleItems: 10,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setVisibleItems: (items) =>
    set((state) => ({
      visibleItems:
        typeof items === "function" ? items(state.visibleItems) : items,
    })),
  resetStore: () =>
    set({
      shiftName: "",
      shiftId: null,
      shiftDates: [],
      selectedShiftDate: null,
      searchQuery: "",
      visibleItems: 10,
    }),
}));

export default useShiftsStore;
