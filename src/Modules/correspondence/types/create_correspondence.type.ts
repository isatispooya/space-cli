export interface CorrespondenceFormValues {
  title: string;
  sender: string;
  receiver: string;
  subject: string;
  content: string;
  priority: string;
  category: string;
  reference_number: string;
  attachments?: FileList;
}

export interface FormField {
  name: keyof CorrespondenceFormValues;
  label: string;
  type: string;
  options?: readonly {
    value: string;
    label: string;
  }[];
}

export interface CorrespondenceType {
  value: string;
  label: string;
} 