export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "select" | "checkbox" | "transferList";
  options?: { label: string; value: any }[];
  transferListProps?: {
    leftTitle?: React.ReactNode;
    rightTitle?: React.ReactNode;
    leftItems: TransferListItem[];
    rightItems: TransferListItem[];
    searchPlaceholder?: string;
  };
}

export interface TransferListItem {
  id: number;
  name: string;
  codename: string;
} 