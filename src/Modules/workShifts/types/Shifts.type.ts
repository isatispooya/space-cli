export interface GetShiftsResType {
  created_at: string;
  id: number;
  name: string;
  owner_details: { id: number; user?: Record<string, unknown> }[];
  updated_at: string;
}

export interface ShiftsReqType {
  name: string;
}

export interface ShiftDateReqType {
  shift: number;
  day: {
    date: string;
    start_time: string;
    end_time: string;
    work_day: boolean;
    day_of_week: string | null;
  }[];
}

export interface ShiftDateUpdateReqType {
  shift: number | undefined;
  date: string;
  start_time: string;
  end_time: string;
  work_day: boolean;
  day_of_week: string | null;
}

export interface ShiftDateUpdateResType {
  created_at: string;
  date: string;
  day_of_week: string | null;
  end_time: string;
  id: number;
  shift: number;
  start_time: string;
  updated_at: string;
  work_day: boolean;
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

export interface DeleteShiftReqType {
  id: string;
}

export interface DeleteShiftResType {
  message: string;
}

export interface PostAssignmentsReqType {
  position_id: number;
  shift_id: number;
}

export interface PostAssignmentsResType {
  id: number;
  position: number;
  shift: number;
  created_at: string;
  updated_at: string;
}

export type ShiftType = {
  getRes: GetShiftsResType;
  postReq: ShiftsReqType;
  postRes: GetShiftsResType;
  postDatesReq: ShiftDateReqType[];
  postDatesRes: ShiftDateResType[];
  datesRes: ShiftDateResType[];
  deleteReq: DeleteShiftReqType;
  deleteRes: DeleteShiftResType;
  assignReq: PostAssignmentsReqType;
  assignRes: PostAssignmentsResType;
  updateDatesReq: ShiftDateUpdateReqType;
  updateDatesRes: ShiftDateUpdateResType[];
};

export default ShiftType;
