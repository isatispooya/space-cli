import { Toaster } from "react-hot-toast";
import { StockTransferTypes } from "../types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetStockTransfer } from "../hooks";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { useState } from "react";
import { tableStyles } from "../../../ui";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalLayout from "../../../layouts/ModalLayout";
import { Button } from "@headlessui/react";
import { EditStockTransferForm } from "./";

const StockTransferTable: React.FC = () => {
  const { data: stockTransfer } = useGetStockTransfer();
  const [selectedRow, setSelectedRow] = useState<StockTransferTypes | null>(
    null
  );
  // const { mutate: deleteStockTransfer } = useDelStockTransfer();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "buyer", headerName: "خریدار", width: 100 },
    { field: "seller", headerName: "فروشنده", width: 100 },
    { field: "number_of_shares", headerName: "تعداد سهام", width: 100 },
    { field: "price", headerName: "قیمت", width: 100 },
    { field: "created_at", headerName: "تاریخ ایجاد", width: 150 },
    { field: "updated_at", headerName: "تاریخ بروزرسانی", width: 150 },
    {
      field: "document",
      headerName: "سند",
      width: 100,
    },
  ];

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const stockTransferData = stockTransfer?.results || [];

  return (
    <>
      <Toaster />
      <div className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden">
        <DataGrid
          columns={columns}
          rows={stockTransferData}
          localeText={localeText}
          onRowClick={(params) => setSelectedRow(params.row)}
          onRowSelectionModelChange={(newSelectionModel) => {
            if (newSelectionModel.length > 0) {
              const selectedId = newSelectionModel[0];
              const selectedRow = stockTransferData.find(
                (row: StockTransferTypes) => row.id === selectedId
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
                data={stockTransferData}
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
      </div>
      <ModalLayout open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <div>
          <h2>آیا از حذف این سهام مطمئن هستید؟</h2>
          <Button onClick={() => setIsDeleteOpen(false)}>بله</Button>
          <Button onClick={() => setIsDeleteOpen(false)}>لغو</Button>
        </div>
      </ModalLayout>
      <ModalLayout open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <EditStockTransferForm
          data={selectedRow}
          onClose={() => setIsEditOpen(false)}
        />
      </ModalLayout>
    </>
  );
};

export default StockTransferTable;
