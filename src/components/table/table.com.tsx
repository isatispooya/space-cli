/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useMemo } from "react";
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
  selectableRows: 1,
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
  title = "Table",
  showActions = true,
  formatExportData,
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const tabulator = useRef<any>(null);

  const mappedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      _id: item.id || item._id,
    }));
  }, [data]);

  const downloadExcel = () => {
    if (!data) return;

    if (formatExportData) {
      const exportData = data.map(formatExportData);
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `${title}_${new Date().toISOString()}.xlsx`);
    } else {
      tabulator.current?.download(
        "xlsx",
        `${title}_${new Date().toISOString()}.xlsx`,
        {
          sheetName: title,
        }
      );
    }
  };

  useEffect(() => {
    if (tableRef.current) {
      tabulator.current = new Tabulator(tableRef.current, {
        data: mappedData,
        columns: columns,
        layout: layout,
        height: height,
        pagination: pagination,
        paginationSize: paginationSize,
        reactiveData: true,
        ...defaultTableOptions,
        ...options,
      });
    }

    return () => {
      if (tabulator.current) {
        tabulator.current.destroy();
      }
    };
  }, [
    columns,
    layout,
    height,
    pagination,
    paginationSize,
    options,
    mappedData,
  ]);

  return (
    <>
      <TableStyles />

      <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
        {showActions && (
          <div className="mb-8 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex gap-4">
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
          className="flex-1 rounded-2xl overflow-hidden shadow-md border border-gray-100 [&_.tabulator-header]:!bg-gray-50 [&_.tabulator-header_.tabulator-col]:!border-gray-200 [&_.tabulator-row]:!border-gray-100 [&_.tabulator-row.tabulator-row-even]:!bg-gray-50/30 [&_.tabulator-row]:hover:!bg-blue-50/50 [&_.tabulator-footer]:!bg-gray-50 [&_.tabulator]:!border-gray-200 [&_.tabulator-footer]:!overflow-x-auto [&_.tabulator-paginator]:!min-w-[600px]"
        />
      </div>
    </>
  );
};

export default TabulatorTable;
