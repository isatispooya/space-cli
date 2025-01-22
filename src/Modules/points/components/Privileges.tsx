import usePoint from "../hooks/usePoint";
import TabulatorTable from "../../../components/table/table.com";
import { PrivilegesTypes } from "../types";
import { ColumnDefinition } from "tabulator-tables";
import "moment/locale/fa";
import moment from "moment-jalaali";

const PrivilegesComponent = () => {

    
  const { data } = usePoint.useGetPoint();

  const columns = (): ColumnDefinition[] => [
    { title: "ماموریت", field: "mission" },
    { title: "سکه", field: "point_1" },
    { title: "بذر", field: "point_2" },
    { title: "شماره تماس", field: "user_phone" },
    {
      title: "تاریخ ایجاد",
      field: "created_at",
      formatter: (cell) => moment(cell.getValue()).format("jYYYY/jMM/jDD"),
    },
    { title: "کاربر", field: "user" },
    { title: "توضیحات", field: "description" },
    { title: "شناسه", field: "id" },
  ];

  const mappedData = data?.map((item: PrivilegesTypes) => ({
    point_1: item?.mission_detail.point_1 * item.amount,
    point_2: item?.mission_detail.point_2 * item.amount,
    created_at: item.created_at,
    description: item.description,
    id: item.id,
    mission: item.mission_detail.display_name,
    user: item.user_detail?.first_name + " " + item.user_detail?.last_name,
    user_phone: item?.user_detail?.mobile,
  }));

  const ExelData = (item: PrivilegesTypes) => ({
    مقدار: item.amount,
    تاریخ_ایجاد: item.created_at,
    توضیحات: item.description,
    شناسه: item.id,
    ماموریت: item.mission,
    کاربر: item.user_detail?.first_name,
    شماره_تماس: item?.user_detail?.mobile,
    سکه: item?.mission_detail.point_1 * item.amount,
    بذر: item?.mission_detail.point_2 * item.amount,
  });



  return (
    <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
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
export default PrivilegesComponent;
