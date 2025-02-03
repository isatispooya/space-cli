export interface InsuranceUpdateTypes {
  insurance: string;
  insurance_status: string;
  description: string;
  insurance_name_file: File;
  delete_files?: string[];
  files: {
    [fieldId: string]: File;
  };
}
