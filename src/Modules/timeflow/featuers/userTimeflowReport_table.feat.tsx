import { TabulatorTable, LoaderLg } from "@/components";
import { useTimeflow } from "../hooks";

import moment from "moment-jalaali";

const UserTimeflowReportTable = () => {
  const { useGetTimeflow } = useTimeflow;
  const { data: timeflowData, isLoading } = useGetTimeflow();

  if (isLoading) {
    return <LoaderLg />;
  }

  const mappedData =
    timeflowData?.map((item) => ({
      id: item.id,
      date: moment(item.date.time_parent).format("jYYYY/jMM/jDD"),
      time_start: item.time_start,
      time_end: item.time_end,
      type:
        item.type === "absence"
          ? "غیبت"
          : item.type === "working"
          ? "کاری"
          : item.type === "no_shift"
          ? "غیر کاری"
          : item.type === "holiday"
          ? "روز تعطیل"
          : item.type,
      user_name: `${item.user_detail.first_name} ${item.user_detail.last_name}`,
      user_identifier: item.user_detail.uniqueIdentifier,
      original_data: item,
    })) || [];

  const exportData = (data: typeof mappedData) => {
    return data.map((item) => ({
      تاریخ: item.date,
      "ساعت شروع": item.time_start,
      "ساعت پایان": item.time_end,
      نوع: item.type,
      "نام کاربر": item.user_name,
      "کد ملی": item.user_identifier,
    }));
  };

  const columns = () => [
    { title: "تاریخ", field: "date" },
    { title: "ساعت شروع", field: "time_start" },
    { title: "ساعت پایان", field: "time_end" },
    { title: "نوع", field: "type" },
    { title: "نام کاربر", field: "user_name" },
  ];

  return (
    <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData}
          columns={columns()}
          title="گزارش تایم فلو"
          showActions={true}
          formatExportData={exportData}
        />
      </div>
    </div>
  );
};

export default UserTimeflowReportTable;
