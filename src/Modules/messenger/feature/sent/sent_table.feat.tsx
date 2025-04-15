import "moment/locale/fa";
import { TabulatorTable } from "../../../../components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
interface SentMessage {
  id: number;
  title: string;
  receiver: string;
  send_date: string;
  status: string;
  message_type: string;
}

declare global {
  interface Window {
    handleView: (message: SentMessage) => void;
  }
}

interface CellComponent {
  getElement: () => HTMLElement;
  getRow: () => { getData: () => SentMessage };
}

const staticData = [
  {
    id: 1,
    title: "پیام اول",
    receiver: "علی محمدی",
    send_date: "1403/01/15",
    status: "ارسال شده",
    message_type: "عادی",
  },
  {
    id: 2,
    title: "پیام دوم",
    receiver: "مریم احمدی",
    send_date: "1403/01/14",
    status: "در صف ارسال",
    message_type: "فوری",
  },
  {
    id: 3,
    title: "پیام سوم",
    receiver: "رضا کریمی",
    send_date: "1403/01/13",
    status: "ارسال شده",
    message_type: "عادی",
  },
];

export const SentTable = () => {
  const mappedData = useMemo(() => {
    return staticData.map((item) => ({
      id: item.id,
      title: item.title,
      receiver: item.receiver,
      send_date: item.send_date,
      status: item.status,
      message_type: item.message_type,
    }));
  }, []);
  const navigate = useNavigate();

  const handleView = (row: SentMessage) => {
    console.log("Viewing message:", row);
    navigate(`/letter-sent/message/${row.id}`);
  };
  const handleEdit = (row: SentMessage) => {
    console.log("Editing message:", row);
    navigate(`/letter-sent/update-form/${row.id}`);
  };

  const closeAllMenus = () => {
    const menus = document.querySelectorAll(".popup-menu");
    menus.forEach((menu) => menu.remove());
  };

  const columns = () => [
    { title: "عنوان", field: "title", headerFilter: true, hozAlign: "center" },
    {
      title: "گیرنده",
      field: "receiver",
      headerFilter: true,
      hozAlign: "center",
    },
    {
      title: "تاریخ ارسال",
      field: "send_date",
      headerFilter: true,
      hozAlign: "center",
    },
    { title: "وضعیت", field: "status", headerFilter: true, hozAlign: "center" },
    {
      title: "نوع پیام",
      field: "message_type",
      headerFilter: true,
      hozAlign: "center",
    },
    {
      title: "عملیات",
      formatter: () => {
        return '<button class="action-btn">⋮</button>';
      },
      hozAlign: "center",
      headerSort: false,
      width: 60,
      cellClick: function (e: Event, cell: CellComponent) {
        e.stopPropagation();

        const rowData = cell.getRow().getData();

        closeAllMenus();

        const menu = document.createElement("div");
        menu.className = "popup-menu";
        menu.setAttribute(
          "data-cell",
          cell.getElement().getAttribute("tabulator-field") || ""
        );

        const customMenuItems = [
          {
            label: "ویرایش",
            icon: "⚡",
            action: () => handleEdit(rowData),
          },
          {
            label: "نمایش",
            icon: "👀",
            action: () => handleView(rowData),
          },
        ];

        customMenuItems.forEach((item) => {
          const menuItem = document.createElement("button");
          menuItem.className = "menu-item";
          menuItem.innerHTML = `${item.icon} ${item.label}`;
          menuItem.onclick = () => {
            item.action();
            closeAllMenus();
          };
          menu.appendChild(menuItem);
        });

        const rect = cell.getElement().getBoundingClientRect();
        menu.style.left = `${rect.left + window.scrollX}px`;
        menu.style.top = `${rect.bottom + window.scrollY}px`;
        document.body.appendChild(menu);

        const handleScroll = () => {
          closeAllMenus();
          window.removeEventListener("scroll", handleScroll);
        };
        window.addEventListener("scroll", handleScroll);

        setTimeout(() => {
          const closeMenu = (e: MouseEvent) => {
            if (!menu.contains(e.target as Node)) {
              closeAllMenus();
              document.removeEventListener("click", closeMenu);
              window.removeEventListener("scroll", handleScroll);
            }
          };
          document.addEventListener("click", closeMenu);
        }, 0);
      },
    },
  ];

  window.handleView = handleView;

  const ExelData = (item: SentMessage) => {
    return {
      عنوان: item.title || "نامشخص",
      گیرنده: item.receiver || "نامشخص",
      تاریخ_ارسال: item.send_date || "نامشخص",
      وضعیت: item.status || "نامشخص",
      نوع_پیام: item.message_type || "نامشخص",
    };
  };

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData}
          columns={columns()}
          title="پیام های ارسالی"
          showActions={true}
          formatExportData={ExelData}
        />
      </div>
    </div>
  );
};
export default SentTable;
