export interface GetShiftsResType {
  created_at: string;
  id: number;
  name: string;
  owner: number;
  updated_at: string;
}

export interface ShiftsReqType {
  name: string;
}

export interface ShiftDateReqType {
  shift: number;
  date: string;
  start_time: string;
  end_time: string;
  work_day: boolean;
  day_of_week: string | null;
}

export interface ShiftDateResType {
  id: number;
  shift: number;
  date: string;
  start_time: string;
  end_time: string;
  work_day: boolean;
  day_of_week: string | null;
  created_at: string;
  updated_at: string;
}

export type ShiftTypes = {
  getRes: GetShiftsResType;
  postReq: ShiftsReqType;
  postRes: GetShiftsResType;
  postDatesReq: ShiftDateReqType[];
  postDatesRes: ShiftDateResType[];
  datesRes: ShiftDateResType[];
};

export default ShiftTypes;
