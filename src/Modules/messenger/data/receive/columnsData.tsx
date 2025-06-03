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

interface ColumnsProps {
  handlePublish: (id: number) => void;
  setArchiveModalOpen: (value: boolean) => void;
}

const Columns = ({ handlePublish, setArchiveModalOpen }: ColumnsProps) => {
  const pathname = window.location.pathname;

  const isDraftRoute = pathname === "/letter/draft";
  const isReceiveTableRoute =
    pathname === "/letter/Outreceive-table" || pathname === "/letter/receive-table";

  const letterTypeLabels = Object.fromEntries(
    letterTypeOptions.map(({ value, label }) => [value, label])
  );

  const departmentLabels = Object.fromEntries(
    departmentOptions.map(({ value, label }) => [value, label])
  );

  const handleCellClick = (e: UIEvent, cell: CellComponent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (!target.classList.contains("action-btn")) return;

    const existingMenu = document.querySelector(".popup-menu");
    if (existingMenu) {
      existingMenu.remove();
      return;
    }

    const rect = target.getBoundingClientRect();
    const rowData = cell.getRow().getData();

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
              label: "ویرایش",
              icon: "📝",
              onClick: () =>
                (window.location.href = `/letter/draft-form/${rowData.id}`),
            },
            {
              label: "انتشار",
              icon: "📤",
              onClick: () => handlePublish(rowData.id),
            },
          ]
        : [
            ...(isReceiveTableRoute
              ? [
                  {
                    label: "ارجاع",
                    icon: "📤",
                    onClick: () =>
                      (window.location.href = `/letter/receive-refferal/${rowData.id}`),
                  },
                  {
                    label: "گردش کار",
                    icon: "📊",
                    onClick: () =>
                      (window.location.href = `/letter/receive-workflow/${rowData.id}`),
                  },
                  {
                    label: "بایگانی",
                    icon: "📦",
                    onClick: () => setArchiveModalOpen(true),
                  },
                ]
              : []),
          ]),
    ];

    const menuContainer = document.createElement("div");
    menuContainer.className = "popup-menu";
    document.body.appendChild(menuContainer);

    const root = createRoot(menuContainer);
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuContainer.contains(event.target as Node)) {
        root.unmount();
        menuContainer.remove();
        document.removeEventListener("click", handleClickOutside);
      }
    };

    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    root.render(
      <ActionMenu
        items={menuItems}
        position={{ x: rect.left, y: rect.bottom }}
        onClose={() => {
          root.unmount();
          menuContainer.remove();
          document.removeEventListener("click", handleClickOutside);
        }}
      />
    );
  };

  return [
    ...(isReceiveTableRoute
      ? [
          {
            field: "seen",
            title: "",
            hozAlign: "center",
            width: 80,
            formatter: (cell: CellFormatterParamsType) => {
              const { seen } = cell.getRow().getData();
              const color = seen ? "#33cc33" : "#ff3333";
              return `<span style="color: ${color}; font-size: 18px;">●</span>`;
            },
          },
        ]
      : []),

    { title: "عنوان", field: "title", headerFilter: true, hozAlign: "center" },
    { title: "شماره نامه", field: "number", headerFilter: true, hozAlign: "center" },
    { title: "ارسال کننده", field: "sender", headerFilter: true, hozAlign: "center" },
    { title: "گیرنده", field: "receiver", headerFilter: true, hozAlign: "center" },
    {
      title: "نوع نامه",
      field: "kind_of_correspondence",
      editor: "select",
      editorParams: { values: letterTypeLabels },
      headerFilter: "list",
      headerFilterParams: { valuesLookup: true, clearable: true },
      hozAlign: "center",
      formatter: (cell: CellFormatterParamsType) =>
        letterTypeLabels[cell.getValue()] || cell.getValue(),
    },
    {
      title: "طبقه بندی",
      field: "confidentiality_level",
      editor: "select",
      editorParams: { values: departmentLabels },
      headerFilter: "list",
      headerFilterParams: { valuesLookup: true, clearable: true },
      hozAlign: "center",
      formatter: (cell: CellFormatterParamsType) =>
        departmentLabels[cell.getValue()] || cell.getValue(),
    },
    { title: "تاریخ ارسال", field: "send_date", hozAlign: "center" },
    {
      field: "عملیات",
      title: "عملیات",
      headerSort: false,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      formatter: () => `<button class="action-btn">⋮</button>`,
      cellClick: handleCellClick,
    },
  ];
};

export default Columns;
