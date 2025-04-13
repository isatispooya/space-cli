



export const translateCategory = (category: string): string => {
  const translations: Record<string, string> = {
    Finance: "امور مالی",
    Technology: "تکنولوژی",
    Legal: "حقوقی",
    Marketing: "بازاریابی",
    Healthcare: "سلامت",
  };
  return translations[category] || category;
};
