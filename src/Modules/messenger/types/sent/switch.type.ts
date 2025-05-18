import { FormDataType } from "./sent.type";

export interface FormSwitchPropsType {
  formData: FormDataType;
  handleChange: (name: string, value: boolean) => void;
}

export interface FormSwitchItemType {
  field: "seal" | "signature" | "letterhead" | "binding" | "published";
  label: string;
}
