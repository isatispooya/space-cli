export * from "./create_company.type";
export * from "./ICreateCompaniesPost.type";
export type { CompanyData } from "./companyData.type";

export interface FormField {
  name: string;
  label: string;
  type:
    | "email"
    | "text"
    | "password"
    | "select"
    | "checkbox"
    | "transferList"
    | "number"
    | "viewFile"
    | "date"
    | "file";

  viewFileProps?: { showPreview: boolean; url: string; fileType: string };

  options?: { value: string; label: string }[];
  headerClassName?: string;
  disabled?: boolean;
  value?: unknown;
}
