import { create } from 'zustand';
import {  ConsultationRequest, ConsultingReserveTurn } from '../../types/consultation_request.type';

interface ConsultationStore {
  consultationData: ConsultingReserveTurn | null;
  formData: ConsultationRequest;
  setConsultationData: (data: ConsultingReserveTurn | null) => void;
  setFormData: (data: Partial<ConsultationRequest>) => void;
  resetFormData: () => void;
}

const initialFormData: ConsultationRequest = {
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

export const useConsultationStore = create<ConsultationStore>((set) => ({
  consultationData: null,
  formData: initialFormData,
  
  setConsultationData: (data) => set({ consultationData: data }),
  
  setFormData: (data) => 
    set((state) => ({
      formData: { ...state.formData, ...data }
    })),
    
  resetFormData: () => set({ formData: initialFormData }),
}));
