export const getValueLabel = (
  value: string | undefined,
  options: { label: string; value: string }[]
): string => {
  if (!value) return "---";
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
}; 