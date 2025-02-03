export interface InsuranceState {
  selectedInsurance: string;
  selectedCompanies: string[];
  files: Record<string, File>;
  description: string;
  status: string;
  uploadedFiles: Record<string, string>;
  filesToDelete: string[];
  uploadFile: File | null;

  setSelectedInsurance: (value: string) => void;
  setSelectedCompanies: (companies: string[]) => void;
  setFiles: (files: Record<string, File>) => void;
  addFile: (fieldId: string, file: File) => void;
  setDescription: (description: string) => void;
  setStatus: (status: string) => void;
  setUploadedFiles: (files: Record<string, string>) => void;
  addUploadedFile: (fieldId: string, fileUrl: string) => void;
  setFilesToDelete: (fieldIds: string[]) => void;
  addFileToDelete: (fieldId: string) => void;
  setUploadFile: (file: File | null) => void;
  resetStore: () => void;
}
