import "moment/locale/fa";
import moment from "moment-jalaali";
import { ShareholdersTypes } from "../../types/shareholders.type";
import { useShareholders } from "../../hooks";
import { LoaderLg } from "../../../../components";
import { CellComponent, ColumnDefinition } from "tabulator-tables";
import TabulatorTable from "../../../../components/table/table.com";
import { createRoot } from "react-dom/client";
import { ActionMenu } from "../../../../components/table/tableaction";
import ShareHoldersNewTypes from "../../types/shareHolderss.type";

const ShareholdTable: React.FC = () => {
  const { data: shareholders, isPending } = useShareholders.useGet();

  const mappedData = shareholders?.map((row: ShareHoldersNewTypes) => ({
    ...row,
    company: row.company_detail.name,
    company_type: row.company_detail.company_type,
    first_name: row.user_detail.first_name,
    last_name: row.user_detail.last_name,
    uniqueIdentifier: row.user_detail.uniqueIdentifier,
    number_of_shares: row.number_of_shares,
    precedence_count: row.precedence,
    precedence_used: row.used_precedence,
  }));

  const columns = (): ColumnDefinition[] => [
    {
      field: "company",
      title: "شرکت",
      headerFilter: "list",
      headerFilterParams: {
        values: Array.from(
          new Set(
            shareholders?.map(
              (row: ShareHoldersNewTypes) => row.company_detail.name
            )
          )
        ),
      },
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
      title: "کدملی",
      headerFilter: true,
    },
    {
      field: "precedence_count",
      title: "حق تقدم",
      headerFilter: true,
    },
    {
      field: "precedence_used",
      title: "حق تقدم استفاده شده",
      headerFilter: true,
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

  const handlePrint = (rowData: ShareholdersTypes) => {
    const printContent = `
      <html>
        <head>
          <title>چاپ اطلاعات سهامدار</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap');
            body {
              font-family: 'Vazirmatn', Arial, sans-serif;
              direction: rtl;
              padding: 40px;
              background-color: #f9fafb;
              color: #1f2937;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              padding: 30px;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
              text-align: center;
              color: #1e40af;
              font-size: 24px;
              margin-bottom: 30px;
              border-bottom: 2px solid #dbeafe;
              padding-bottom: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 16px;
            }
            th, td {
              padding: 12px 16px;
              text-align: right;
              border-bottom: 1px solid #e5e7eb;
            }
            th {
              background-color: #eff6ff;
              color: #1e40af;
              font-weight: 700;
              width: 30%;
            }
            td {
              background-color: #ffffff;
              color: #374151;
            }
            tr:last-child th, tr:last-child td {
              border-bottom: none;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #6b7280;
            }
            @media print {
              body { background-color: white; }
              .container { box-shadow: none; border: 1px solid #e5e7eb; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>اطلاعات سهامدار</h1>
            <table>
              <tr><th>شرکت</th><td>${
                rowData.company || rowData.company_detail?.name || "-"
              }</td></tr>
              <tr><th>تعداد سهام</th><td>${
                rowData.number_of_shares || "0"
              }</td></tr>
              <tr><th>نام</th><td>${
                rowData.first_name || rowData.user_detail?.first_name || "-"
              }</td></tr>
              <tr><th>نام خانوادگی</th><td>${
                rowData.last_name || rowData.user_detail?.last_name || "-"
              }</td></tr>
              <tr><th>کدملی</th><td>${
                rowData.uniqueIdentifier ||
                rowData.user_detail?.uniqueIdentifier ||
                "-"
              }</td></tr>
              <tr><th>حق تقدم</th><td>${
                rowData.precedence_count || rowData.precedence || "0"
              }</td></tr>
              <tr><th>حق تقدم استفاده شده</th><td>${
                rowData.precedence_used !== undefined
                  ? rowData.precedence_used
                  : rowData.used_precedence !== undefined
                  ? rowData.used_precedence
                  : "0"
              }</td></tr>
            </table>
            <div class="footer">
              چاپ شده در تاریخ: ${moment().locale("fa").format("jYYYY/jMM/jDD")}
            </div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

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
          onClick: () => handlePrint(rowData as ShareholdersTypes),
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
    "نام شرکت": item.company_detail?.name || item.company,
    "تعداد سهام": item.number_of_shares || 0,
    نام: item.user_detail?.first_name || item.first_name,
    "نام خانوادگی": item.user_detail?.last_name || item.last_name,
    کدملی: item.user_detail?.uniqueIdentifier || item.uniqueIdentifier || "-",
    "حق تقدم": item.precedence || item.precedence_count || 0,
    "حق تقدم استفاده شده":
      item.used_precedence !== undefined
        ? item.used_precedence
        : item.precedence_used !== undefined
        ? item.precedence_used
        : 0,
  });

  return (
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
  );
};

export default ShareholdTable;
