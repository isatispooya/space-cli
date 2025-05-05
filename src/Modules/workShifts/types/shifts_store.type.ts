export interface ShiftDateType {
  date: string; // DateField
  start_time: string; // TimeField
  end_time: string; // TimeField
  work_day: boolean; // BooleanField
  day_of_week: string | null; // CharField
}

export type ShiftDateStructure = {
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
  shiftDates: ShiftDateStructure[];
  selectedShiftDate: ShiftDateType | null;
  setShiftDates: (dates: ShiftDateStructure[]) => void;
  addShiftDate: (date: ShiftDateType) => void;
  updateShiftDate: (date: ShiftDateStructure) => void;
  deleteShiftDate: (date: string) => void;
  setSelectedShiftDate: (date: ShiftDateType | null) => void;
  clearShiftDates: () => void;
  resetStore: () => void;
}
