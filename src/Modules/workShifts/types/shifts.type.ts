import { DateObject } from "react-multi-date-picker";

export interface ShiftDay {
  date: string;
  start_time: string | null;
  end_time: string | null;
  work_day: boolean;
}

export interface shift_detail {
  created_at: string;
  id: number;
  name: string;
  owner: number;
  updated_at: string;
}

export interface Shift {
  date: string;
  shiftName: string;
  startTime: DateObject | null;
  endTime: DateObject | null;
  isWorkDay: boolean;
  created_at: string;
  day_of_week: string | null;
  end_time: string | null;
  id: number | null;
  shift: shift_detail;
  updated_at: string | null;
  start_time: string | null;
  name: string | null;
  work_day: boolean | null;
}

export interface shiftCreate {
  shiftname: string;

  day: Shift[];
}

export interface ShiftResponse {
  id?: number;
  shift?: {
    id: number;
    name: string;
  };
  shift_detail: shift_detail;
  name?: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
}

export interface AssignShift {
  id: number;
  name: string;
}

export interface ShiftAssignPayload {
  id: string;
  data: AssignShift[];
}

export interface SetShiftUserType {
  shift_id: string;
  uniqueidentifier: string;
}

export interface updateShift {
  id: number;
  day: ShiftDay[];
}


export interface ShiftPayload {
  shiftname: string;
  day: {
    date: string;
    start_time: string | null;
    end_time: string | null;
    work_day: boolean;
  }[];
}

export interface ShiftState {
  date: string;
  shiftName: string;
  startTime: DateObject | null;
  endTime: DateObject | null;
  isWorkDay: boolean;
}