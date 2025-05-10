import { create } from "zustand";
import { InsuranceRequestStoreType } from "../types";

const useInsuranceRStore = create<InsuranceRequestStoreType>((set) => ({
  selectedInsurance: "",
  setSelectedInsurance: (insurance: string) =>
    set({ selectedInsurance: insurance }),

  status: "",
  setStatus: (status: string) => set({ status }),
  files: {},
  setFiles: (files: Record<string, File>) => set({ files }),
  description: "",
  setDescription: (description: string) => set({ description }),
  draftFile: null,
  setDraftFile: (file: File | null) => set({ draftFile: file }),
  descriptionExpert: "",
  setDescriptionExpert: (description: string) =>
    set({ descriptionExpert: description }),
  uploadedFiles: {},
  setUploadedFiles: (files: Record<string, string>) =>
    set({ uploadedFiles: files }),
  filesToDelete: [],
  setFilesToDelete: (files: string[]) => set({ filesToDelete: files }),
  uploadFile: null,
  setUploadFile: (file: File | null) => set({ uploadFile: file }),
  price: 0,
  setPrice: (price: number) => set({ price }),
  isSubmitting: false,
  setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
}));

export default useInsuranceRStore;
