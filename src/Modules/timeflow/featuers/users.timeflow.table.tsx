import { TabulatorTable } from "../../../components";
import { ColumnDefinition } from "tabulator-tables";
import moment from "moment-jalaali";
import { LoaderLg } from "../../../components";
import { useTimeFlow } from "../hooks";
import { usersTimeflowType } from "../types";

const UsersTimeflowTable = () => {
  const { data, isLoading } = useTimeFlow.useGet();

  const mappedData = Array.isArray(data)
    ? data.map((item: usersTimeflowType) => ({
        id: item.id,
        date: moment(item.date).format("jYYYY/jMM/jDD"),
        firstLoginTime: item.login?.time,
        ip: item.login?.ip,
        device: item.login?.device,
        browser: item.login?.browser,
        os: item.login?.os,
        intermediate_logs: item.intermediate_logs,
        last_logout: item.logout?.time,
        logout_ip: item.logout?.ip,
        logout_device: item.logout?.device,
        logout_browser: item.logout?.browser,
        logout_os: item.logout?.os,
        fullName: item.user?.full_name,
        duration: item.duration,
        username: item.user?.username,
      }))
    : [];

  const columns = (): ColumnDefinition[] => [
    {
      field: "fullName",
      title: "نام و نام خانوادگی",
      headerFilter: true,
    },
    {
      field: "date",
      title: "تاریخ",
      headerFilter: true,
      formatter: (params) => {
        return moment(params).locale("fa").format("jYYYY/jMM/jDD");
      },
    },
    {
      field: "username",
      title: "کد ملی",
      headerFilter: true,
    },
    {
      field: "firstLoginTime",
      title: "زمان اولین ورود",
      headerFilter: true,
      formatter: (params) => {
        return moment(params).locale("fa").format("jYYYY/jMM/jDD");
      },
    },
    {
      field: "ip",
      title: "آی‌پی ورود",
      headerFilter: true,
    },
    {
      field: "device",
      title: "دستگاه ورود",
      headerFilter: true,
    },
    {
      field: "last_logout",
      title: "زمان خروج",
      headerFilter: true,
      formatter: (params) => {
        return moment(params).locale("fa").format("jYYYY/jMM/jDD/hh:mm:ss");
      },
    },
    {
      field: "logout_ip",
      title: "آی‌پی خروج",
      headerFilter: true,
    },
    {
      field: "logout_device",
      title: "دستگاه خروج",
      headerFilter: true,
    },

    {
      field: "duration",
      title: "زمان",
      headerFilter: true,
    },
  ];

  if (isLoading) {
    return <LoaderLg />;
  }

  return (
    <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData || []}
          columns={columns()}
          title="اطلاعات کاربران"
          showActions={true}
        />
      </div>
    </div>
  );
};

export default UsersTimeflowTable;
