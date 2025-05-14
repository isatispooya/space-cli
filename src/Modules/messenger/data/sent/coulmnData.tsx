import ActionMenu from "@/components/table/actionMenus";
import { CellComponent } from "tabulator-tables";
import { SentMessageType } from "../../types/sent/sent.type";
import { letterTypeOptions, departmentOptions } from "./sent.data";
import { createRoot } from "react-dom/client";

interface ColumnPropsType {
  handleEdit: (id: number) => void;
  handleView: (row: SentMessageType) => void;
}

const columns = ({ handleEdit, handleView }: ColumnPropsType) => {
  const handleCellClick = (e: UIEvent, cell: CellComponent) => {
    e.stopPropagation();
    if ((e.target as HTMLElement).classList.contains("action-btn")) {
      const existingMenu = document.querySelector(".popup-menu");
      if (existingMenu) {
        existingMenu.remove();
        return;
      }

      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const rowData = cell.getRow().getData();

      const menuItems = [
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
      ];

      const menuPosition = { x: rect.left, y: rect.bottom };
      const menuContainer = document.createElement("div");
      menuContainer.className = "popup-menu";
      document.body.appendChild(menuContainer);

      const root = createRoot(menuContainer);
      root.render(
        <ActionMenu
          items={menuItems}
          position={menuPosition}
          onClose={() => {
            root.unmount();
            menuContainer.remove();
          }}
        />
      );
    }
  };
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
      title: "نوع نامه",
      field: "kind_of_correspondence",
      editor: "select",
      editorParams: {
        values: handleEdit,
      },
      headerFilter: "list",
      headerFilterParams: {
        valuesLookup: true,
        clearable: true,
      },
      hozAlign: "center",
      formatter: (cell: CellComponent) => {
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
        values: departmentOptions,
      },
      headerFilter: "list",
      headerFilterParams: {
        valuesLookup: true,
        clearable: true,
      },
      hozAlign: "center",
      formatter: (cell: CellComponent) => {
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
      field: "عملیات",
      title: "عملیات",
      headerSort: false,
      headerFilter: undefined,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      formatter: () => `<button class="action-btn">⋮</button>`,
      cellClick: handleCellClick,
    },
    // {
    //   title: "عملیات",
    //   formatter: () => {
    //     return '<button class="action-btn">⋮</button>';
    //   },
    //   hozAlign: "center",
    //   headerSort: false,
    //   width: 60,
    //   cellClick: function (e: Event, cell: CellComponent) {
    //     e.stopPropagation();
    //     const rowData = cell.getRow().getData();
    //     const element = cell.getElement();
    //     const rect = element.getBoundingClientRect();

    //     createActionMenu({
    //       items: [
    //         {
    //           label: "ویرایش",
    //           icon: "⚡",
    //           onClick: () => handleEdit(rowData.id),
    //         },
    //         {
    //           label: "نمایش",
    //           icon: "👀",
    //           onClick: () => handleView(rowData as SentMessageType),
    //         },
    //       ],
    //       position: {
    //         x: rect.left + window.scrollX,
    //         y: rect.bottom + window.scrollY,
    //       },
    //     });
    //   },
    // },
  ];
};

export default columns;
