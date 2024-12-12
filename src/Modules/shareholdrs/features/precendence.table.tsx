import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useGetPrecedence } from "../hooks";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { PrecedenceTypes } from "../types";
import { tableStyles } from "../../../ui";
import { useState } from "react";
import EditPrecendenceForm from "./editPrecendence.form";
import ModalLayout from "../../../layouts/ModalLayout";  

const PrecendenceTable: React.FC = () => {
  const { data, isLoading } = useGetPrecedence();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState<PrecedenceTypes | null>(null);
  const columns: GridColDef[] = [
    { field: "id", headerName: "شناسه", width: 100 },
    { field: "name", headerName: "نام", width: 100 },
    { field: "company", headerName: "شرکت", width: 100 },
    { field: "position", headerName: "موقعیت", width: 100 },
    { field: "precedence", headerName: "اولویت", width: 100 },
    { field: "used_precedence", headerName: "اولویت استفاده شده", width: 120 },
    {
      field: "created_at",
      headerName: "تاریخ ایجاد",
      width: 180,
    },
    {
      field: "updated_at",
      headerName: "تاریخ بروزرسانی",
      width: 180,
    },
  ];

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  const rows = data?.results || [];

  return (
    <div className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden">
      <DataGrid
        columns={columns}
        rows={rows}
        localeText={localeText}
        onRowClick={(params) => setSelectedRow(params.row)}
        onRowSelectionModelChange={(newSelectionModel) => {
          if (newSelectionModel.length > 0) {
            const selectedId = newSelectionModel[0];
            const selectedRow = rows.find(
              (row: PrecedenceTypes) => row.id === selectedId
            );
            if (selectedRow) {
              setSelectedRow(selectedRow);
            }
          } else {
            setSelectedRow(null);
          }
        }}
        sx={tableStyles}
        checkboxSelection
        rowSelectionModel={selectedRow ? [selectedRow.id] : []}
        disableMultipleRowSelection
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10]}
        disableColumnMenu
        filterMode="client"
        slots={{
          toolbar: (props) => (
            <CustomDataGridToolbar
              {...props}
              data={rows}
              fileName="گزارش-پرداخت"
              showExcelExport={true}
              actions={{
                edit: {
                  label: "ویرایش",
                  show: true,
                  onClick: handleEdit,
                  icon: <FaEdit />,
                },
                delete: {
                  label: "حذف",
                  show: true,
                  onClick: handleDelete,
                  icon: <FaTrash />,
                },
              }}
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
      <ModalLayout open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <EditPrecendenceForm
          data={selectedRow}
          onClose={() => setIsEditOpen(false)}
        />
      </ModalLayout>
    </div>
  );
};
export default PrecendenceTable;
