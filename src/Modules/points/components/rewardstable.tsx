import TabulatorTable from "../../../components/table/table.com";
import { PrivilegesTypes } from "../types";
import { ColumnDefinition } from "tabulator-tables";
import "moment/locale/fa";
import moment from "moment-jalaali";

const RewardsTable = () => {
  const { data } = {
    data: [
      {
        id: 1,
        amount: 10,
        created_at: new Date(),
        description: "توضیحات 1",
        mission_detail: {
          point_1: 5,
          point_2: 3,
          display_name: "ماموریت 1",
        },
        user_detail: {
          first_name: "علی",
          last_name: "احمدی",
          mobile: "09123456789",
        },
      },
      {
        id: 2,
        amount: 20,
        created_at: new Date(),
        description: "توضیحات 2",
        mission_detail: {
          point_1: 2,
          point_2: 4,
          display_name: "ماموریت 2",
        },
        user_detail: {
          first_name: "مریم",
          last_name: "محمدی",
          mobile: "09198765432",
        },
      },
    ],
  };

  const columns = (): ColumnDefinition[] => [
    { title: "نام", field: "user_first_name" },
    { title: "نام خانوادگی", field: "user_last_name" },
    { title: "شماره تماس", field: "user_phone" },
    { title: "ماموریت", field: "mission" },
    { title: "توضیحات", field: "description" },
    { title: "سکه", field: "point_1" },
    { title: "بذر", field: "point_2" },
    {
      title: "تاریخ ایجاد",
      field: "created_at",
      formatter: (cell) => moment(cell.getValue()).format("jYYYY/jMM/jDD"),
    },
  ];

  const mappedData = data?.map((item: PrivilegesTypes | any) => {
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
  });
  console.log("Mapped Data:", mappedData);

  const ExelData = (item: PrivilegesTypes) => {
    console.log("Formatting Item for Excel:", item);
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
          title="رفاهی"
          showActions={true}
          formatExportData={ExelData}
        />
      </div>
    </div>
  );
};
export default RewardsTable;
