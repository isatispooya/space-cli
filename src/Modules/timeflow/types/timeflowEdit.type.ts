import { Dayjs } from "dayjs";

export interface TimeflowEditType {
  id: number;
  time_user: string;
  type: string;
}

export interface TimeflowEditFormDataType {
  time_user: string;
  type: string;
}

export type TimeflowEditMomentType = moment.Moment;
export type TimeflowEditDayjsType = Dayjs;
