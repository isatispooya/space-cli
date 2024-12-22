import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useDelPrecendence, useGetPrecedence } from "../hooks";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { PrecedenceTypes } from "../types";
import { tableStyles } from "../../../ui";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Popup from "../../../components/popup";
import { usePrecendenceStore } from "../store";
import { useNavigate } from "react-router-dom";
import { useUserPermissions } from "../../permissions";

const PrecendenceTable: React.FC = () => {
  const { data } = useGetPrecedence();
  const navigate = useNavigate();

  const { mutate: deletePrecendence } = useDelPrecendence();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { checkPermission } = useUserPermissions();
  const [selectedRow, setSelectedRow] = useState<PrecedenceTypes | null>(null);
  const { setId } = usePrecendenceStore();
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
    if (!selectedRow) {
      toast.error("لطفا یک سهم را انتخاب کنید");
      return;
    }
    setId(selectedRow.id);
    navigate("/precendence/update");
  };

  const handleDelete = () => {
    if (!selectedRow) {
      toast.error("لطفا یک سهم را انتخاب کنید");
      return;
    }
    setIsDeleteOpen(true);
  };

  const rows = data || [];

  return (
    <>
      <Toaster />
      <div className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden">
        <DataGrid
          columns={columns}
          rows={rows}
          localeText={localeText}
          onRowClick={(params) => {
            if (!selectedRow) {
              setSelectedRow(params.row);
            }
          }}
          isRowSelectable={(params) => {
            return !selectedRow || params.row.id === selectedRow.id;
          }}
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
                    show: checkPermission("change_precedence"),
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  delete: {
                    label: "حذف",
                    show: checkPermission("delete_precedence"),
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

        {selectedRow && (
          <Popup
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            label="حذف سهم"
            text="آیا از حذف شرکت مطمئن هستید؟"
            onConfirm={() => {
              deletePrecendence(selectedRow.id);
              setIsDeleteOpen(false);
              setSelectedRow(null);
            }}
            onCancel={() => {
              setIsDeleteOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};
export default PrecendenceTable;
