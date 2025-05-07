import { CellComponent } from "../../types/receive/ReceiveMessage.type";
import { ReceiveMessage } from "../../types/receive/ReceiveMessage.type";
import { createActionMenu } from "@/components/table/actionMenus";
import { useNavigate } from "react-router-dom";
import {letterTypeOptions} from "../../data/sent/sent.data"


interface TabulatorCellFormatter {
  getValue: () => string;
}

const Columns = () => {
  const navigate = useNavigate();

  const handleView = (row: ReceiveMessage) => {
    navigate(`/letter/receive-message/${row.id}`);
  };

  // تهیه مقادیر برای فیلتر و ادیتور
  const editorValues: Record<string, string> = {};
  letterTypeOptions.forEach(option => {
    editorValues[option.value] = option.label;
  });

  return [
    { title: "عنوان", field: "title", headerFilter: true, hozAlign: "center" },
    {
      title: "شماره نامه",
      field: "number",
      headerFilter: true,
      hozAlign: "center",
    },
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
      title: "نوع نامه",
      field: "kind_of_correspondence",
      editor: "select",
      editorParams: {
        values: editorValues
      },
      headerFilter: "list",
      headerFilterParams: {
        valuesLookup: true,
        clearable: true
      },
      hozAlign: "center",
      formatter: (cell: TabulatorCellFormatter) => {
        const value = cell.getValue();
        const option = letterTypeOptions.find(opt => opt.value === value);
        return option ? option.label : value;
      }
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
};

export default Columns;
