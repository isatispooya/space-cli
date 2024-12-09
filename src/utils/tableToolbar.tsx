import PropTypes from "prop-types";
import { useCallback } from "react";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { exportToExcel } from "./exel";
import { FaDownload, FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { CompanyData } from "../Modules/companies/types";

interface ActionButton {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  show?: boolean;
  className?: string;
}

interface CustomDataGridToolbarProps {
  data:
    | CompanyData[]
    | {
        count: number;
        next: string | null;
        previous: string | null;
        results: unknown[];
      };
  fileName?: string;
  customExcelData?: (data: unknown[]) => unknown[];
  showExcelExport?: boolean;
  actions?: {
    edit?: ActionButton;
    view?: ActionButton;
    delete?: ActionButton;
    create?: ActionButton;
  };
}

const CustomDataGridToolbar = ({
  data,
  fileName = "export",
  customExcelData,
  showExcelExport = true,
  actions,
}: CustomDataGridToolbarProps) => {
  const handleExport = useCallback(() => {
    try {
      const dataToExport = Array.isArray(data) ? data : data.results;
      if (!dataToExport || dataToExport.length === 0) {
        console.error("No data available for export");
        return;
      }
      const excelData = customExcelData
        ? customExcelData(dataToExport)
        : dataToExport;
      exportToExcel({ data: excelData, fileName });
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
            className="flex items-center gap-1 px-3 py-1 text-[#F7C748] hover:bg-green-50 rounded-lg"
          >
            {actions.edit.icon || <FaEdit />}
            {actions.edit.label}
          </button>
        )}

        {actions?.delete?.show && (
          <button
            onClick={actions.delete.onClick}
            className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg"
          >
            {actions.delete.icon || <FaTrash />}
            {actions.delete.label}
          </button>
        )}

        {actions?.create?.show && (
          <button
            onClick={actions.create.onClick}
            className="flex items-center gap-1 px-3 py-1 text-purple-600 hover:bg-purple-50 rounded-lg"
          >
            {actions.create.icon || <FaPlus />}
            {actions.create.label}
          </button>
        )}

        {showExcelExport && (
          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg "
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
