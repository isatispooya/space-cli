import TabulatorTable from "../../../components/table/table.com";
import { ColumnDefinition } from "tabulator-tables";
import "moment/locale/fa";
import moment from "moment-jalaali";
import useWelfare from "../hooks/useWelfare";

export interface PrivilegesTypes {
  id: number;
  name: string;
  feild_of_activity: string;
  description: string;
  percent: number;
  count: number;
  status: boolean;
  telephone: string;
  address: string;
  website: string;
  location: string;
  start_date: string;
  end_date: string;
  created_at: string;
  field_of_activity: string;
}

const RewardsTable = () => {
  const { data: Welfare } = useWelfare();
  const columns = (): ColumnDefinition[] => [
    { title: "نام", field: "name" },
    { title: "زمینه فعالیت", field: "feild_of_activity" },
    { title: "توضیحات", field: "description" },
    { title: "درصد تخفیف", field: "percent" },
    { title: "تعداد", field: "count" },
    {
      title: "وضعیت",
      field: "status",
      formatter: (cell) => (cell.getValue() ? "فعال" : "غیرفعال"),
    },
    { title: "تلفن", field: "telephone" },
    { title: "آدرس", field: "address" },
    {
      title: "وب‌سایت",
      field: "website",
      formatter: (cell) =>
        `<a href="${cell.getValue()}" target="_blank" class="text-blue-600 hover:underline">${cell.getValue()}</a>`,
    },
    {
      title: "موقعیت",
      field: "location",
      formatter: (cell) =>
        `<a href="${cell.getValue()}" target="_blank" class="text-blue-600 hover:underline">مشاهده نقشه</a>`,
    },
    {
      title: "تاریخ شروع",
      field: "start_date",
      formatter: (cell) => moment(cell.getValue()).format("jYYYY/jMM/jDD"),
    },
    {
      title: "تاریخ پایان",
      field: "end_date",
      formatter: (cell) => moment(cell.getValue()).format("jYYYY/jMM/jDD"),
    },
    {
      title: "تاریخ ایجاد",
      field: "created_at",
      formatter: (cell) => moment(cell.getValue()).format("jYYYY/jMM/jDD"),
    },
  ];

  const mappedData = Welfare?.map((item: PrivilegesTypes | any) => {
    return {
      id: item.id,
      name: item.name,
      feild_of_activity: item.feild_of_activity,
      description: item.description,
      percent: item.percent,
      count: item.count,
      status: item.status,
      telephone: item.telephone,
      address: item.address,
      website: item.website,
      location: item.location,
      start_date: item.start_date,
      end_date: item.end_date,
      created_at: item.created_at,
    };
  });
  console.log("Mapped Data:", mappedData);

  const ExelData = (item: PrivilegesTypes) => {
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
