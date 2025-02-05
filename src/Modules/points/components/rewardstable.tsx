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
    {
      title: "نام",
      field: "name",
      hozAlign: "center",
      headerHozAlign: "center",
      headerFilter: true,
    },
    {
      title: "زمینه فعالیت",
      field: "feild_of_activity",
      hozAlign: "center",
      headerHozAlign: "center",
      headerFilter: true,
    },
    {
      title: "توضیحات",
      field: "description",
      hozAlign: "center",
      headerHozAlign: "center",
      headerFilter: true,
    },
    {
      title: "درصد تخفیف",
      field: "percent",
      hozAlign: "center",
      headerHozAlign: "center",
      headerFilter: true,
    },
    {
      title: "تعداد",
      field: "count",
      hozAlign: "center",
      headerHozAlign: "center",
      headerFilter: true,
    },
    {
      title: "وضعیت",
      field: "status",
      formatter: (cell) => (cell.getValue() ? "فعال" : "غیرفعال"),
      hozAlign: "center",
      headerHozAlign: "center",
      headerFilter: "input",
      headerFilterParams: {
        values: { true: "فعال", false: "غیرفعال" },
      },
    },
    {
      title: "تلفن",
      field: "telephone",
      hozAlign: "center",
      headerHozAlign: "center",
      headerFilter: true,
      formatter: (cell) =>
        `<div style="direction: ltr;">${cell.getValue()}</div>`,
    },
    {
      title: "آدرس",
      field: "address",
      hozAlign: "center",
      headerHozAlign: "center",
      headerFilter: true,
    },
    {
      title: "وب‌سایت",
      field: "website",
      formatter: (cell) =>
        `<a href="${cell.getValue()}" target="_blank" class="text-blue-600 hover:underline">${cell.getValue()}</a>`,
      hozAlign: "center",
      headerHozAlign: "center",
    },
    {
      title: "موقعیت",
      field: "location",
      formatter: (cell) =>
        `<a href="${cell.getValue()}" target="_blank" class="text-blue-600 hover:underline flex items-center gap-1 justify-center">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </a>`,
      hozAlign: "center",
      headerHozAlign: "center",
    },
    {
      title: "تاریخ شروع",
      field: "start_date",
      formatter: (cell) => moment(cell.getValue()).format("jYYYY/jMM/jDD"),
      hozAlign: "center",
      headerHozAlign: "center",
    },
    {
      title: "تاریخ پایان",
      field: "end_date",
      formatter: (cell) => moment(cell.getValue()).format("jYYYY/jMM/jDD"),
      hozAlign: "center",
      headerHozAlign: "center",
    },
  ];

  const mappedData = Welfare?.map((item: PrivilegesTypes) => {
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
