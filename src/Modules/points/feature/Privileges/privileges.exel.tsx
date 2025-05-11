import { ExelDataPrivilegesType } from "../../types/exelData.privileges"; 

export const ExelData = (item: ExelDataPrivilegesType) => {
  return {
    نام: item.user_first_name || "نامشخص",
    "نام خانوادگی": item.user_last_name || "نامشخص",
    "کد ملی": item.user_phone || "نامشخص",
    نوع: item.type || "نامشخص",
    توضیحات: item.description || "بدون توضیحات",
    سکه: item.point_1?.toString() || "0",
    بذر: item.point_2?.toString() || "0",
    "ثبت کننده": item.by_user_first_name && item.by_user_last_name
      ? `${item.by_user_first_name} ${item.by_user_last_name}`
      : "نامشخص",
  };
};


