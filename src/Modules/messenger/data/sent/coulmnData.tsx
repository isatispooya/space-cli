import { createActionMenu } from "@/components/table/actionMenus";
import { CellComponent } from "tabulator-tables";
import { SentMessageType } from "../../types/sent/sent.type";
import { letterTypeOptions } from "./sent.data";



interface ColumnPropsType {
  handleEdit: (id: number) => void;
  handleView: (row: SentMessageType) => void;
}

const columns = ({ handleEdit, handleView }: ColumnPropsType) => {
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
        values: handleEdit
      },
      headerFilter: "list",
      headerFilterParams: {
        valuesLookup: true,
        clearable: true
      },
      hozAlign: "center",
      formatter: (cell: CellComponent) => {
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
              label: "ویرایش",
              icon: "⚡",
              onClick: () => handleEdit(rowData.id),
            },
            {
              label: "نمایش",
              icon: "👀",
              onClick: () => handleView(rowData as SentMessageType),
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

export default columns;
