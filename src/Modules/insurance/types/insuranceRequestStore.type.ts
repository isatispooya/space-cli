export interface InsuranceRequestStore {
  selectedInsurance: string;
  setSelectedInsurance: (insurance: string) => void;
  status: string;
  setStatus: (status: string) => void;
  files: Record<string, File>;
  setFiles: (files: Record<string, File>) => void;
  description: string;
  setDescription: (description: string) => void;
  draftFile: File | null;
  setDraftFile: (file: File | null) => void;
  descriptionExpert: string;
  setDescriptionExpert: (description: string) => void;
  uploadedFiles: Record<string, string>;
  setUploadedFiles: (files: Record<string, string>) => void;
  filesToDelete: string[];
  setFilesToDelete: (files: string[]) => void;
  uploadFile: File | null;
  setUploadFile: (file: File | null) => void;
  price: number;
  setPrice: (price: number) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}
