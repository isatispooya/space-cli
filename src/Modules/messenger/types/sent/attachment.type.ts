export interface AttachmentType {
  id: number;
  name: string;
  file: string;
  size: number;
}

export interface CorrespondenceAttachmentType {
  id: number;
  name: string;
  file: string;
  size: number;
  user?: {
    first_name: string;
    last_name: string;
  };
}

export interface AttachmentDialogPropsType {
  open: boolean;
  onClose: () => void;
  onAttachmentAdd: (attachmentData: AttachmentType) => void;
}

export interface AttachmentFormDataType {
  attachments?: string[];
  [key: string]: string[] | string | number | boolean | undefined;
}

export interface AttachmentSectionPropsType {
  setOpenFileDialog: (open: boolean) => void;
  formData: AttachmentFormDataType;
  handleChange: (field: string, value: string[]) => void;
  attachments:string[]
  attachmentOptions: Array<{
    value: string;
    label: string;
  }>;
}
