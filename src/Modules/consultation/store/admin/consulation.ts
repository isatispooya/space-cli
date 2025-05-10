import { create } from 'zustand';
import {  ConsultationRequestType, ConsultingReserveTurnType } from '../../types/consultation_request.type';

interface ConsultationStoreType {
  consultationData: ConsultingReserveTurnType | null;
  formData: ConsultationRequestType;
  setConsultationData: (data: ConsultingReserveTurnType | null) => void;
  setFormData: (data: Partial<ConsultationRequestType>) => void;
  resetFormData: () => void;
}

const initialFormData: ConsultationRequestType = {
  requestName: "",
  consultantId: "",
  consultationType: [],
  date: null,
  startTime: null,
  endTime: null,
  description: "",
  isUrgent: false,
  status: "open",
};

export const useConsultationStore = create<ConsultationStoreType>((set) => ({
  consultationData: null,
  formData: initialFormData,
  
  setConsultationData: (data: ConsultingReserveTurnType | null) => set({ consultationData: data }),
  
  setFormData: (data) => 
    set((state) => ({
      formData: { ...state.formData, ...data }
    })),
    
  resetFormData: () => set({ formData: initialFormData }),
}));
