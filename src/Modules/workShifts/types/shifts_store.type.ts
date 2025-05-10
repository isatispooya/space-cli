export interface ShiftDateType {
  date: string; // DateField
  start_time: string; // TimeField
  end_time: string; // TimeField
  work_day: boolean; // BooleanField
  day_of_week: string | null; // CharField
}

export type ShiftDateStructureType = {
  shift: number;
  day: ShiftDateType[];
};

export interface ShiftsStateType {
  shiftName: string;
  shiftId: number | null;
  searchQuery: string;
  visibleItems: number;
  setShiftName: (name: string) => void;
  setShiftId: (id: number | null) => void;
  setSearchQuery: (query: string) => void;
  setVisibleItems: (items: number | ((prev: number) => number)) => void;
  shiftDates: ShiftDateStructureType[];
  selectedShiftDate: ShiftDateType | null;
  setShiftDates: (dates: ShiftDateStructureType[]) => void;
  addShiftDate: (date: ShiftDateType) => void;
  updateShiftDate: (date: ShiftDateStructureType) => void;
  deleteShiftDate: (date: string) => void;
  setSelectedShiftDate: (date: ShiftDateType | null) => void;
  clearShiftDates: () => void;
  resetStore: () => void;
}
