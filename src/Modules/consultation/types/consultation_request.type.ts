import { DateObject } from "react-multi-date-picker";

export type ConsultationType = "ONLINE" | "IN_PERSON" | "PHONE";
export type TurnStatusType = "reserved" | "canceled" | "open" | "done";

export interface UserDataType {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
  email?: string;
  phone?: string;
}

export interface ConsultationRequestType {
  requestName: string;
  consultantId: string | number;
  consultationType: ConsultationType[];
  date: DateObject | null;
  startTime: DateObject | null;
  endTime: DateObject | null;
  description: string;
  isUrgent: boolean;
  status: TurnStatusType;
}

export interface ConsultantType {
  id: number;
  title: string;
  description: string;
  status: boolean;
  kind_of_consultant: string[];
  price: number;
  picture: string;
  created_at: string;
  updated_at: string;
}

export interface ConsultingReserveTurnType {
  id: number;
  consultant: ConsultantType;
  counseling_requester: UserDataType;
  date: string;
  status_of_turn: TurnStatusType;
  created_at: string;
  updated_at: string;
  expert: number | null;
}

export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
}

export interface ConsultationRequestFormPropsType {
  id?: string;
} 