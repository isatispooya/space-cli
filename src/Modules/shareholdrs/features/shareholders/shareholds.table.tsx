import "moment/locale/fa";
import moment from "moment-jalaali";
import { ShareholdersType } from "../../types/shareholders.type";
import { useShareholders } from "../../hooks";
import { LoaderLg } from "../../../../components";
import { CellComponent, ColumnDefinition, Formatter } from "tabulator-tables";
import TabulatorTable from "../../../../components/table/table.com";
import { createRoot } from "react-dom/client";
import { ActionMenu } from "../../../../components/table/tableaction";
import ShareHoldersNewTypes from "../../types/shareHolderss.type";

const formatNumber = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === "") return "0";
  const num = Number(value);
  return isNaN(num) ? "0" : Math.floor(num).toLocaleString();
};

const numberFormatter: Formatter = (cell: CellComponent) => {
  return formatNumber(cell.getValue());
};

const calcFormatter: Formatter = (cell: CellComponent) => {
  return formatNumber(cell.getValue());
};

const ShareholdTable: React.FC = () => {
  const { data: shareholders, isPending } = useShareholders.useGet();

  const mappedData = shareholders?.map((row: ShareHoldersNewTypes) => ({
    ...row,
    company: row.company_detail.name,
    company_type: row.company_detail.company_type,
    first_name: row.user_detail.first_name,
    last_name: row.user_detail.last_name,
    underwriting: row.underwriting,
    uniqueIdentifier: row.user_detail.uniqueIdentifier,
    number_of_shares: row.number_of_shares,
    precedence_count: row.precedence,
    precedence_used: row.used_precedence,
    mobile: row.user_detail.mobile,
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
      topCalc: "sum",
      topCalcFormatter: calcFormatter,
      hozAlign: "left",
      formatter: numberFormatter,
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
      field: "mobile",
      title: "شماره موبایل",
      headerFilter: true,
    },
    {
      field: "underwriting",
      title: "پذیره نویسی",
      headerFilter: true,
      topCalc: "sum",
      topCalcFormatter: calcFormatter,
      hozAlign: "left",
      formatter: numberFormatter,
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
      topCalc: "sum",
      topCalcFormatter: calcFormatter,
      hozAlign: "left",
      formatter: numberFormatter,
    },
    {
      field: "precedence_used",
      title: "حق تقدم استفاده شده",
      headerFilter: true,
      topCalc: "sum",
      topCalcFormatter: calcFormatter,
      hozAlign: "left",
      formatter: numberFormatter,
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

  const handlePrint = (rowData: ShareholdersType) => {
    const printContent = `
      <html>
        <head>
          <title>گواهی سهام</title>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
  
            html, body {
              margin: 0;
              padding: 0;
              width: 210mm;
              height: 297mm;
              font-family: "Tahoma", "Arial", sans-serif;
              direction: rtl;
              background: #f9fafb;
              color: #111827;
            }
  
            .certificate {
              width: 100%;
              height: 100%;
              background: white;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
            }
  
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: #1e3a8a;
              color: white;
              padding: 20px 30px;
            }
  
            .header .company-name {
              font-size: 24px;
              font-weight: bold;
            }
  
            .logo {
              height: 60px;
            }
  
            .content {
              flex-grow: 1;
              padding: 30px;
              font-size: 18px;
              line-height: 1.8;
            }
  
            .info-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 16px;
            }
  
            .info-table th, .info-table td {
              padding: 12px;
              border: 1px solid #d1d5db;
              text-align: right;
            }
  
            .info-table th {
              background-color: #e0e7ff;
              color: #1e3a8a;
              font-weight: bold;
              width: 30%;
            }
  
            .info-table tr:nth-child(even) td {
              background-color: #f9fafb;
            }
  
            .footer {
              border-top: 1px solid #d1d5db;
              padding: 20px 30px;
              display: flex;
              justify-content: space-between;
              font-size: 15px;
              color: #4b5563;
            }
  
            .signature {
              text-align: center;
            }
  
            @media print {
              html, body {
                width: 210mm;
                height: 297mm;
                background: white;
                overflow: hidden;
              }
  
              .certificate {
                background: white;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <div class="company-name">
                ${
                  rowData.company ||
                  rowData.company_detail?.name ||
                  "شرکت بدون نام"
                }
              </div>
              <img src="logo.png" class="logo" alt="لوگو" />
            </div>
  
            <div class="content">
              گواهی می‌شود که سهامدار محترم با مشخصات زیر در شرکت ثبت شده است:
  
              <table class="info-table">
                <tr><th>نام</th><td>${
                  rowData.first_name || rowData.user_detail?.first_name || "-"
                }</td></tr>
                <tr><th>نام خانوادگی</th><td>${
                  rowData.last_name || rowData.user_detail?.last_name || "-"
                }</td></tr>
                <tr><th>کد ملی</th><td>${
                  rowData.uniqueIdentifier ||
                  rowData.user_detail?.uniqueIdentifier ||
                  "-"
                }</td></tr>
                <tr><th>شماره موبایل</th><td>${
                  rowData.mobile || rowData.user_detail?.mobile || "-"
                }</td></tr>
                <tr><th>تعداد سهام</th><td>${
                  rowData.number_of_shares || "0"
                }</td></tr>
                <tr><th>حق تقدم</th><td>${
                  rowData.precedence_count || rowData.precedence || "0"
                }</td></tr>
                <tr><th>حق تقدم استفاده‌شده</th><td>${
                  rowData.precedence_used !== undefined
                    ? rowData.precedence_used
                    : rowData.used_precedence !== undefined
                    ? rowData.used_precedence
                    : "0"
                }</td></tr>
              </table>
  
              <br />
              این گواهی به عنوان سند رسمی مالکیت سهام صادر شده است.
            </div>
  
            <div class="footer">
              <div class="signature">
                تاریخ چاپ:<br>
                ${moment().locale("fa").format("jYYYY/jMM/jDD")}
              </div>
              <div class="signature">
                مهر و امضای شرکت<br>
                ..................................
              </div>
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
          onClick: () => handlePrint(rowData as ShareholdersType),
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

  const ExelData = (item: ShareholdersType) => ({
    "نام شرکت": item.company_detail?.name || item.company,
    "تعداد سهام": item.number_of_shares || 0,
    "پذیره نویسی": item.underwriting || 0,
    نام: item.user_detail?.first_name || item.first_name,
    "نام خانوادگی": item.user_detail?.last_name || item.last_name,
    شماره: item.user_detail?.mobile || item.mobile,
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
          summaryFields={[
            {
              field: "number_of_shares",
              title: "مجموع سهام",
            },
            {
              field: "precedence_count",
              title: "مجموع حق تقدم",
            },
            {
              field: "precedence_used",
              title: "مجموع حق تقدم استفاده شده",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ShareholdTable;
