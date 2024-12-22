import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDelCapital, useGetCapitalIncreasePayment } from "../hooks";
import toast, { Toaster } from "react-hot-toast";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { useState } from "react";
import { CapitalIncreaseTypes } from "../types";
import { tableStyles } from "../../../ui";
import { FaEdit, FaTrash } from "react-icons/fa";

import Popup from "../../../components/popup";
import { useCapitalStore } from "../store";
import { useNavigate } from "react-router-dom";
import { useUserPermissions } from "../../permissions";

const CapitalTable: React.FC = () => {
  const { data } = useGetCapitalIncreasePayment();
  console.log(data);
  const { setId } = useCapitalStore();
  const navigate = useNavigate();
  const {checkPermission} = useUserPermissions();
  const { mutate: deleteCapital } = useDelCapital();
  const [selectedRow, setSelectedRow] = useState<CapitalIncreaseTypes | null>(
    null
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const rows = data || [];
  const columns: GridColDef[] = [
    { field: "id", headerName: "شناسه", width: 70 },
    { field: "company", headerName: "شرکت", width: 100 },
    { field: "position", headerName: "موقعیت", width: 100 },
    { field: "number_of_shares", headerName: "تعداد سهام", width: 120 },
    { field: "price", headerName: "قیمت", width: 100 },
    { field: "created_at", headerName: "تاریخ ایجاد", width: 150 },
    { field: "updated_at", headerName: "تاریخ بروزرسانی", width: 150 },
    {
      field: "document",
      headerName: "سند",
      width: 200,
    },
  ];

  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک سود پرداختی را انتخاب کنید");
      return;
    }
    setId(selectedRow.id);
    navigate("/capital/update");
  };
  const handleDelete = () => {
    if (!selectedRow) {
      toast.error("لطفا یک سود پرداختی را انتخاب کنید");
      return;
    }
    setIsDeleteOpen(true);
  };

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
                (row: CapitalIncreaseTypes) => row.id === selectedId
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
                    show: checkPermission("change_capitalincreasepayment"),
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  delete: {
                    label: "حذف",
                    show: checkPermission("delete_capitalincreasepayment"),
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
            label="حذف سود پرداختی"
            text="آیا از حذف سود پرداختی مطمئن هستید؟"
            onConfirm={() => {
              deleteCapital(selectedRow.id);
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

export default CapitalTable;
