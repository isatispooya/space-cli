import { TabulatorFull as Tabulator } from "tabulator-tables";
import { useEffect, useRef } from "react";
import { useUnderwriting } from "../../hooks";
import { LoaderLg } from "../../../../components";
import moment from "moment-jalaali";
import { formatNumber } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { ActionMenu } from "../../../../components/tableaction/tableaction";
import { TableStyles } from "../../../../components/tabularStyle.tsx";

const UnderWritingTable: React.FC = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const { data, isPending } = useUnderwriting.useGet();
  const navigate = useNavigate();
  const hasStatusEditPermission = false;

  const renderActionColumn = () => ({
    title: "عملیات",
    field: "actions",
    headerSort: false,
    headerFilter: false,
    width: 100,
    hozAlign: "center",
    headerHozAlign: "center",
    formatter: () => `<button class="action-btn">⋮</button>`,
    cellClick: function (e: any, cell: any) {
      e.stopPropagation();
      const rowData = cell.getRow().getData();

      if (e.target.classList.contains("action-btn")) {
        const existingMenu = document.querySelector(".popup-menu");
        if (existingMenu) {
          existingMenu.remove();
          return;
        }

        const rect = e.target.getBoundingClientRect();
        const menuItems = [
          {
            icon: "fas fa-edit",
            label: "ویرایش",
            onClick: () => navigate(`/underwriting/update/${rowData.id}`),
            color: "#2563EB",
          },
          {
            icon: "fas fa-print",
            label: "چاپ",
            onClick: () => console.log("Print clicked"),
            color: "#DC2626",
          },
        ];

        const menuPosition = {
          x: rect.left - rect.left + 20,
          y: rect.bottom - rect.top + 85,
        };

        const menuContainer = document.createElement("div");
        e.target.closest(".tabulator-cell").appendChild(menuContainer);

        ReactDOM.render(
          <ActionMenu
            items={menuItems}
            position={menuPosition}
            onClose={() => menuContainer.remove()}
          />,
          menuContainer
        );
      }
    },
  });

  useEffect(() => {
    if (!tableRef.current || !data) return;

    console.log("Data received:", data);

    const table = new Tabulator(tableRef.current, {
      data: data.map((item) => ({
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
        status:
          item.status === "approved"
            ? "تایید شده"
            : item.status === "rejected"
            ? "رد شده"
            : item.status === "pending"
            ? "در انتظار"
            : item.status === "success"
            ? "تایید نهایی"
            : "در انتظار",
      })),
      columns: [
        {
          title: "نوع",
          field: "type_peyment",
          headerFilter: true,
          hozAlign: "center",
          headerHozAlign: "center",
        },
        {
          title: "مبلغ",
          field: "price",
          formatter: (cell) => formatNumber(cell.getValue()),
          headerFilter: true,
          hozAlign: "center",
          headerHozAlign: "center",
        },
        {
          title: "شماره پیگیری",
          field: "track_id",
          headerFilter: true,
          hozAlign: "center",
          headerHozAlign: "center",
        },
        {
          title: "نام",
          field: "first_name",
          headerFilter: true,
          hozAlign: "center",
          headerHozAlign: "center",
        },
        {
          title: "نام خانوادگی",
          field: "last_name",
          headerFilter: true,
          hozAlign: "center",
          headerHozAlign: "center",
        },
        {
          title: "تعداد درخواستی",
          field: "requested_amount",
          formatter: (cell) => formatNumber(cell.getValue()),
          headerFilter: true,
          hozAlign: "center",
          headerHozAlign: "center",
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
          hozAlign: "center",
          headerHozAlign: "center",
        },
        {
          title: "وضعیت",
          field: "status",
          headerFilter: true,
          hozAlign: "center",
          headerHozAlign: "center",
          editor: hasStatusEditPermission ? "list" : false,
          editorParams: {
            values: {
              "approved": "تایید شده",
              "rejected": "رد شده",
              "pending": "در انتظار",
              "success": "تایید نهایی"
            }
          },
          formatter: function(cell) {
            const value = cell.getValue();
            const statusMap: { [key: string]: string } = {
              "approved": "تایید شده",
              "rejected": "رد شده",
              "pending": "در انتظار",
              "success": "تایید نهایی"
            };
            return statusMap[value] || "در انتظار";
          }
        },
        renderActionColumn(),
      ],
      layout: "fitColumns",
      pagination: true,
      paginationSize: 10,
      paginationSizeSelector: [10, 20, 100],
      paginationButtonCount: 5,
      paginationAddRow: "page",
      paginationMode: "local",
      selectable: 1,
      rtl: true,
      rowClick: (e, row) => {
        navigate(`/underwriting/update/${row.getData().id}`);
      },
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
      rowFormatter: function (row) {
        row.getElement().style.transition = "all 0.3s ease";
      },
    });

    table.on("tableBuilt", function () {
      console.log("Table fully built");
    });

    return () => {
      table.destroy();
    };
  }, [data, hasStatusEditPermission]);

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
      <div className="w-full min-h-screen bg-white shadow-xl rounded-3xl relative p-8 flex flex-col">
        <div className="mb-8 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:scale-105 transform">
              <i className="fas fa-download"></i>
              دانلود اکسل
            </button>
          </div>
        </div>

        <div
          ref={tableRef}
          className="flex-1 rounded-2xl overflow-hidden shadow-md border border-gray-100 [&_.tabulator-header]:!bg-gray-50 [&_.tabulator-header_.tabulator-col]:!border-gray-200 [&_.tabulator-row]:!border-gray-100 [&_.tabulator-row.tabulator-row-even]:!bg-gray-50/30 [&_.tabulator-row]:hover:!bg-blue-50/50 [&_.tabulator-footer]:!bg-gray-50 [&_.tabulator]:!border-gray-200"
        />
      </div>
    </>
  );
};

export default UnderWritingTable;
