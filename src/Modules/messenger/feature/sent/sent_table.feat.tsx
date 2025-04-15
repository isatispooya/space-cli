import "moment/locale/fa";
import { TabulatorTable } from "../../../../components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createActionMenu } from "../../../../components/table/actionMenus";

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
        const element = cell.getElement();
        const rect = element.getBoundingClientRect();

        createActionMenu({
          items: [
            {
              label: "ویرایش",
              icon: "⚡",
              onClick: () => handleEdit(rowData),
            },
            {
              label: "نمایش",
              icon: "👀",
              onClick: () => handleView(rowData),
            },
          ],
          position: {
            x: rect.left + window.scrollX,
            y: rect.bottom + window.scrollY,
          },
        });
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
