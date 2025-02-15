import "moment/locale/fa";
import moment from "moment-jalaali";
import { ShareholdersTypes } from "../../types/shareholders.type";
import { useNavigate } from "react-router-dom";
import { useShareholders } from "../../hooks";
import { LoaderLg } from "../../../../components";
import { CellComponent, ColumnDefinition } from "tabulator-tables";
import TabulatorTable from "../../../../components/table/table.com";
import { createRoot } from "react-dom/client";
import { ActionMenu } from "../../../../components/table/tableaction";

const ShareholdTable: React.FC = () => {
  const { data: shareholders, isPending } = useShareholders.useGet();
  const navigate = useNavigate();

  const mappedData = shareholders?.map((row: ShareholdersTypes) => ({
    ...row,
    company_name: row?.company_detail?.name,
    company_type: row?.company_detail?.company_type,
    first_name: row?.user_detail?.first_name,
    last_name: row?.user_detail?.last_name,
    uniqueIdentifier: row?.user_detail?.uniqueIdentifier,
    id: row.id || Math.random(),
  }));

  const columns = (): ColumnDefinition[] => [
    {
      field: "company_name",
      title: "شرکت",
      headerFilter: true,
    },
    {
      field: "number_of_shares",
      title: "تعداد سهام",
      headerFilter: true,
    },
    {
      field: "first_name",
      title: "نام",
      headerFilter: true,
    },
    {
      field: "last_name",
      title: "نام خانوادگی",
      headerFilter: true,
    },
    {
      field: "uniqueIdentifier",
      title: "کدملی ",
      headerFilter: true,
    },
    {
      field: "precedence_count",
      title: "حق تقدم",
      headerFilter: true,
    },
    {
      field: "total_amount",
      title: "حق تقدم استفاده شده",
      headerFilter: true,
    },

    {
      field: "updated_at",
      title: "تاریخ ویرایش",
      formatter: (cell: CellComponent) => {
        const rowData = cell.getRow().getData();
        return moment(rowData.updated_at).locale("fa").format("jYYYY/jMM/jDD");
      },
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
          icon: "fas fa-print",
          label: "چاپ",
          onClick: () => {
            navigate(`/precendence/print/${rowData.id}`);
          },
          color: "#DC2626",
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

  if (isPending) {
    return (
      <div className="flex justify-center mb-10 items-center h-full">
        <LoaderLg />
      </div>
    );
  }

  const ExelData = (item: ShareholdersTypes) => ({
    "نام شرکت": item.company_detail?.name,
    "نوع شرکت": item.company_detail?.company_type,
    "تعداد سهام": item.number_of_shares,
    نام: item.user_detail?.first_name,
    "نام خانوادگی": item.user_detail?.last_name,
  });

  return (
    <>
      <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
        <div className="overflow-x-auto">
          <TabulatorTable
            data={mappedData || []}
            columns={columns()}
            title="اطلاعات کاربران"
            showActions={true}
            formatExportData={ExelData}
          />
        </div>
      </div>
    </>
  );
};

export default ShareholdTable;
