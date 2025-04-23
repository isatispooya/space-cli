import { TabulatorTable } from "../../../components";
import useTimeflow from "../hooks/usetimeflow";
import { TimeflowStatus } from "../data/timeflow_status";
import { TimeflowEvent } from "../types";
import {
  createActionMenu,
  MenuItem,
} from "../../../components/table/actionMenus";
import { useNavigate } from "react-router-dom";
import { RowComponent } from "tabulator-tables";

const UserTimeflowTable = () => {
  const { data } = useTimeflow.useGetUserAllTimeflow();
  const navigate = useNavigate();

  const getStatusName = (status: string) => {
    return TimeflowStatus.find((item) => item.value === status)?.name || status;
  };

  const exportData = (data: any[]) => {
    return data.map((item) => ({
      شناسه: item.id,
      نوع: item.type,
      "نام کاربر": item.userName,
      "نام کاربری": item.userUsername,
      "زمان کاربر": item.time_user,
      "زمان سیستم": item.time_system,
      "زمان ارشد": item.time_parent,
      "وضعیت خود": item.status_self,
      "وضعیت والد": item.status_parent,
      مرورگر: item.browser,
      "آدرس IP": item.ip_address,
    }));
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

  const mappedData = Array.isArray(data)
    ? data
        .filter((item: TimeflowEvent) => item.type !== "login_without_work")
        .map((item: TimeflowEvent) => ({
          id: item.id,
          type: getLabel(item.type),
          userName: `${item.user.first_name} ${item.user.last_name}`,
          userEmail: item.user.email,
          userUsername: item.user.username,
          time_user: new Date(item.time_user).toLocaleString("fa-IR"),
          time_system: new Date(item.time_system).toLocaleString("fa-IR"),
          time_parent: new Date(item.time_parent).toLocaleString("fa-IR"),
          time_device: new Date(item.time_device).toLocaleString("fa-IR"),
          status_parent: getStatusName(item.status_parent),
          browser: item.browser,
          ip_address: item.ip_address,
        }))
    : [];

  const handleRowAction = (e: MouseEvent, row: RowComponent) => {
    const items = [
      {
        label: "ویرایش",
        onClick: () => navigate(`/timeflow/edit/${row.getData().id}`),
      },
    ];

    createActionMenu({
      items: items as MenuItem[],
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
      title: "وضعیت والد",
      field: "status_parent",
      formatter: "lookup",
      formatterParams: Object.fromEntries(
        TimeflowStatus.map((status) => [status.value, status.name])
      ),
    },
    {
      title: "عملیات",
      field: "actions",
      hozAlign: "center",
      headerSort: false,
      cssClass: "cursor-pointer",
      formatter: () => {
        const element = document.createElement("button");
        element.style.display = "flex";
        element.style.border = "none";
        element.style.background = "transparent";
        element.style.cursor = "pointer";
        element.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="20" fill="currentColor">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34c.39-.39.39-1.02 
            0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        `;
        return element;
      },
      cellClick: handleRowAction,
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
          formatExportData={exportData}
        />
      </div>
    </div>
  );
};

export default UserTimeflowTable;
