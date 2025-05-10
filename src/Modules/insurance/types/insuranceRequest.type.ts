export interface InsuranceRequestType {
  id: number; // شناسه یکتای درخواست بیمه
  insurance_name: string | number; // نام یا شناسه بیمه
  insurance_name_detail: {
    // جزئیات نام بیمه
    field_detail: Array<{
      // لیست فیلدهای مورد نیاز
      id: number; // شناسه فیلد
      name: string; // نام فیلد
    }>;
  };
  file_attachment?: string;
  description_detail?: Array<{
    // جزئیات توضیحات (اختیاری)
    description_user: string;
    description_expert: string;
  }>;
  file_detail?: Array<{
    // جزئیات فایل‌ها (اختیاری)
    file_name: number; // شناسه فایل
    file_attachment: string; // آدرس فایل پیوست شده
  }>;
  insurance_name_file?: string | File;
  insurance_name_draft_file?: string | File; // فایل بیمه‌نامه (اختیاری)
  user_detail: string; // جزئیات کاربر
  price: number; // قیمت
  insurance_status: string; // وضعیت بیمه
  button: string; // متن دکمه

  text: string; // متن توضیحات
}

export interface StatusTranslationType {
  text: string; // متن وضعیت
  button?: string; // متن دکمه (اختیاری)
  url?: string; // آدرس URL (اختیاری)
  status?: string; // وضعیت (اختیاری)
}

export interface InsuranceCompanyType {
  id: number; // شناسه شرکت بیمه
  name: string; // نام شرکت بیمه
}

export interface InsuranceFieldType {
  id: number; // شناسه فیلد بیمه
  name: string; // نام فیلد بیمه
  example_file?: string; // فایل نمونه (اختیاری)
}
