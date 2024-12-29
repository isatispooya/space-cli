export const formatNumber = (value: number) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const cleanNumber = (value: number) => String(value).replace(/,/g, "");
