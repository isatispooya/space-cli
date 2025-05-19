export interface FormActionsPropsType {
  isEditMode: boolean;
  showPublishWarning: boolean;
  formData: {
    published: boolean;
  };
  onSubmit: () => void;
}
export interface FormContainerPropsType {
  children: React.ReactNode;
}
