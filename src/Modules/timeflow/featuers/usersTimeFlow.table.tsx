import { useTimeflow } from "../hooks";
import { TabulatorTable } from "../../../components";
import { ColumnDefinition } from "tabulator-tables";
import { UserTimeFlowType } from "../types";

const UsersTimeFlowTable = () => {
  const { data: userLogin } = useTimeflow.useGetUsersLogin();

  const mappedData = userLogin?.map((item: UserTimeFlowType) => ({
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
  }));

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
      title: "وضعیت والد",
      field: "status_parent",
      headerFilter: true,
    },
    {
      title: "وضعیت خود",
      field: "status_self",
      headerFilter: true,
    },
    {
      title: "زمان دستگاه",
      field: "time_device",
      headerFilter: true,
    },
    {
      title: "زمان والد",
      field: "time_parent",
      headerFilter: true,
    },
    {
      title: "زمان سیستم",
      field: "time_system",
      headerFilter: true,
    },
    {
      title: "زمان کاربر",
      field: "time_user",
      headerFilter: true,
    },
    {
      title: "نوع",
      field: "type",
      headerFilter: true,
    },
    {
      title: "کاربر",
      field: "user",
      headerFilter: true,
    },
    {
      title: "کاربر عامل",
      field: "user_agent",
      headerFilter: true,
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
