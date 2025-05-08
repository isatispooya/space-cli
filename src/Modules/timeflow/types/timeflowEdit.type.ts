import { Dayjs } from "dayjs";

export interface TimeflowEditType {
  id: number;
  time_user: string;
  type: string;
}

export interface TimeflowEditFormData {
  time_user: string;
  type: string;
}

export type TimeflowEditMoment = moment.Moment;
export type TimeflowEditDayjs = Dayjs;
