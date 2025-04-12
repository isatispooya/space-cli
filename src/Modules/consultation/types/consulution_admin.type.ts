export interface AdminSubjectType {
    id: string;
    title: string;
    icon: string;
    description: string;
    category: string;
  }
  
  export interface AdminConsultantType {
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
  
  export type AdminConsultationUserType = {
    SubjectsType: AdminSubjectType[];
    ConsultantsType: AdminConsultantType[];
  };
