export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "select" | "checkbox" | "date";
  options?: { value: string | number; label: string }[];
  headerClassName?: string;
} 