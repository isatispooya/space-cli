export interface ShiftAssignTypes {
  created_at: string;
  date: string;
  day_of_week: string;
  end_time: string;
  id: number;
  start_time: string;
  updated_at: string;
  work_day: boolean;
  shift: {
    created_at: string;
    id: number;
    name: string;
    owner: number;
    updated_at: string;
  };
}

export interface ShiftAssignPostTypes {
  uniqueidentifier: string;
}

export interface AssignmentTypes {
  userId: number;
  userName: string;
  shiftId: number;
  shiftName: string;
  isRegistered: boolean;
  isEditing: boolean;
  assignmentId?: number;
}
