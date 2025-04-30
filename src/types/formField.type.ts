/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormField {
  name: string;
  label: string;
  disabled?: boolean;
  accept?: string;
  defaultValue?: string;

  value?: any;
  type:
    | "text"
    | "email"
    | "password"
    | "select"
    | "checkbox"
    | "transferList"
    | "date"
    | "file"
    | "viewFile"
    | "dynamic"
    | "detail"
    | "multiSelect"
    | "timePicker"
    | "radio";

  options?: { label: string; value: any }[];
  transferListProps?: {
    leftTitle?: React.ReactNode;
    rightTitle?: React.ReactNode;
    leftItems: TransferListItem[];
    rightItems: TransferListItem[];
    searchPlaceholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    onChange?: (value: unknown) => void;
  };
  headerClassName?: string;
  viewFileProps?: {
    url?: string;
    fileType?: string;
    showPreview?: boolean;
  };
  dynamicProps?: {
    addButtonText: string;
    removeButtonText: string;
    maxFields?: number;
  };

  onChange?: (value: any) => void;
  fileProps?: {
    accept?: string;
    maxSize?: number;
    allowedTypes?: string[];
  };
  multiSelectProps?: {
    maxSelect?: number;
  };
  format?: (value: any) => any;
}

export interface TransferListItem {
  id: number;
  name: string;
  codename: string;
}
