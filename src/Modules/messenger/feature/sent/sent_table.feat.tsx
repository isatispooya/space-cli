import "moment/locale/fa";
import { TabulatorTable } from "../../../../components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createActionMenu } from "../../../../components/table/actionMenus";

import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import { CorrespondenceItem } from "../../types/sent/CorrespondenceAttache.type";

interface SentMessage {
  id: number;
  title: string;
  receiver: string;
  sender: string;
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

export const SentTable = () => {
  const { data: correspondence } =
    useCorrespondenceAttachment.useGetCorrespondence();
  const mappedData = useMemo(() => {
    if (!correspondence?.sender) return [];

    return correspondence.sender.map((item: CorrespondenceItem) => ({
      id: item.id,
      title: item.subject,
      sender:
        item.sender_details?.user?.first_name +
          " " +
          item.sender_details?.user?.last_name || "نامشخص",
      receiver:
        item.receiver_internal_details?.user?.first_name +
          " " +
          item.receiver_internal_details?.user?.last_name || "نامشخص",
      send_date: new Date(item.created_at).toLocaleDateString("fa-IR"),
      message_type: item.priority === "urgent" ? "فوری" : "عادی",
    }));
  }, [correspondence]);

  const navigate = useNavigate();
  const handleView = (row: SentMessage) => {
    navigate(`/letter-sent/message/${row.id}`);
  };
  const handleEdit = (row: SentMessage) => {
    navigate(`/letter-sent/update-form/${row.id}`);
  };

  const columns = () => [
    { title: "عنوان", field: "title", headerFilter: true, hozAlign: "center" },
    {
      title: "ارسال کننده",
      field: "sender",
      headerFilter: true,
      hozAlign: "center",
    },
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
      ارسال_کننده: item.sender || "نامشخص",
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
