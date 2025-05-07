/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from "react";
import { RowComponent, TabulatorFull as Tabulator } from "tabulator-tables";
import type { Options as TabulatorOptions } from "tabulator-tables";
import { TableStyles } from "./tabularStyle";
import * as XLSX from "xlsx";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";

interface MenuItem {
  label: string;
  icon: string;
  action: (row: any) => void;
}

interface DateParts {
  year: number;
  month: number;
  day: number;
}

interface TableProps {
  data: any[];
  columns: any[];
  options?: Partial<TabulatorOptions>;
  height?: string;
  layout?:
    | "fitDataTable"
    | "fitColumns"
    | "fitData"
    | "fitDataFill"
    | "fitDataStretch";
  pagination?: boolean;
  paginationSize?: number;
  title?: string;
  showActions?: boolean;
  formatExportData?: (data: any) => any;
  menuItems?: MenuItem[];
  summaryFields?: Array<{
    field: string;
    title: string;
  }>;
  dateField?: string;
  showDateFilter?: boolean;
}

const defaultTableOptions: Partial<TabulatorOptions> = {
  rowHeight: 40,
  layout: (window.innerWidth <= 768 ? "fitDataTable" : "fitColumns") as
    | "fitDataTable"
    | "fitColumns",
  responsiveLayout: window.innerWidth <= 768 ? "collapse" : false,
  paginationSizeSelector: [10, 20, 100, 1000],
  paginationButtonCount: 5,
  paginationAddRow: "page",
  paginationMode: "local",
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
  rowFormatter: (row: RowComponent) => {
    row.getElement().style.transition = "all 0.3s ease";
  },
};

const PersianDateUtils = {
  convertToEnglishNumbers: (str: string): string => {
    if (!str) return "";
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return str.replace(/[۰-۹]/g, (digit) =>
      String(persianDigits.indexOf(digit))
    );
  },

  parseDate: (dateStr: string): DateParts | null => {
    if (!dateStr) return null;

    const englishDateStr = PersianDateUtils.convertToEnglishNumbers(dateStr);
    const parts = englishDateStr.split("/");

    if (parts.length === 3) {
      return {
        year: parseInt(parts[0], 10),
        month: parseInt(parts[1], 10),
        day: parseInt(parts[2], 10),
      };
    }
    return null;
  },

  compareDates: (date1: DateParts | null, date2: DateParts | null): number => {
    if (!date1 || !date2) return 0;

    if (date1.year !== date2.year) return date1.year - date2.year;
    if (date1.month !== date2.month) return date1.month - date2.month;
    return date1.day - date2.day;
  },

  isDateInRange: (
    dateStr: string,
    startDate: DateParts,
    endDate: DateParts
  ): boolean => {
    const dateParts = PersianDateUtils.parseDate(dateStr);
    if (!dateParts) return true;

    const compareStart = PersianDateUtils.compareDates(dateParts, startDate);
    const compareEnd = PersianDateUtils.compareDates(dateParts, endDate);

    return compareStart >= 0 && compareEnd <= 0;
  },

  dateObjectToParts: (dateObj: DateObject): DateParts => ({
    year: dateObj.year,
    month: dateObj.month.number,
    day: dateObj.day,
  }),

  createExcelFilename: (prefix = "اطلاعات"): string => {
    return `${prefix}_${new Date()
      .toLocaleString("fa-IR")
      .replace(/[/\s:]/g, "-")}.xlsx`;
  },
};

const TabulatorTable: React.FC<TableProps> = ({
  data,
  columns,
  options = {},
  height = "fitData",
  layout = "fitColumns",
  pagination = true,
  paginationSize = 10,
  showActions = true,
  formatExportData,
  dateField = "send_date",
  showDateFilter = false,
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const tabulator = useRef<any>(null);
  const [dateRange, setDateRange] = useState<DateObject[]>([]);
  const [applyFilter, setApplyFilter] = useState<boolean>(false);
  const dataCache = useRef(data);

  const mappedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    if (data === dataCache.current) return dataCache.current;

    dataCache.current = data;
    return data.map((item) => ({
      ...item,
      _id: item.id || item._id,
    }));
  }, [data]);

  const dateRangeInfo = useMemo(() => {
    if (!dateRange.length || dateRange.length < 2) return null;

    return {
      start: PersianDateUtils.dateObjectToParts(dateRange[0]),
      end: PersianDateUtils.dateObjectToParts(dateRange[1]),
    };
  }, [dateRange]);

  const filteredData = useMemo(() => {
    if (
      !Array.isArray(mappedData) ||
      !dateField ||
      !showDateFilter ||
      !applyFilter ||
      !dateRangeInfo
    ) {
      return mappedData;
    }

    return mappedData.filter((item) => {
      if (!item[dateField]) return true;

      try {
        return PersianDateUtils.isDateInRange(
          item[dateField],
          dateRangeInfo.start,
          dateRangeInfo.end
        );
      } catch (error) {
        console.error("خطا در فیلتر تاریخ:", error);
        return true;
      }
    });
  }, [mappedData, dateRangeInfo, dateField, showDateFilter, applyFilter]);

  const downloadExcel = useCallback(() => {
    try {
      if (!tabulator.current) return;
      const tableData = tabulator.current.getData("active") || [];
      if (!tableData.length) return;

      const formattedData = formatExportData
        ? tableData.map((item: any) => formatExportData(item))
        : tableData;

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(
        workbook,
        PersianDateUtils.createExcelFilename("اطلاعات_کاربران")
      );
    } catch (error) {
      console.error("خطا در دانلود اکسل:", error);
    }
  }, [formatExportData]);

  const handleApplyFilter = useCallback(() => {
    if (dateRange.length >= 2) {
      setApplyFilter(true);
    }
  }, [dateRange]);

  const handleClearFilter = useCallback(() => {
    setDateRange([]);
    setApplyFilter(false);
  }, []);

  useEffect(() => {
    if (!tableRef.current || !Array.isArray(filteredData)) return;
    const tableOptions = {
      data: filteredData,
      columns,
      layout,
      height,
      pagination,
      paginationSize,
      reactiveData: false,
      footerElement: "<strong>جمع</strong>",
      ...defaultTableOptions,
      ...options,
    };

    if (tabulator.current) {
      tabulator.current.setData(filteredData);
    } else {
      tabulator.current = new Tabulator(tableRef.current, tableOptions);
    }

    return () => {
      if (tabulator.current) {
        tabulator.current.destroy();
        tabulator.current = null;
      }
    };
  }, [
    filteredData,
    columns,
    layout,
    height,
    pagination,
    paginationSize,
    options,
  ]);

  if (!Array.isArray(data)) {
    return <div>داده‌های نامعتبر</div>;
  }

  return (
    <>
      <TableStyles />
      <div className="w-full bg-white shadow-md rounded-2xl relative p-4 flex flex-col mb-[60px]">
        {showActions && (
          <div className="mb-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <button
                onClick={downloadExcel}
                className="bg-gradient-to-r mt-3 from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-1.5 rounded-lg text-md font-medium flex items-center gap-1.5 transition-all duration-300"
              >
                <i className="fas fa-download text-md"></i>
                دانلود اکسل
              </button>

              {showDateFilter && (
                <div className="flex items-center gap-1.5 mr-1.5">
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-0.5">
                      تاریخ:
                    </label>
                    <DatePicker
                      value={dateRange}
                      onChange={setDateRange}
                      range
                      calendar={persian}
                      locale={persian_fa}
                      format="YYYY/MM/DD"
                      calendarPosition="bottom-right"
                      inputClass="custom-date-picker text-xs py-1"
                      placeholder="انتخاب تاریخ"
                      minDate={new DateObject({ calendar: persian }).subtract(
                        2,
                        "years"
                      )}
                      maxDate={new DateObject({ calendar: persian }).add(
                        1,
                        "year"
                      )}
                      dateSeparator=" تا "
                      style={{ width: "160px" }}
                    />
                  </div>
                  <div className="flex gap-1 items-end mt-4">
                    <button
                      onClick={handleApplyFilter}
                      disabled={dateRange.length < 2}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      اعمال
                    </button>
                    <button
                      onClick={handleClearFilter}
                      className="bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-white px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-300"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div
          ref={tableRef}
          className="flex-1 rounded-xl overflow-hidden shadow-sm border border-gray-100"
        />
      </div>
    </>
  );
};

export default TabulatorTable;
