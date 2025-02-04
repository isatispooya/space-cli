interface DescriptionDetail {
  description_user: string;
  description_expert: string; // Add this line

}

interface FileDetail {
  file_name: string;
  file_attachment: string;
}

export interface InsuranceUpdateTypes {
  insurance: string;
  insurance_status: string;
  insurance_name: string;
  description: string;
  insurance_name_file: File | null;
  insurance_name_draft_file: File | null;
  price: string;
  file_detail: FileDetail[];
  file_name: string;
  delete_files?: string[];

  files: {
    [fieldId: string]: File;
  };
  description_detail?: DescriptionDetail[];
}
