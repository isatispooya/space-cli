export interface ShiftDateType {
  id: string;
  date: string; // DateField
  start_time: string; // TimeField
  end_time: string; // TimeField
  work_day: boolean; // BooleanField
  day_of_week: string | null; // CharField
}

export interface ShiftsStateType {
  shiftName: string;
  shiftId: number | null;
  searchQuery: string;
  visibleItems: number;
  setShiftName: (name: string) => void;
  setShiftId: (id: number | null) => void;
  setSearchQuery: (query: string) => void;
  setVisibleItems: (items: number | ((prev: number) => number)) => void;
  shiftDates: ShiftDateType[];
  selectedShiftDate: ShiftDateType | null;
  setShiftDates: (dates: ShiftDateType[]) => void;
  addShiftDate: (date: ShiftDateType) => void;
  updateShiftDate: (date: ShiftDateType) => void;
  deleteShiftDate: (id: string) => void;
  setSelectedShiftDate: (date: ShiftDateType | null) => void;
  clearShiftDates: () => void;
  resetStore: () => void;
}
