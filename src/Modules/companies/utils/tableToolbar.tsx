import PropTypes from "prop-types";
import { useCallback } from "react";
import { Button } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { exportToExcel } from "../../../utils/exel";
import { FaFileArrowDown } from "react-icons/fa6";

interface CompanyData {
  id: number;
  name: string;
  [key: string]: string | number | boolean | null;
}

interface CustomDataGridToolbarProps {
  data: CompanyData[];
  fileName?: string;
  customExcelData?: (data: CompanyData[]) => CompanyData[];
}

const CustomDataGridToolbar = ({
  data,
  fileName = "export",
  customExcelData,
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
        borderBottom: "1px solid #e0e0e0",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FaFileArrowDown />}
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
};

export default CustomDataGridToolbar;
