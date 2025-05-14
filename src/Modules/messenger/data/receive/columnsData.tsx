import { CellComponent } from "tabulator-tables";
import { ReceiveMessageType } from "../../types/receive/ReceiveMessage.type";
import { createActionMenu } from "@/components/table/actionMenus";
import {
  departmentOptions,
  letterTypeOptions,
} from "../../data/sent/sent.data";

interface ExtendedReceiveMessageType extends ReceiveMessageType {
  seen?: boolean;
}

interface CellFormatterParamsType {
  getValue: () => string;
  getRow: () => { getData: () => ExtendedReceiveMessageType };
  getElement: () => HTMLElement;
}

const Columns = () => {
  const editorValues: Record<string, string> = {};
  letterTypeOptions.forEach((option) => {
    editorValues[option.value] = option.label;
  });

  const departmentValues: Record<string, string> = {};
  departmentOptions.forEach((option) => {
    departmentValues[option.value] = option.label;
  });

  return [
    {
      field: "seen",
      hozAlign: "center",
      formatter: (cell: CellFormatterParamsType) => {
        const row = cell.getRow().getData();

        if (row.seen) {
          return "<span style='color: #33cc33; font-size: 18px;'>●</span>";
        } else {
          return "<span style='color: #ff3333; font-size: 18px;'>●</span>";
        }
      },
      width: 80,
    },
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
      title: "نوع نامه",
      field: "kind_of_correspondence",
      editor: "select",
      editorParams: {
        values: editorValues,
      },
      headerFilter: "list",
      headerFilterParams: {
        valuesLookup: true,
        clearable: true,
      },
      hozAlign: "center",
      formatter: (cell: CellFormatterParamsType) => {
        const value = cell.getValue();
        const option = letterTypeOptions.find((opt) => opt.value === value);
        return option ? option.label : value;
      },
    },
    {
      title: "طبقه بندی",
      field: "confidentiality_level",
      editor: "select",
      editorParams: {
        values: departmentValues,
      },
      headerFilter: "list",
      headerFilterParams: {
        valuesLookup: true,
        clearable: true,
      },
      hozAlign: "center",
      formatter: (cell: CellFormatterParamsType) => {
        const value = cell.getValue();
        const option = departmentOptions.find((opt) => opt.value === value);
        return option ? option.label : value;
      },
    },
    {
      title: "تاریخ ارسال",
      field: "send_date",
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
        const rowData = cell.getRow().getData() as ExtendedReceiveMessageType;
        const element = cell.getElement();
        const rect = element.getBoundingClientRect();

        createActionMenu({
          items: [
            {
              label: "نمایش",
              icon: "👀",
              onClick: () => window.location.href = `/letter/receive-message/${rowData.id}`,
            },
            {
              label: "ارجاع",
              icon: "🔄",
              onClick: () => window.location.href = `/letter/receive-refferal/${rowData.id}`,
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
