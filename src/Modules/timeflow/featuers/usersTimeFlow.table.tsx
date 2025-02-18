import { useTimeflow } from "../hooks";
import { TabulatorTable } from "../../../components";
import { CellComponent, ColumnDefinition } from "tabulator-tables";
import moment from "moment-jalaali";

const UsersTimeFlowTable = () => {
  const { data: userLogin } = useTimeflow.useGetUsersLogin();

  const mappedData = Array.isArray(userLogin?.other_logs)
    ? userLogin.other_logs.map((item) => ({
        user_first_name: item.user.first_name,
        user_last_name: item.user.last_name,
        browser: item.browser,
        device_type: item.device_type,
        id: item.id,
        ip_address: item.ip_address,
        os_type: item.os_type,
        status_parent: item.status_parent,
        status_self: item.status_self,
        time_device: item.time_device,
        time_parent: item.time_parent,
        time_system: item.time_system,
        time_user: item.time_user,
        type: item.type,
        user: item.user,
        user_agent: item.user_agent,
      }))
    : [];

  const columns = (): ColumnDefinition[] => [
    {
      title: "نام",
      field: "user_first_name",
      headerFilter: true,
    },
    {
      title: "نام خانوادگی",
      field: "user_last_name",
      headerFilter: true,
    },
    {
      title: "نوع دستگاه",
      field: "device_type",
      headerFilter: true,
    },
    {
      title: "زمان کاربر",
      field: "time_user",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        return moment(value).format("jYYYY/jMM/jDD HH:mm:ss");
      },
    },
    {
      title: "زمان والد",
      field: "time_parent",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        return moment(value).format("jYYYY/jMM/jDD HH:mm:ss");
      },
    },

    {
      title: "زمان سیستم",
      field: "time_system",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        return moment(value).format("jYYYY/jMM/jDD HH:mm:ss");
      },
    },
    {
      title: "وضعیت خود",
      field: "status_self",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        return value === "pending" ? "درحال بررسی" : value;
      },
    },
    {
      title: "وضعیت والد",
      field: "status_parent",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        return value === "pending" ? "درحال بررسی" : value;
      },
    },

    {
      title: "نوع",
      field: "type",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        return value === "login" ? "ورود" : "خروج";
      },
    },
  ];

  return (
    <>
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
    </>
  );
};

export default UsersTimeFlowTable;
