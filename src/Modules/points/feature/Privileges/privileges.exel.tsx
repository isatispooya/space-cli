import { PrivilegesTypes } from "../../types/pivileges.type";

export const ExelData = (item: PrivilegesTypes) => {
  return {
    مقدار: item.amount || 0,
    تاریخ_ایجاد: item.created_at || "نامشخص",
    توضیحات: item.description || "بدون توضیحات",
    شناسه: item.id || "نامشخص",
    ماموریت: item.mission || "نامشخص",
    کاربر: item.user_detail?.first_name || "نامشخص",
    شماره_تماس: item?.user_detail?.mobile || "نامشخص",
    سکه: Number(item.mission_detail?.point_1 || 0) * Number(item.amount || 0),
    بذر: Number(item.mission_detail?.point_2 || 0) * Number(item.amount || 0),
  };
};
