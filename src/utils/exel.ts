import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const exportToExcel = <T extends object>(data: T[]) => {
  try {
    if (!data || data.length === 0) {
      console.error("No data to export");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: Object.keys(data[0]),
      skipHeader: false,
    });

    // تنظیم RTL برای worksheet
    worksheet["!rtl"] = true;

    // تنظیم عرض ستون‌ها
    const wscols = Object.keys(data[0]).map(() => ({ wch: 25 }));
    worksheet["!cols"] = wscols;

    XLSX.utils.book_append_sheet(workbook, worksheet, "لیست کاربران");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
      bookSST: false,
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `users_data_${new Date().toISOString().split("T")[0]}.xlsx`);
  } catch (error) {
    console.error("Error in exportToExcel:", error);
    throw error;
  }
};
