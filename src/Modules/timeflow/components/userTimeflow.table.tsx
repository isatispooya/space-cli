import { TabulatorTable } from "../../../components";
import useTimeflow from "../hooks/usetimeflow";
import { TimeflowStatus } from "../data/timeflow_status";
import { TimeflowEvent } from "../types";
import { createActionMenu } from "../../../components/table/actionMenus";
import { useNavigate } from "react-router-dom";
import { RowComponent } from "tabulator-tables";

const UserTimeflowTable = () => {
  const { data } = useTimeflow.useGetUserAllTimeflow();
  const navigate = useNavigate();

  const getStatusName = (status: string) => {
    return TimeflowStatus.find((item) => item.value === status)?.name || status;
  };

  const TYPE_LABEL = [
    {
      value: "login",
      label: "ورود",
    },
    {
      value: "logout",
      label: "خروج",
    },
  ];

  const getLabel = (value: string) => {
    return TYPE_LABEL.find((item) => item.value === value)?.label || value;
  };

  const mappedData = data?.map((item: TimeflowEvent) => ({
    id: item.id,
    type: getLabel(item.type),
    userName: `${item.user.first_name} ${item.user.last_name}`,
    userEmail: item.user.email,
    userUsername: item.user.username,
    time_user: new Date(item.time_user).toLocaleString("fa-IR"),
    time_system: new Date(item.time_system).toLocaleString("fa-IR"),
    time_parent: new Date(item.time_parent).toLocaleString("fa-IR"),
    time_device: new Date(item.time_device).toLocaleString("fa-IR"),
    status_self: getStatusName(item.status_self),
    status_parent: getStatusName(item.status_parent),
    browser: item.browser,
    ip_address: item.ip_address,
  }));

  const handleRowAction = (e: MouseEvent, row: RowComponent) => {
    const items = [
      {
        icon: "fas fa-eye",
        label: "ویرایش",
        onClick: () => navigate(`/timeflow/edit/${row.getData().id}`),
      },
    ];

    createActionMenu({
      items,
      position: { x: e.clientX, y: e.clientY },
      className: "rtl",
    });
  };

  const columns = () => [
    { title: "شناسه", field: "id" },
    { title: "نوع", field: "type" },
    { title: "نام کاربر", field: "userName" },
    { title: "زمان کاربر", field: "time_user" },
    { title: "زمان ارشد", field: "time_parent" },

    {
      title: "وضعیت خود",
      field: "status_self",
      formatter: "lookup",
      formatterParams: Object.fromEntries(
        TimeflowStatus.map((status) => [status.value, status.name])
      ),
    },
    {
      title: "وضعیت والد",
      field: "status_parent",
      formatter: "lookup",
      formatterParams: Object.fromEntries(
        TimeflowStatus.map((status) => [status.value, status.name])
      ),
    },
    {
      title: "عملیات",
      formatter: "buttonCross",
      width: 70,
      hozAlign: "center",
      cellClick: handleRowAction,
      cssClass: "cursor-pointer",
    },
  ];

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

export default UserTimeflowTable;
