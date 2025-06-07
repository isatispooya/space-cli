export interface UserDetailType {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
    mobile?: string;
    last_seen?: string;
    online?: boolean;
    profile_image?: string;
    sheba_number?: string;
  }
  
  export interface PersonalInfoItemType {
    label: string;
    value: string | undefined;
  }
  
  export interface WorkSummaryType {
    month: string;
    dutyHours: string;
    workedHours: string;
    missionHours: string;
    leaveHours: string;
    absenceHours: string;
  }
  
  export interface TimeflowRecordType {
    id: number;
    date: string;
    timeIn: string;
    timeOut: string;
    type: string;
    notes: string;
  }