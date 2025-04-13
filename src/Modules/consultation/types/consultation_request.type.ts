import { DateObject } from "react-multi-date-picker";

export type ConsultationType = "ONLINE" | "IN_PERSON" | "PHONE";
export type TurnStatus = "reserved" | "canceled" | "open" | "done";

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
  email?: string;
  phone?: string;
}

export interface ConsultationRequest {
  requestName: string;
  consultantId: string | number;
  consultationType: ConsultationType[];
  date: DateObject | null;
  startTime: DateObject | null;
  endTime: DateObject | null;
  description: string;
  isUrgent: boolean;
  status: TurnStatus;
}

export interface Consultant {
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

export interface ConsultingReserveTurn {
  id: number;
  consultant: Consultant;
  counseling_requester: UserData;
  date: string;
  status_of_turn: TurnStatus;
  created_at: string;
  updated_at: string;
  expert: number | null;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export interface ConsultationRequestFormProps {
  id?: string;
} 