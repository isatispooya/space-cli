import { create } from "zustand";
import { ShiftsStateType } from "../types";

const useShiftsStore = create<ShiftsStateType>()((set) => ({
  shiftName: "",
  shiftId: null,
  setShiftName: (name) => set({ shiftName: name }),
  setShiftId: (id) => set({ shiftId: id }),
  shiftDates: [],
  selectedShiftDate: null,
  setShiftDates: (dates) => set({ shiftDates: dates }),
  addShiftDate: (date) =>
    set((state) => {
      const currentShift = state.shiftDates[0]?.shift || 0;
      const existingShift = state.shiftDates.find(
        (s) => s.shift === currentShift
      );

      if (existingShift) {
        return {
          shiftDates: state.shiftDates.map((s) =>
            s.shift === currentShift ? { ...s, day: [...s.day, date] } : s
          ),
        };
      }

      return {
        shiftDates: [...state.shiftDates, { shift: currentShift, day: [date] }],
      };
    }),
  updateShiftDate: (date) =>
    set((state) => ({
      shiftDates: state.shiftDates.map((s) =>
        s.shift === date.shift ? date : s
      ),
    })),
  deleteShiftDate: (date) =>
    set((state) => ({
      shiftDates: state.shiftDates.map((s) => ({
        ...s,
        day: s.day.filter((d) => d.date !== date),
      })),
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
