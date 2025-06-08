import { TabulatorTable, LoaderLg, Taskbar } from "@/components";
import { useTimeflow } from "../hooks";
import { useNavigate } from "react-router-dom";
import moment from "moment-jalaali";
import { CornerLeftUp } from "lucide-react";
import { UsersTimeflowType } from "../types";
import TaskBarType from "@/components/taskbar/types/taskbar.type";
import { createCustomTools } from "@/components/taskbar/tools";
import { useRefresh } from "@/components/taskbar/tools/refresh";

interface TimeflowDataItemType {
  id: number;
  date: string;
  time_start: string;
  time_end: string;
  type: string;
  user_name: string;
  user_identifier: string;
  original_data: UsersTimeflowType;
}

const UserTimeflowReportTable = () => {
  const navigate = useNavigate();
  const { useGetTimeflow } = useTimeflow;
  const { data: timeflowData, isLoading, refetch } = useGetTimeflow();
  const { refresh } = useRefresh({
    onRefresh: () => {
      refetch();
    },
  });


  const USER_ID = timeflowData?.[0]?.user_id;

  if (isLoading) {
    return <LoaderLg />;
  }

  const mappedData: TimeflowDataItemType[] =
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

  const exportData = (
    data: TimeflowDataItemType[]
  ): TaskBarType["exportData"] => {
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

  const formattedData: TaskBarType["exportData"] = exportData(mappedData);

  const customTools = createCustomTools([
    {
      id: "'گرفتن گزارش یک ماهه",
      icon: <CornerLeftUp className="w-5 h-5" />,
      label: "مشاهده جزئیات",
      onClick: () => {
        navigate(`/timeflow-report/${USER_ID}`);
      },
      variant: "nav" as const,
      order: 1,
    },
  ]);

  return (
    <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="mb-4">
        <Taskbar
          items={[]}
          exportData={formattedData}
          onRefresh={refresh}
          exportOptions={{
            filename: "گزارش تردد ها.xlsx",
            sheetName: "گزارش تردد",
            dataFormatter: (item) => item,
          }}
          customTools={customTools}
        />
      </div>
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
