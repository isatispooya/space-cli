import "moment/locale/fa";
import moment from "moment-jalaali";
import { ShareholdersType } from "../../types/shareholders.type";
import { useShareholders } from "../../hooks";
import { LoaderLg } from "../../../../components";
import { CellComponent, ColumnDefinition, Formatter } from "tabulator-tables";
import TabulatorTable from "../../../../components/table/table.com";
import { createRoot } from "react-dom/client";
import { ActionMenu } from "../../../../components/table/tableaction";
import ShareHoldersNewTypes, {
  ShareHoldersNewType,
} from "../../types/shareHolderss.type";
import { useCompany } from "@/Modules/companies";
import { numberToPersianWords } from "@/utils/numberToWords";
import { companyTypes } from "../../data";

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
  const { data: companyData } = useCompany.useGet();

  console.log(companyData);

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

  const handlePrint = (rowData: ShareHoldersNewType) => {
    const companyInfo = companyData?.find(
      (company) => company.id === rowData.company_detail.id
    ) || {
      name: "شرکت بدون نام",
      registration_number: "-",
      year_of_establishment: "-",
      logo: "",
      company_type: "",
    };

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
            border: 10px solid #00008B;
            border-radius: 20px;
            position: relative;
            padding: 20px;
            text-align: center;
            font-size: 18px;
            line-height: 1.8;
          }
  
          .certificate::before, .certificate::after {
            content: '';
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #00008B;
          }
          .certificate::before {
            top: -15px;
            left: -15px;
          }
          .certificate::after {
            bottom: -15px;
            right: -15px;
          }
  
          .header {
            font-size: 32px;
            font-weight: bold;
            color: #8B4513;
            margin-bottom: 20px;
          }
  
          .subheader {
            font-size: 16px;
            color: #8B4513;
            margin-bottom: 10px;
          }
  
          .content {
            text-align: right;
            padding: 30px;
          }
  
          .logo {
            display: block;
            margin: 20px auto;
            height: 80px;
          }
  
          .footer {
            border-top: 1px solid #d1d5db;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            color: #4b5563;
            text-align: center;
          }
  
          .signature {
            margin-top: 20px;
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
          <div class="header">${companyInfo.name} (${
      companyTypes.find((type) => type.value === companyInfo.company_type)
        ?.label || "نوع شرکت نامشخص"
    })</div>
          <div class="subheader">شماره ثبت: ${
            companyInfo.registration_number || "-"
          }</div>
          <div class="subheader">تاریخ تاسیس: ${
            companyInfo.year_of_establishment || "-"
          }</div>
          <div class="content">سرمايه ثبت شده .......... ريال منقسم به ...... سهم يک هزارريالى كه ......... آن پرداخت شده ميباشد</div>
<div class="content">
  دارنده این ورقه آقای/خانم ${rowData.user_detail.first_name || "-"} ${
      rowData.user_detail.last_name || "-"
    } فرزند ${rowData.father_name || "محمد"} با کد ملی ${
      rowData.user_detail.uniqueIdentifier || "-"
    } مالک تعداد ${formatNumber(
      rowData.number_of_shares || "۰"
    )} سهم (${numberToPersianWords(
      rowData.number_of_shares || 0
    )} سهم یک هزار ریالی) در شرکت ${
      companyInfo.name
    } است که در شرکت ثبت گردیده است. تاریخ صدور: ${moment()
      .locale("fa")
      .format("jYYYY/jMM/jDD")}
</div>

          <div class="content">مالك سهام داراى حقوق مشخصه در اساسنامه شركت ميباشد.</div>
          <div class="footer">
            <div class="signature">امضا مدیرعامل</div>
            <div class="signature">امضا رئیس هیئت مدیره</div>
            <div class="signature">مهر شرکت</div>
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
          onClick: () => handlePrint(rowData as ShareHoldersNewType),
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
