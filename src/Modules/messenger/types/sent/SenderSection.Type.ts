import { APIFormDataType } from "./sent.type";

export interface SelectOptionType {
  label: string;
  value: string;
}

export interface SectionPropsType {
  formData: APIFormDataType;
  handleChange: (name: string, value: string | boolean | string[] | number) => void;
}

export interface SenderSectionPropsType extends SectionPropsType {
  senderUserOptions: SelectOptionType[];
  senderUserOptionsOut: SelectOptionType[];
  internalUserOptions: SelectOptionType[];
  senderSignerOptions: SelectOptionType[];
  ownerSignerOptions: SelectOptionType[];
  isEditMode: boolean;
}

export interface PrioritySectionPropsType extends SectionPropsType {
  priorityOptions: SelectOptionType[];
  departmentOptions: SelectOptionType[];
  letterTypeOptions: SelectOptionType[];
}
