export interface FormField {
  name: string;
  label: string;
  disabled?: boolean;
  accept?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    | "dynamic";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: any) => void;
}

export interface TransferListItem {
  id: number;
  name: string;
  codename: string;
}
