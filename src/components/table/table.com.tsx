/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { RowComponent, TabulatorFull as Tabulator } from "tabulator-tables";
import type { Options as TabulatorOptions } from "tabulator-tables";
import { TableStyles } from "./tabularStyle";
import * as XLSX from "xlsx";

interface MenuItem {
  label: string;
  icon: string;
  action: (row: any) => void;
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
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const tabulator = useRef<any>(null);

  const mappedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
      ...item,
      _id: item.id || item._id,
    }));
  }, [data]);

  const downloadExcel = useCallback(() => {
    try {
      if (!tabulator.current) return;
      const filteredData = tabulator.current.getData("active") || [];
      const formattedData = formatExportData
        ? filteredData.map((item: any) => formatExportData(item))
        : filteredData;

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(
        workbook,
        `اطلاعات_کاربران_تاریخچه_زمان_${new Date().toISOString()}.xlsx`
      );
    } catch (error) {
      console.error("Error downloading excel:", error);
    }
  }, [formatExportData]);

  useEffect(() => {
    const initTable = async () => {
      try {
        if (!tableRef.current || !Array.isArray(mappedData)) return;

        if (tabulator.current) {
          tabulator.current.destroy();
        }

        const tableOptions = {
          data: mappedData,
          columns,
          layout,
          height,
          pagination,
          paginationSize,
          reactiveData: true,
          footerElement: "<strong>جمع</strong>",
          ...defaultTableOptions,
          ...options,
        };

        tabulator.current = new Tabulator(tableRef.current, tableOptions);
      } catch (error) {
        console.error("Error initializing table:", error);
      }
    };

    initTable();

    return () => {
      try {
        if (tabulator.current) {
          tabulator.current.destroy();
        }
      } catch (error) {
        console.error("Error cleaning up table:", error);
      }
    };
  }, [
    mappedData,
    columns,
    layout,
    height,
    pagination,
    paginationSize,
    options,
  ]);

  if (!Array.isArray(data)) {
    return <div>Invalid data format</div>;
  }

  return (
    <>
      <TableStyles />
      <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
        {showActions && (
          <div className="mb-8 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-8">
              <button
                onClick={downloadExcel}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all duration-300"
              >
                <i className="fas fa-download"></i>
                دانلود اکسل
              </button>
            </div>
          </div>
        )}
        <div
          ref={tableRef}
          className="flex-1 rounded-2xl overflow-hidden shadow-md border border-gray-100"
        />
      </div>
    </>
  );
};

export default TabulatorTable;
