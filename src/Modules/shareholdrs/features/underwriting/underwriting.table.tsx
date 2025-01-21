import {
  TabulatorFull as Tabulator,
  ColumnDefinition,
  CellComponent,
} from "tabulator-tables";
import { useEffect, useRef } from "react";
import { useUnderwriting } from "../../hooks";
import { LoaderLg } from "../../../../components";
import moment from "moment-jalaali";
import { formatNumber } from "../../../../utils";
import ReactDOM from "react-dom";
import { ActionMenu } from "../../../../components/tabulator/tableaction.tsx";
import { TableStyles } from "../../../../components/tabulator/tabularStyle.tsx";
import { useUserPermissions } from "../../../permissions/index.ts";
import * as XLSX from "xlsx";
import { underwritingTypes } from "../../types/underwriting.type";
import { useNavigate } from "react-router-dom";

const UnderWritingTable: React.FC = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const { data, isPending } = useUnderwriting.useGet();
  const { mutate: updateUnderwriting, isPending: isUpdating } =useUnderwriting.useUpdate();
  const navigate = useNavigate();
  const { checkPermission } = useUserPermissions();
  const hasEditPermission = checkPermission(["change_underwriting"]);

  const handleDownloadExcel = () => {
    if (!data) return;
    const exportData = data.map(formatExportData);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "underwriting-data.xlsx");
  };

  const formatExportData = (item: underwritingTypes) => ({
    نوع:
      item.type === "2"
        ? "درگاه پرداخت"
        : item.type === "1"
        ? "فیش بانکی"
        : "نامشخص",
    مبلغ: item.price || 0,
    "شماره پیگیری": item.payment_detail?.track_id,
    نام: item.user_detail?.first_name,
    "نام خانوادگی": item.user_detail?.last_name,
    "کد ملی": item.user_detail?.uniqueIdentifier,
    "تعداد درخواستی": item.requested_amount,
    "تاریخ ایجاد": moment(item.created_at)
      .locale("fa")
      .format("HH:mm - jYYYY/jMM/jDD"),
    وضعیت: formatStatus(item.status || ""),
  });

  const formatStatus = (status: string) => {
    switch (status) {
      case "approved":
        return "تایید شده";
      case "rejected":
        return "رد شده";
      case "pending":
        return "در انتظار";
      default:
        return "تایید نهایی";
    }
  };

  const renderActionColumn = (): ColumnDefinition => ({
    title: "عملیات",
    field: "actions",
    headerSort: false,
    headerFilter: false as any,
    width: 100,
    hozAlign: "center" as const,
    headerHozAlign: "center" as const,
    formatter: () => `<button class="action-btn">⋮</button>`,
    cellClick: handleCellClick,
  });

  const handleCellClick = (e: any, cell: CellComponent) => {
    e.stopPropagation();
    if (e.target.classList.contains("action-btn")) {
      const existingMenu = document.querySelector(".popup-menu");
      if (existingMenu) {
        existingMenu.remove();
        return;
      }
      const rect = e.target.getBoundingClientRect();
      const menuItems = [
        {
          icon: "fas fa-print",
          label: "چاپ",
          onClick: () => {
            const rowData = cell.getRow().getData();
            navigate(`/underwriting/print/${rowData.id}`);
          },
          color: "#DC2626",
        },
      ];
      const menuPosition = { x: rect.left, y: rect.bottom };
      const menuContainer = document.createElement("div");
      menuContainer.className = "popup-menu";
      document.body.appendChild(menuContainer);
      ReactDOM.render(
        <ActionMenu
          items={menuItems}
          position={menuPosition}
          onClose={() => menuContainer.remove()}
        />,
        menuContainer
      );
    }
  };

  useEffect(() => {
    if (!tableRef.current || !data) return;
    const table = new Tabulator(tableRef.current, {
      data: data.map(formatTableData),
      rowHeight: 40,
      layout: window.innerWidth <= 768 ? "fitDataTable" : "fitColumns",
      responsiveLayout: false,
      columns: getTableColumns(),
      pagination: true,
      paginationSize: 10,
      paginationSizeSelector: [10, 20, 100, 1000],
      paginationButtonCount: 5,
      paginationAddRow: "page",
      paginationMode: "local",
      selectable: 1,
      headerVisible: true,
      movableColumns: true,
      printAsHtml: true,
      printStyled: true,
      downloadConfig: {
        columnHeaders: true,
        columnGroups: false,
        rowGroups: false,
        columnCalcs: false,
        dataTree: false,
      },
      rowFormatter: (row) => {
        row.getElement().style.transition = "all 0.3s ease";
      },
    });

    table.on("tableBuilt", () => {
      console.log("Table fully built");
    });

    return () => {
      table.destroy();
    };
  }, [data, hasEditPermission]);

  const formatTableData = (item: underwritingTypes) => ({
    ...item,
    type_peyment:
      item.type === "2"
        ? "درگاه پرداخت"
        : item.type === "1"
        ? "فیش بانکی"
        : "نامشخص",
    track_id: item.payment_detail?.track_id,
    first_name: item.user_detail?.first_name,
    last_name: item.user_detail?.last_name,
    uniqueIdentifier: item.user_detail?.uniqueIdentifier,
  });

  const getTableColumns = (): ColumnDefinition[] => [
    {
      title: "نوع",
      field: "type_peyment",
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      headerFilter: "list" as const,
      headerFilterParams: {
        values: {
          "درگاه پرداخت": "درگاه پرداخت",
          "فیش بانکی": "فیش بانکی",
        },
      },
    },
    {
      title: "مبلغ",
      field: "price",
      formatter: (cell) => formatNumber(cell.getValue()),
      headerFilter: true,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
    },
    {
      title: "شماره پیگیری",
      field: "track_id",
      widthGrow: 2,
      headerFilter: true,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
    },
    {
      title: "نام",
      field: "first_name",
      headerFilter: true,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
    },
    {
      title: "نام خانوادگی",
      field: "last_name",
      headerFilter: true,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
    },
    {
      title: "کد ملی",
      field: "uniqueIdentifier",
      headerFilter: true,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
    },
    {
      title: "تعداد درخواستی",
      field: "requested_amount",
      formatter: (cell) => formatNumber(cell.getValue()),
      headerFilter: true,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
    },
    {
      title: "تاریخ ایجاد",
      field: "created_at",
      formatter: (cell) => {
        const date = moment(cell.getValue());
        return date.isValid()
          ? date.locale("fa").format("HH:mm - jYYYY/jMM/jDD")
          : "تاریخ نامعتبر";
      },
      headerFilter: true,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
    },
    {
      title: "وضعیت",
      field: "status",
      headerFilter: true,
      headerFilterParams: {
        values: {
          approved: "تایید شده",
          rejected: "رد شده",
          pending: "در انتظار",
          success: "تایید نهایی",
        },
      },
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      editor: hasEditPermission ? ("list" as const) : undefined,
      editorParams: hasEditPermission
        ? {
            values: {
              approved: "تایید شده",
              rejected: "رد شده",
              pending: "در انتظار",
              success: "تایید نهایی",
            },
          }
        : undefined,
      cellEdited: (cell: CellComponent) => {
        const rowData = cell.getRow().getData();
        const newValue = cell.getValue();
        updateUnderwriting({
          id: rowData.id,
          status: newValue,
          requested_amount: rowData.requested_amount || 0,
        });
      },
      formatter: (cell) => {
        const value = cell.getValue();
        const statusMap: { [key: string]: string } = {
          approved: "تایید شده",
          rejected: "رد شده",
          pending: "در انتظار",
          success: "تایید نهایی",
        };
        return isUpdating ? "در حال ویرایش" : statusMap[value];
      },
    },
    renderActionColumn(),
  ];

  if (isPending) {
    return (
      <div className="flex justify-center mb-10 items-center h-full">
        <LoaderLg />
      </div>
    );
  }

  return (
    <>
      <TableStyles />
      <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
        <div className="mb-8 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <button
              onClick={handleDownloadExcel}
              disabled={isPending}
              className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all duration-300 ${
                isUpdating
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg hover:scale-105 transform"
              }`}
            >
              <i className="fas fa-download"></i>
              دانلود اکسل
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div
            ref={tableRef}
            className="flex-1 rounded-2xl overflow-hidden shadow-md border border-gray-100 [&_.tabulator-header]:!bg-gray-50 [&_.tabulator-header_.tabulator-col]:!border-gray-200 [&_.tabulator-row]:!border-gray-100 [&_.tabulator-row.tabulator-row-even]:!bg-gray-50/30 [&_.tabulator-row]:hover:!bg-blue-50/50 [&_.tabulator-footer]:!bg-gray-50 [&_.tabulator]:!border-gray-200 [&_.tabulator-footer]:!overflow-x-auto [&_.tabulator-paginator]:!min-w-[600px]"
          />
        </div>
      </div>
    </>
  );
};

export default UnderWritingTable;
