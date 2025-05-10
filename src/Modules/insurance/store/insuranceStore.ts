import { create } from 'zustand';
import { InsuranceStateType } from '../types';



const initialState = {
  selectedInsurance: '',
  selectedCompanies: [],
  files: {},
  description: '',
  status: '',
  uploadedFiles: {},
  filesToDelete: [],
  uploadFile: null,
};

 const useInsuranceStore = create<InsuranceStateType>((set) => ({
  ...initialState,

  setSelectedInsurance: (value) => set({ selectedInsurance: value }),
  setSelectedCompanies: (companies) => set({ selectedCompanies: companies }),
  setFiles: (files) => set({ files }),
  addFile: (fieldId, file) => 
    set((state) => ({
      files: { ...state.files, [fieldId]: file }
    })),
  setDescription: (description) => set({ description }),
  setStatus: (status) => set({ status }),
  setUploadedFiles: (files) => set({ uploadedFiles: files }),
  addUploadedFile: (fieldId, fileUrl) =>
    set((state) => ({
      uploadedFiles: { ...state.uploadedFiles, [fieldId]: fileUrl }
    })),
  setFilesToDelete: (fieldIds) => set({ filesToDelete: fieldIds }),
  addFileToDelete: (fieldId) =>
    set((state) => ({
      filesToDelete: [...state.filesToDelete, fieldId]
    })),
  setUploadFile: (file) => set({ uploadFile: file }),
  resetStore: () => set(initialState),
}));

export default useInsuranceStore;
