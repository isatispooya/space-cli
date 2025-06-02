export const priorityOptions = [
  { label: "عادی", value: "normal" },
  { label: "فوری", value: "urgent" },
  { label: "خیلی فوری", value: "very_immediate" },
];

export const priorityDefault = "normal";

export const departmentOptions = [
  { label: "عادی", value: "normal" },
  { label: "محرمانه", value: "confidential" },
  { label: "سری", value: "secret" },
];

export const departmentDefault = "normal";

export const letterTypeOptions = [
  { label: "درخواست", value: "request" },
  { label: "اعلامیه", value: "announcement" }
];

export const letterTypeDefault = "request";

export const referralOptions = [
  { label: "جدید", value: "new" },
  { label: "عطف به", value: "referring_to" },
  { label: "پیرو", value: "following" },
  { label: "بازگشت به ", value: "return_to" },
  { label: "در پاسخ به", value: "in_response_to" },
  { label: "به پیوست", value: "attached_to" },
  { label: "اصلاحیه", value: "amendment" },
];

export const referralDefault = "new";

export const referralDetailsOptions = [
  { label: "مدیر عامل", value: "ceo" },
  { label: "معاون اداری", value: "admin_deputy" },
  { label: "معاون مالی", value: "financial_deputy" },
  { label: "مدیر منابع انسانی", value: "hr_manager" },
  { label: "مدیر فنی", value: "technical_manager" },
];

export const referralDetailsDefault = "ceo";
