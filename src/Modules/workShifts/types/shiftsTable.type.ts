export interface shiftTypes {
  id: number;
  shift: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    owner: number;
  };
  date: string;
  start_time: string;
  end_time: string;
  work_day: boolean;
  day_of_week: string;
  created_at: string;
  updated_at: string;
}
