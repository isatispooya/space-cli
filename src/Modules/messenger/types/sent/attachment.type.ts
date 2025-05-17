export interface AttachmentType {
  id: number;
  name: string;
  file: string;
}

export interface AttachmentDialogPropsType {
  open: boolean;
  onClose: () => void;
  onAttachmentAdd: (attachmentData: AttachmentType) => void;
}

export interface FormDataType {
  attachments?: string[];
  [key: string]: string[] | string | number | boolean | undefined;
}

export interface AttachmentSectionPropsType {
  setOpenFileDialog: (open: boolean) => void;
  formData: FormDataType;
  handleChange: (field: string, value: string[]) => void;
  attachmentOptions: Array<{
    value: string;
    label: string;
  }>;
}
