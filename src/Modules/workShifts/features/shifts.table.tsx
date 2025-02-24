import "moment/locale/fa";
import { TabulatorTable } from "../../../components";
import useShifts from "../hooks/useShifts";

const ShiftsTable = () => {
  const { data } = useShifts.useGetShifts();
  console.log(data);

  const mappedData = data?.map((item: any) => {
    return {
      id: item.id,
      shift_name: item.shift.name,
      date: item.date,
      start_time: item.start_time,
      end_time: item.end_time,
      work_day: item.work_day ? "بله" : "خیر",
      day_of_week: item.day_of_week,
    };
  });

  const columns = () => [
    { title: "شناسه", field: "id" },
    { title: "نام شیفت", field: "shift_name" },
    { title: "تاریخ", field: "date" },
    { title: "زمان شروع", field: "start_time" },
    { title: "زمان پایان", field: "end_time" },
    { title: "روز کاری", field: "work_day" },
    { title: "روز هفته", field: "day_of_week" },
  ];

  const ExelData = (data: any) => {
    return data.map((item: any) => ({
      شناسه: item.id,
      "نام شیفت": item.shift_name,
      تاریخ: item.date,
      "زمان شروع": item.start_time,
      "زمان پایان": item.end_time,
      "روز کاری": item.work_day,
      "روز هفته": item.day_of_week,
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
