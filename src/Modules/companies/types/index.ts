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
    | "number";
  options?: { value: string; label: string }[];
}
