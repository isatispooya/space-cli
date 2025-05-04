import { create } from "zustand";
import { ShiftsStateType } from "../types";

export const useShiftsStore = create<ShiftsStateType>()((set) => ({
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
  resetStore: () =>
    set({
      shiftName: "",
      shiftId: null,
      shiftDates: [],
      selectedShiftDate: null,
    }),
}));
