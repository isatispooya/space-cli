export interface PrioritySectionType {
  formData: {
    priority?: string;
    confidentiality_level?: string;
    kind_of_correspondence?: string;
    [key: string]: unknown;
  };
  handleChange: (field: string, value: unknown) => void;
  priorityOptions: Array<{ value: string; label: string }>;
  departmentOptions: Array<{ value: string; label: string }>;
  letterTypeOptions: Array<{ value: string; label: string }>;
}
