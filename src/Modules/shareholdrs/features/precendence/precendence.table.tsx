import { usePrecendence } from "../../hooks";
import { PrecedenceTypes } from "../../types"; 
import { useNavigate } from "react-router-dom";
import "moment/locale/fa";
import { LoaderLg } from "../../../../components";
import TabulatorTable from "../../../../components/table/table.com";
import { ColumnDefinition } from "tabulator-tables";
import { createRoot } from "react-dom/client";
import { ActionMenu } from "../../../../components/table/tableaction";
import { CellComponent } from "tabulator-tables";

const PrecendenceTable: React.FC = () => {
  const { data, isPending } = usePrecendence.useGet();
  const navigate = useNavigate();

  const mappedData =
    data?.map((item: PrecedenceTypes) => ({
      id: item.id,
      first_name: (item.user_detail as { first_name: string }).first_name,
      last_name: (item.user_detail as { last_name: string }).last_name,
      uniqueIdentifier: (item.user_detail as { uniqueIdentifier: string })
        .uniqueIdentifier,
      company_name: (item.company_detail as { name: string }).name,
      precedence: item.precedence,
      total_amount: item.total_amount,
      updated_at: item.updated_at,
    })) || [];

  const columns = (): ColumnDefinition[] => [
    {
      field: "first_name",
      title: "نام",
      width: 100,
      headerFilter: true,
    },
    {
      field: "last_name",
      title: "نام خانوادگی",
      width: 200,
      headerFilter: true,
    },
    {
      field: "uniqueIdentifier",
      title: "کدملی",
      headerFilter: true,
    },
    {
      field: "company_name",
      title: "شرکت",
      headerFilter: true,
    },
    {
      field: "precedence",
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
      title: "تاریخ بروزرسانی",
      headerFilter: true,
    },
    {
      field: "عملیات",
      title: "عملیات",
      headerSort: false,
      headerFilter: undefined,
      width: 100,
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

  const ExelData = (item: PrecedenceTypes) => ({
    شناسه: item.id,
    نام: (item.user_detail as { first_name: string }).first_name,
    "نام خانوادگی": (item.user_detail as { last_name: string }).last_name,
    کدملی: (item.user_detail as { uniqueIdentifier: string }).uniqueIdentifier,
    "نام شرکت": (item.company_detail as { name: string }).name,
    "حق تقدم": item.precedence,
    "مبلغ کل": item.total_amount,
    "تاریخ ویرایش": item.updated_at,
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
export default PrecendenceTable;
