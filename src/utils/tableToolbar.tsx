import PropTypes from "prop-types";
import { useCallback } from "react";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import {
  FaDownload,
  FaEdit,
  FaEye,
  FaPlus,
  FaPrint,
  FaTrash,
} from "react-icons/fa";

import * as XLSX from "xlsx";

interface PaginatedResponseType<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface ActionButtonType {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  show?: boolean;
  className?: string;
}

interface CustomDataGridToolbarPropsType<T = Record<string, unknown>> {
  data: T[] | PaginatedResponseType<T>;
  fileName?: string;
  customExcelData?: (data: T[]) => unknown[];
  showExcelExport?: boolean;
  actions?: {
    edit?: ActionButtonType;
    view?: ActionButtonType;
    delete?: ActionButtonType;
    create?: ActionButtonType;
    print?: ActionButtonType;
  };
}

const CustomDataGridToolbar = <T extends Record<string, unknown>>({
  data,
  fileName = "export",
  customExcelData,
  showExcelExport = true,
  actions,
}: CustomDataGridToolbarPropsType<T>) => {
  const handleExport = useCallback(() => {
    try {
      const dataToExport = Array.isArray(data) ? data : data?.results;

      if (
        !dataToExport ||
        !Array.isArray(dataToExport) ||
        dataToExport.length === 0
      ) {
        console.error("No valid data available for export");
        return;
      }

      if (!dataToExport.every((item) => item && typeof item === "object")) {
        console.error("Invalid data format for export");
        return;
      }

      const excelData = customExcelData
        ? customExcelData(dataToExport)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        : dataToExport.map((item: any) => {
            const {
              status,
              state,
              process_status,
              وضعیت,
              Status,
              STATUS,
              ...cleanedItem
            } = item;

            const statusValue =
              status || state || process_status || وضعیت || Status || STATUS;

            let translatedStatus = "در انتظار";

            if (statusValue) {
              switch (String(statusValue).toLowerCase()) {
                case "approved":
                case "تایید شده":
                  translatedStatus = "تایید شده";
                  break;
                case "rejected":
                case "رد شده":
                  translatedStatus = "رد شده";
                  break;
                case "pending":
                case "در انتظار":
                  translatedStatus = "در انتظار";
                  break;
                case "success":
                case "تایید نهایی":
                  translatedStatus = "تایید نهایی";
                  break;
              }
            }

            return {
              نام:
                (
                  item as T & {
                    first_name?: string;
                    user_detail?: { first_name?: string };
                  }
                ).first_name ||
                (item as T & { user_detail?: { first_name?: string } })
                  .user_detail?.first_name ||
                "",
              "نام خانوادگی":
                (
                  item as T & {
                    last_name?: string;
                    user_detail?: { last_name?: string };
                  }
                ).last_name ||
                (item as T & { user_detail?: { last_name?: string } })
                  .user_detail?.last_name ||
                "",
              وضعیت: translatedStatus,
              ...cleanedItem,
            };
          });

      if (!excelData || !Array.isArray(excelData) || excelData.length === 0) {
        console.error("No valid data after processing");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } catch (error) {
      console.error("Error in export:", error);
    }
  }, [data, fileName, customExcelData]);

  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        gap: 1,
        p: 1,
        justifyContent: "space-between",
        flexWrap: "wrap",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />

        {/* Action Buttons */}
        {actions?.view?.show && (
          <button
            onClick={actions.view.onClick}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
              actions.view.className || "text-blue-600 hover:bg-blue-50"
            }`}
          >
            {actions.view.icon || <FaEye />}
            {actions.view.label}
          </button>
        )}

        {actions?.edit?.show && (
          <button
            onClick={actions.edit.onClick}
            className="flex items-center gap-1 px-3 py-1 font-bold text-[#FCBB01] hover:bg-[#FCBB01]/10 rounded-lg"
          >
            {actions.edit.icon || <FaEdit />}
            {actions.edit.label}
          </button>
        )}

        {actions?.delete?.show && (
          <button
            onClick={actions.delete.onClick}
            className="flex items-center gap-1 px-3 py-1 font-bold text-red-600 hover:bg-red-50 rounded-lg"
          >
            {actions.delete.icon || <FaTrash />}
            {actions.delete.label}
          </button>
        )}

        {actions?.create?.show && (
          <button
            onClick={actions.create.onClick}
            className="flex items-center gap-1 px-3 py-1 font-bold text-purple-600 hover:bg-purple-50 rounded-lg"
          >
            {actions.create.icon || <FaPlus />}
            {actions.create.label}
          </button>
        )}
        {actions?.print?.show && (
          <button
            onClick={actions.print.onClick}
            className="flex items-center gap-1 px-3 py-1 font-bold text-purple-600 hover:bg-purple-50 rounded-lg"
          >
            {actions.print.icon || <FaPrint />}
            {actions.print.label}
          </button>
        )}
        {showExcelExport && (
          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-3 py-1 font-bold text-green-600 hover:bg-green-50 rounded-lg "
          >
            <FaDownload />
            دانلود اکسل
          </button>
        )}
      </div>
      <GridToolbarQuickFilter
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: 1,
            backgroundColor: "background.paper",
          },
        }}
      />
    </GridToolbarContainer>
  );
};

CustomDataGridToolbar.propTypes = {
  data: PropTypes.array.isRequired,
  fileName: PropTypes.string,
  customExcelData: PropTypes.func,
  showExcelExport: PropTypes.bool,
  actions: PropTypes.object,
};

export default CustomDataGridToolbar;
