import { PrivilegesTypes } from "../../types/RewardsTable.type";
import moment from "moment-jalaali";

export const ExelData = (item: PrivilegesTypes) => {
  return {
    نام: item.name || "نامشخص",
    زمینه_فعالیت: item.feild_of_activity || "نامشخص",
    توضیحات: item.description || "بدون توضیحات",
    درصد_تخفیف: item.percent || 0,
    تعداد: item.count || 0,
    وضعیت: item.status ? "فعال" : "غیرفعال",
    تلفن: item.telephone || "نامشخص",
    آدرس: item.address || "نامشخص",
    وب_سایت: item.website || "نامشخص",
    موقعیت: item.location || "نامشخص",
    تاریخ_شروع: moment(item.start_date).format("jYYYY/jMM/jDD"),
    تاریخ_پایان: moment(item.end_date).format("jYYYY/jMM/jDD"),
    تاریخ_ایجاد: moment(item.created_at).format("jYYYY/jMM/jDD"),
  };
};
