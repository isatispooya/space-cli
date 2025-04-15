export type FormSwitchType = {
  field: "seal" | "signature" | "letterhead" | "binding";
  label: string;
};

export const FORM_SWITCHES: FormSwitchType[] = [
  { field: "seal", label: "مهر" },
  { field: "signature", label: "امضا" },
  { field: "letterhead", label: "سربرگ" },
  { field: "binding", label: "تعهد آور" },
];

export type TextAreaFieldType = {
  field: "text" | "description" | "postcript";
  label: string;
};

export const TEXT_AREA_FIELDS: TextAreaFieldType[] = [
  { field: "text", label: "متن پیام" },
  { field: "description", label: "توضیحات" },
  { field: "postcript", label: "پی نوشت" },
];