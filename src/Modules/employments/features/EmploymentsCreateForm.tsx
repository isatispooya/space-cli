const EmploymentsCreateForm = () => {
  const { mutate, isLoading, isError, error } = useEmployments.usePostJobOffer();

  const handleSubmit = (formData: EmploymentsPostTypes) => {
    mutate(formData, {
      onSuccess: () => {
        // Handle success (e.g., show notification, redirect)
      },
      onError: (error) => {
        // Handle error (e.g., show error message)
        console.error('Error posting job offer:', error);
      },
    });
  };

  // ... rest of your form component
}; 