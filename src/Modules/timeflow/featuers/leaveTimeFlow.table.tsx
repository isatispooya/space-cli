import { ColumnDefinition } from "tabulator-tables";
import { PrivilegesTypes } from "../../points/types/pivileges.type";
import moment from "moment-jalaali";
import { TabulatorTable } from "../../../components";
import useLeaveTimeFlow from "../hooks/useleavetimeflow";

const LeaveTimeFlowTable = () => {
  const { data } = useLeaveTimeFlow();

  const mappedData = Array.isArray(data)
    ? data.map((item: PrivilegesTypes) => {
        console.log("Mapping Item:", item);
        return {
          point_1: (item?.mission_detail?.point_1 || 0) * (item.amount || 0),
          point_2: (item?.mission_detail?.point_2 || 0) * (item.amount || 0),
          created_at: item.created_at,
          description: item.description,
          id: item.id,
          mission: item.mission_detail.display_name,
          user_first_name: item.user_detail?.first_name,
          user_last_name: item.user_detail?.last_name,
          user_phone: item?.user_detail?.mobile,
        };
      })
    : [];

  const columns = (): ColumnDefinition[] => [
    { title: "نام", field: "user_first_name" },
    { title: "نام خانوادگی", field: "user_last_name" },
    { title: "تاریخ خروج", field: "user_phone" },
    { title: "تاریخ ورود", field: "mission" },
    { title: "مدت زمان", field: "description" },
    { title: "علت", field: "description" },

    {
      title: "تاریخ ایجاد",
      field: "created_at",
      formatter: (cell) => moment(cell.getValue()).format("jYYYY/jMM/jDD"),
    },
  ];

  const ExelData = (item: PrivilegesTypes) => {
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

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData || []}
          columns={columns()}
          title="اطلاعات کاربران"
          showActions={true}
          formatExportData={ExelData}
        />
      </div>
    </div>
  );
};
export default LeaveTimeFlowTable;
