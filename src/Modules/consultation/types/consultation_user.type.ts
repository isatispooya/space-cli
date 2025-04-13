export interface ConsultantType {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  experience: number;
  expertise: string[];
  hourlyRate: number;
  completedSessions: number;
  nextAvailable: string;
  availableSlots: string[];
  isOnline: boolean;
  status: string;
}

export interface SubjectsType {
  created_at?: string;
  updated_at?: string;
  description: string;
  kind_of_consultant: string[];
  picture: string;
  id: number;
  price: number;
  status: boolean;
  title: string;
}

export interface PostSubjectsResType {
  created_at: string;
  description: string;
  id: number;
  picture: string;
  price: number;
  status: boolean;
  title: string;
  updated_at: string;
  counseling_requester: {
    first_name: string;
    id: number;
    last_name: string;
    uniqueIdentifier: string;
  };
  date: null;
  expert: null;
  status_of_turn: "reserved";
}

export interface RequestsType {
  id: number;
  status_of_turn: string;
  created_at: string;
  updated_at: string;
  counseling_requester: {
    first_name: string;
    id: number;
    last_name: string;
    uniqueIdentifier: string;
  };
  consultant: SubjectsType;
  date: string | null;
  expert: string | null;
}

export type ConsultationUserType = {
  SubjectsType: SubjectsType[];
  ConsultantsType: ConsultantType[];
  PostSubjectsResType: PostSubjectsResType[];
  RequestsType: RequestsType[];
};
