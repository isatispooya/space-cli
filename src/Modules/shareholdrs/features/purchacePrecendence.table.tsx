import { GridColDef, DataGrid } from "@mui/x-data-grid";
import {  useDelPurchasePrecendense } from "../hooks";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { purchacePrecendenceTypes } from "../types";
import { tableStyles } from "../../../ui";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Popup from "../../../components/popup";
import usePurchacePrecendence from "../hooks/usePurchacePrecendence";
import { useUnusedPrecedenceProcessStore } from "../store";
import { useNavigate } from "react-router-dom";

const PurchacePrecendenceTable: React.FC = () => {
  const { data } = usePurchacePrecendence();
  const navigate = useNavigate();

  const { mutate: deletePurchasePrecendense } = useDelPurchasePrecendense();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<purchacePrecendenceTypes | null>(null);
  const columns: GridColDef[] = [
    { field: "id", headerName: "شناسه", width: 100 },
    { field: "amount", headerName: "مقدار", width: 100 },
    { field: "type", headerName: "نوع", width: 100 },
    { field: "price", headerName: "قیمت", width: 100 },
    { field: "company", headerName: "شرکت", width: 100 },
    { field: "status", headerName: "وضعیت", width: 100 },
    { field: "transaction_id", headerName: "شناسه تراکنش", width: 120 },
    { field: "user", headerName: "کاربر", width: 100 },
    {
      field: "document",
      headerName: "سند",
      width: 150,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          مشاهده سند
        </a>
      ),
    },
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

  const { setId } = useUnusedPrecedenceProcessStore();

  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک سهم را انتخاب کنید");
      return;
    }

    setId(selectedRow.id);
    navigate("/purchacePrecendence/update");
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
                (row: purchacePrecendenceTypes) => row.id === selectedId
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

        {selectedRow && (
          <Popup
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            label="حذف سهم"
            text="آیا از حذف شرکت مطمئن هستید؟"
            onConfirm={() => {
              deletePurchasePrecendense(selectedRow.id);
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
export default PurchacePrecendenceTable;
