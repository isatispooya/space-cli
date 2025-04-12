export interface SubjectType {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: string;
}

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

export type ConsultationUserType = {
  SubjectsType: SubjectType[];
  ConsultantsType: ConsultantType[];
};
