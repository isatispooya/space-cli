/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useMemo } from "react";
import { RowComponent, TabulatorFull as Tabulator } from "tabulator-tables";
import type { Options as TabulatorOptions } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
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
  responsiveLayout: false,
  paginationSizeSelector: [10, 20, 100, 1000],
  paginationButtonCount: 5,
  paginationAddRow: "page",
  paginationMode: "local",
  selectable: 1,
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
  height = "400px",
  layout = "fitColumns",
  pagination = true,
  paginationSize = 10,
  title = "Table",
  showActions = true,
  formatExportData,
  menuItems = [],
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
      // Add this function to close all existing menus
      const closeAllMenus = () => {
        const existingMenus = document.querySelectorAll(".popup-menu");
        existingMenus.forEach((menu) => {
          document.body.removeChild(menu);
        });
      };

      const columnsWithMenu = [
        ...columns,
        {
          title: "عملیات",
          formatter: () => {
            return '<button class="action-btn">⋮</button>';
          },
          hozAlign: "center",
          headerSort: false,
          width: 60,
          cellClick: function (e: Event, cell: any) {
            e.stopPropagation();
            // Close any existing menus first
            closeAllMenus();

            const row = cell.getRow();
            const menu = document.createElement("div");
            menu.className = "popup-menu";

            menuItems.forEach((item) => {
              const menuItem = document.createElement("button");
              menuItem.className = "menu-item";
              menuItem.innerHTML = `${item.icon} ${item.label}`;
              menuItem.onclick = () => {
                item.action(row);
                closeAllMenus();
              };
              menu.appendChild(menuItem);
            });

            // Position menu
            const rect = cell.getElement().getBoundingClientRect();
            menu.style.left = `${rect.left + window.scrollX}px`;
            menu.style.top = `${rect.bottom + window.scrollY}px`;

            // Add menu to body and handle outside clicks
            document.body.appendChild(menu);
            setTimeout(() => {
              const closeMenu = (e: MouseEvent) => {
                if (!menu.contains(e.target as Node)) {
                  closeAllMenus();
                  document.removeEventListener("click", closeMenu);
                }
              };
              document.addEventListener("click", closeMenu);
            }, 0);
          },
        },
      ];

      tabulator.current = new Tabulator(tableRef.current, {
        data: mappedData,
        columns: columnsWithMenu,
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
    menuItems,
  ]);

  return (
    <>
      <TableStyles />
      <div className="tabulator-wrapper">
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
        <div ref={tableRef} />
      </div>
    </>
  );
};

export default TabulatorTable;
