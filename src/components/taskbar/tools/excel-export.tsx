/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx";
import { Toast } from "@/components";
import { X } from "lucide-react";
import TaskBarType from "../types/taskbar.type";

export const exportToExcel = (
  data: any[],
  options: TaskBarType["exportProps"]
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
    const filename = options.filename.endsWith(".xlsx")
      ? options.filename
      : `${options.filename}.xlsx`;
    XLSX.writeFile(workbook, filename);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    throw error;
  }
};

export default exportToExcel;
