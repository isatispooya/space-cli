import { create } from "zustand";


export const useShiftsFormStore = create<ShiftsFormState & ShiftsFormActions>(
  (set) => ({
    // Initial state
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

    // Actions implementation
    setShiftName: (name) => set({ shiftName: name }),
    setDates: (dates) => set({ dates }),
    setShifts: (shifts) => set({ shifts }),
    setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
    setError: (error) => set({ error }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setVisibleItems: (items) => set({ visibleItems: items }),
    incrementVisibleItems: (amount) =>
      set((state) => ({ visibleItems: state.visibleItems + amount })),
    setSelectedShift: (shift) => set({ selectedShift: shift }),
    setEditingId: (id) => set({ editingId: id }),
    setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
    setDeleteEntireShiftDialogOpen: (open) =>
      set({ deleteEntireShiftDialogOpen: open }),
    setShiftToDelete: (shift) => set({ shiftToDelete: shift }),
    setEditForm: (form) => set({ editForm: form }),
    updateEditForm: (form) =>
      set((state) => ({ editForm: { ...state.editForm, ...form } })),
  })
);

// =============================================
// Selectors
// =============================================

/**
 * Selectors for accessing specific parts of the store state
 * These can be used to optimize re-renders by selecting only needed state
 */
export const selectShiftsForm = (state: ShiftsFormState) => state;
export const selectShiftName = (state: ShiftsFormState) => state.shiftName;
export const selectDates = (state: ShiftsFormState) => state.dates;
export const selectShifts = (state: ShiftsFormState) => state.shifts;
export const selectIsSubmitting = (state: ShiftsFormState) =>
  state.isSubmitting;
export const selectError = (state: ShiftsFormState) => state.error;
export const selectSearchQuery = (state: ShiftsFormState) => state.searchQuery;
export const selectVisibleItems = (state: ShiftsFormState) =>
  state.visibleItems;
export const selectSelectedShift = (state: ShiftsFormState) =>
  state.selectedShift;
export const selectEditingId = (state: ShiftsFormState) => state.editingId;
export const selectDeleteDialogOpen = (state: ShiftsFormState) =>
  state.deleteDialogOpen;
export const selectDeleteEntireShiftDialogOpen = (state: ShiftsFormState) =>
  state.deleteEntireShiftDialogOpen;
export const selectShiftToDelete = (state: ShiftsFormState) =>
  state.shiftToDelete;
export const selectEditForm = (state: ShiftsFormState) => state.editForm;
