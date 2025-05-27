import { CellComponent } from "tabulator-tables";
import { ReceiveMessageType } from "../../types/receive/ReceiveMessage.type";
import ActionMenu from "@/components/table/actionMenus";
import {
  departmentOptions,
  letterTypeOptions,
} from "../../data/sent/sent.data";
import { createRoot } from "react-dom/client";

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
  const isDraftRoute = window.location.pathname === "/letter/draft";

  const departmentValues: Record<string, string> = {};
  departmentOptions.forEach((option) => {
    departmentValues[option.value] = option.label;
  });
  const handleCellClick = (e: UIEvent, cell: CellComponent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (target.classList.contains("action-btn")) {
      const existingMenu = document.querySelector(".popup-menu");
      if (existingMenu) {
        existingMenu.remove();
        return;
      }

      const rect = target.getBoundingClientRect();
      const rowData = cell.getRow().getData();
      const currentPath = window.location.pathname;

      const menuItems = [
        {
          label: "نمایش",
          icon: "👁️",
          onClick: () =>
            (window.location.href = `/letter/receive-message/${rowData.id}`),
        },
        ...(isDraftRoute
          ? [
              {
                label: "پیش نویس",
                icon: "📝",
                onClick: () =>
                  (window.location.href = `/letter/update-form/${rowData.id}`),
              },
            ]
          : [
              ...(["/letter/table", "/letter/Outtable"].includes(currentPath)
                ? [
                    {
                      label: "ویرایش",
                      icon: "✏️",
                      onClick: () =>
                        (window.location.href = `/letter/update-form/${rowData.id}`),
                    },
                  ]
                : []),
              {
                label: "ارجاع",
                icon: "📤",
                onClick: () =>
                  (window.location.href = `/letter/receive-refferal/${rowData.id}`),
              },
            ]),
      ];

      const menuPosition = { x: rect.left, y: rect.bottom };
      const menuContainer = document.createElement("div");
      menuContainer.className = "popup-menu";
      document.body.appendChild(menuContainer);

      const handleClickOutside = (event: MouseEvent) => {
        if (!menuContainer.contains(event.target as Node)) {
          root.unmount();
          menuContainer.remove();
          document.removeEventListener("click", handleClickOutside);
        }
      };

      // یک وقفه کوتاه برای جلوگیری از اینکه کلیک فعلی منو را ببندد
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);

      const root = createRoot(menuContainer);
      root.render(
        <ActionMenu
          items={menuItems}
          position={menuPosition}
          onClose={() => {
            root.unmount();
            menuContainer.remove();
            document.removeEventListener("click", handleClickOutside);
          }}
        />
      );
    }
  };

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
      field: "عملیات",
      title: "عملیات",
      headerSort: false,
      headerFilter: undefined,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      formatter: () => `<button class="action-btn">⋮</button>`,
      cellClick: handleCellClick,
    },
  ];
};

export default Columns;
