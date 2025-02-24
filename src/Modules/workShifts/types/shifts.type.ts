
export interface Shift {
  date: string;
  shiftName: string;
  startTime: string | null;
  endTime: string | null;
  isWorkDay: boolean;
}
