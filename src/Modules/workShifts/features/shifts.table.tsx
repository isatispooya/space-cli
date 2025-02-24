import "moment/locale/fa";
import { TabulatorTable } from "../../../components";

const ShiftsTable = () => {
  const data = [
    {
      firstName: "علی",
      lastName: "محمدی",
      nationalCode: "۱۲۳۴۵۶۷۸۹۰",
      date: "۱۴۰۳/۱۲/۰۵",
      shift: "صبح",
      entryTime: "۰۸:۰۰",
      exitTime: "۱۶:۰۰",
    },
    {
      firstName: "رضا",
      lastName: "رضایی",
      nationalCode: "۹۸۷۶۵۴۳۲۱۰",
      date: "۱۴۰۳/۱۲/۰۵",
      shift: "عصر",
      entryTime: "۱۶:۰۰",
      exitTime: "۲۴:۰۰",
    },
    {
      firstName: "مریم",
      lastName: "احمدی",
      nationalCode: "۴۵۶۱۲۳۷۸۹۰",
      date: "۱۴۰۳/۱۲/۰۶",
      shift: "شب",
      entryTime: "۰۰:۰۰",
      exitTime: "۰۸:۰۰",
    },
    {
      firstName: "حسین",
      lastName: "کریمی",
      nationalCode: "۳۲۱۷۸۹۴۵۶۰",
      date: "۱۴۰۳/۱۲/۰۶",
      shift: "صبح",
      entryTime: "۰۸:۰۰",
      exitTime: "۱۶:۰۰",
    },
  ];

  const mappedData = data?.map((item: any) => {
    return {
      first_name: item.firstName,
      last_name: item.lastName,
      national_code: item.nationalCode,
      date: item.date,
      shift: item.shift,
      entry_time: item.entryTime,
      exit_time: item.exitTime,
    };
  });

  const columns = () => [
    { title: "نام", field: "first_name" },
    { title: "نام خانوادگی", field: "last_name" },
    { title: "کد ملی", field: "national_code" },
    { title: "تاریخ", field: "date" },
    { title: "شیفت", field: "shift" },
    { title: "ساعت ورود", field: "entry_time" },
    { title: "ساعت خروج", field: "exit_time" },
  ];

  const ExelData = (data: any) => {
    return data.map((item: any) => ({
      نام: item.first_name,
      "نام خانوادگی": item.last_name,
      "کد ملی": item.national_code,
      تاریخ: item.date,
      شیفت: item.shift,
      "ساعت ورود": item.entry_time,
      "ساعت خروج": item.exit_time,
    }));
  };

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        {(data ?? []).length > 0 ? (
          <TabulatorTable
            data={mappedData || []}
            columns={columns()}
            title="اطلاعات کاربران"
            showActions={true}
            formatExportData={ExelData}
          />
        ) : (
          <div className="w-full flex flex-col justify-center items-center p-12 gap-4">
            <svg
              className="w-16 h-16 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-400 text-lg font-medium">
              اطلاعاتی موجود نیست
            </p>
            <p className="text-gray-300 text-sm">
              لطفاً بعداً دوباره تلاش کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ShiftsTable;
