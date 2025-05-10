export interface TimeflowDataType {
  id: number;
  date: string;
  time_start: string;
  time_end: string;
  type: string;
  typeRaw?: string;
  user_id: number;
  user_detail: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
}

export interface TimeflowVerifyType {
  date: string;
  time_start: string;
  time_end: string;
  type: string;
  time_user: string;
}

export interface TimeflowUpdateDataType {
  id: number;
  data: TimeflowVerifyType;
} 