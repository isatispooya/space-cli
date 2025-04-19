import { TabulatorTable } from "../../../../components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createActionMenu } from "../../../../components/table/actionMenus";
import { useReceive } from "../../hooks/receive";
interface RowData {
  id: number;
  sender: string;
  subject: string;
  date: string;
  status: string;
  priority: string;
}

const TableReceive = () => {
  const staticData = [
    {
      id: 1,
      sender: "علی محمدی",
      subject: "گزارش روزانه",
      date: "1403/01/15",
      status: "خوانده شده",
      priority: "بالا",
    },
    {
      id: 2,
      sender: "مریم احمدی",
      subject: "درخواست مرخصی",
      date: "1403/01/14",
      status: "خوانده نشده",
      priority: "متوسط",
    },
    {
      id: 3,
      sender: "رضا کریمی",
      subject: "جلسه هفتگی",
      date: "1403/01/13",
      status: "خوانده شده",
      priority: "پایین",
    },
  ];

  interface CellComponent {
    getElement: () => HTMLElement;
    getRow: () => { getData: () => RowData };
  }

  const navigate = useNavigate();

  const handleView = (row: RowData) => {
    console.log("مشاهده پیام:", row);
    navigate(`/letter-receive/message/${row.id}`);
  };

  const columns = () => [
    {
      title: "فرستنده",
      field: "sender",
      headerFilter: true,
      hozAlign: "center",
    },
    {
      title: "موضوع",
      field: "subject",
      headerFilter: true,
      hozAlign: "center",
    },
    { title: "تاریخ", field: "date", headerFilter: true, hozAlign: "center" },
    { title: "وضعیت", field: "status", headerFilter: true, hozAlign: "center" },
    {
      title: "اولویت",
      field: "priority",
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

  const mappedData = useMemo(() => staticData, []);

  const { getReceive } = useReceive();

  const { data } = getReceive();

  console.log(data);

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData}
          columns={columns()}
          title="پیام‌های دریافتی"
          showActions={true}
        />
      </div>
    </div>
  );
};

export default TableReceive;
