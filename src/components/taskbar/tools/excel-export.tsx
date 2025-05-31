/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx";
import { Toast } from "@/components";
import { X } from "lucide-react";

export interface ExcelDataType {
  [key: string]: string | number | boolean;
}

interface ExcelExportOptionsType {
  filename: string;
  sheetName?: string;
  dataFormatter: (item: any) => ExcelDataType;
}

export const exportToExcel = (
  data: any[],
  options: ExcelExportOptionsType
): void => {
  try {
    if (!data.length) {
      Toast(
        "دیتایی برای دانلود نیست ",
        <X className="text-red-500" />,
        "bg-red-500"
      );
      return;
    }

    const formattedData = data.map(options.dataFormatter);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      options.sheetName || "Sheet1"
    );
    XLSX.writeFile(workbook, options.filename);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    throw error;
  }
};
 

export default exportToExcel;
// Example usage with your structure:
/*
interface ShareholdersType {
  company_detail?: {
    name: string;
  };
  company?: string;
  number_of_shares?: number;
  underwriting?: number;
  user_detail?: {
    first_name: string;
    last_name: string;
    mobile: string;
    uniqueIdentifier: string;
  };
  first_name?: string;
  last_name?: string;
  mobile?: string;
  uniqueIdentifier?: string;
  precedence?: number;
  precedence_count?: number;
  used_precedence?: number;
  precedence_used?: number;
}

const shareholdersDataFormatter = (item: ShareholdersType) => ({
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

// Usage in component:
const handleExport = () => {
  exportToExcel(shareholdersData, {
    filename: 'shareholders.xlsx',
    sheetName: 'Shareholders',
    dataFormatter: shareholdersDataFormatter
  });
};
*/
