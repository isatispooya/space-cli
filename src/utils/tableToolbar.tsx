import PropTypes from "prop-types";
import { useCallback } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
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
}

interface CustomDataGridToolbarProps {
  data: CompanyData[];
  fileName?: string;
  customExcelData?: (data: CompanyData[]) => CompanyData[];
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
      if (!data || data.length === 0) {
        console.error("No data available for export");
        return;
      }
      const excelData = customExcelData ? customExcelData(data) : data;
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
        {actions?.edit?.show && (
          <Tooltip title={actions.edit.label}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (actions?.edit?.onClick) {
                  actions.edit.onClick();
                }
              }}
              color="primary"
            >
              {actions?.edit?.icon || <FaEdit />}
            </IconButton>
          </Tooltip>
        )}

        {actions?.view?.show && (
          <Tooltip title={actions.view.label}>
            <IconButton
              size="small"
              onClick={() => actions?.view?.onClick?.()}
              color="info"
            >
              {actions.view.icon || <FaEye />}
            </IconButton>
          </Tooltip>
        )}

        {actions?.delete?.show && (
          <Tooltip title={actions.delete.label}>
            <IconButton
              size="small"
              onClick={() => actions?.delete?.onClick?.()}
              color="error"
            >
              {actions.delete.icon || <FaTrash />}
            </IconButton>
          </Tooltip>
        )}

        {actions?.create?.show && (
          <Tooltip title={actions.create.label}>
            <IconButton size="small" onClick={actions.create.onClick}>
              {actions.create.icon || <FaPlus />}
            </IconButton>
          </Tooltip>
        )}

        {showExcelExport && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FaDownload />}
            onClick={handleExport}
            size="small"
            sx={{
              minWidth: "120px",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            دانلود اکسل
          </Button>
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
