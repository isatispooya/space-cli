import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomPagination from "../../utils/paginationTable";
import { CustomDataGridToolbar } from "../../utils";
import LoaderLg from "../loader-lg";
import { tableStyles } from "../../ui";
import { localeText } from "../../utils";
import { useTableStore } from "./tabel.store";

interface TablePropsTypes {
  columns: GridColDef[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
  loading: boolean;

  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
  actions: {
    edit: {
      label: string;
      show: boolean;
      onClick: () => void;
      icon: JSX.Element;
    };
    delete: {
      label: string;
      show: boolean;
      onClick: () => void;
      icon: JSX.Element;
    };
  };
  pageSizeOptions: number[];
}

const Table: React.FC<TablePropsTypes> = ({
  columns,
  rows,
  loading,
  paginationModel,
  onPaginationModelChange,
  actions,
  pageSizeOptions,
}) => {
  const { selectedRow, setSelectedRow } = useTableStore();
  if (loading) {
    return (
      <div className="flex justify-center mb-10 items-center h-full">
        <LoaderLg />
      </div>
    );
  }

  return (
    <DataGrid
      columns={columns}
      localeText={localeText}
      rows={rows}
      onRowClick={(params) => {
        setSelectedRow(params.row);
      }}
      isRowSelectable={(params) => {
        return selectedRow === null || params.row.id === selectedRow;
      }}
      sx={tableStyles}
      onRowSelectionModelChange={(newSelectionModel) => {
        if (newSelectionModel.length > 0) {
          const selectedId = newSelectionModel[0];
          const selectedRow = rows.find((row) => row.id === selectedId);
          if (selectedRow && selectedRow.id === selectedRow?.id) {
            setSelectedRow(null);
          } else {
            setSelectedRow(selectedRow);
          }
        } else {
          setSelectedRow(null);
        }
      }}
      checkboxSelection
      disableMultipleRowSelection
      pagination
      disableColumnMenu
      filterMode="client"
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      slots={{
        pagination: (props) => (
          <CustomPagination
            rows={rows}
            pageSize={paginationModel.pageSize}
            paginationModel={paginationModel}
            onPageChange={(_, newPage) => {
              onPaginationModelChange({ ...paginationModel, page: newPage });
            }}
            onPageSizeChange={(newSize) => {
              onPaginationModelChange({
                ...paginationModel,
                pageSize: newSize,
                page: 0,
              });
            }}
            pageSizeOptions={pageSizeOptions}
            {...props}
          />
        ),
        toolbar: (props) => (
          <CustomDataGridToolbar
            data={rows as unknown as Record<string, unknown>[]}
            fileName="گزارش"
            {...props}
            actions={actions}
          />
        ),
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
    />
  );
};

export default Table;
