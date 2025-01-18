import toast from "react-hot-toast";
import { stockTransferTypes } from "../../types/stockTransfer.type";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useStockTransfer } from "../../hooks";
import { CustomDataGridToolbar, localeText } from "../../../../utils";
import { useState } from "react";
import { tableStyles } from "../../../../ui";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalLayout from "../../../../layouts/ModalLayout";
import { Button } from "@headlessui/react";
import "moment/locale/fa";
import moment from "moment-jalaali";
import Popup from "../../../points/components/popup";
import { useStockTransferStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { useUserPermissions } from "../../../permissions";
import { LoaderLg } from "../../../../components";

const StockTransferTable: React.FC = () => {
  const { data: stockTransfer, refetch, isPending } = useStockTransfer.useGet();
  const { setId } = useStockTransferStore();
  const { checkPermission } = useUserPermissions();

  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState<stockTransferTypes | null>(
    null
  );
  const { mutate: deleteStockTransfer } = useStockTransfer.useDelete();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "buyer",
      headerName: "نام خریدار",
      width: 100,
      renderCell: (params) => {
        const user = params.row.buyer_detail;
        return user && typeof user === "object" ? user.first_name : "";
      },
    },
    {
      field: "buyer_last_name",
      headerName: "نام خانوادگی خریدار",
      width: 100,
      renderCell: (params) => {
        const user = params.row.buyer_detail;
        return user && typeof user === "object" ? user.last_name : "";
      },
    },
    {
      field: "buyer_uniqueIdentifier",
      headerName: "کدملی خریدار",
      width: 150,
      renderCell: (params) => {
        const user = params.row.buyer_detail;
        return user && typeof user === "object" ? user.uniqueIdentifier : "";
      },
    },
    {
      field: "seller",
      headerName: "نام فروشنده",
      width: 100,
      renderCell: (params) => {
        const user = params.row.seller_detail;
        return user && typeof user === "object" ? user.first_name : "";
      },
    },
    {
      field: "seller_last_name",
      headerName: "نام خانوادگی فروشنده",
      width: 150,
      renderCell: (params) => {
        const user = params.row.seller_detail;
        return user && typeof user === "object" ? user.last_name : "";
      },
    },
    {
      field: "seller_uniqueIdentifier",
      headerName: "کدملی فروشنده",
      width: 150,
      renderCell: (params) => {
        const user = params.row.seller_detail;
        return user && typeof user === "object" ? user.uniqueIdentifier : "";
      },
    },
    { field: "number_of_shares", headerName: "تعداد سهام", width: 100 },
    { field: "price", headerName: "قیمت", width: 100 },
    {
      field: "updated_at",
      headerName: "تاریخ بروزرسانی",
      width: 150,
      renderCell: (params) => {
        return moment(params.row.updated_at)
          .locale("fa")
          .format("jYYYY/jMM/jDD");
      },
    },
  ];
  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک سهم را انتخاب کنید");
      return;
    }
    setId(selectedRow.id);
    navigate("/transferstock/update");
  };
  const handleDelete = () => {
    if (!selectedRow) {
      toast.error("لطفا یک سهم را انتخاب کنید");
      return;
    }
    setIsDeleteOpen(true);
  };

  const stockTransferData = stockTransfer || [];

  if (isPending) {
    return (
      <div className="flex justify-center mb-10 items-center h-full">
        <LoaderLg />
      </div>
    );
  }

  return (
    <>
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
                (row: stockTransferTypes) => row.id === selectedId
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
                data={stockTransferData as unknown as Record<string, unknown>[]}
                fileName="گزارش-پرداخت"
                showExcelExport={true}
                actions={{
                  edit: {
                    label: "ویرایش",
                    show: checkPermission(["change_stocktransfer"]),
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  delete: {
                    label: "حذف",
                    show: checkPermission(["delete_stocktransfer"]),
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

      {selectedRow && (
        <Popup
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          label="حذف جابه جایی"
          text="آیا از حذف جابه جایی مطمئن هستید؟"
          onConfirm={() => {
            deleteStockTransfer(selectedRow.id.toString(), {
              onSuccess: () => {
                toast.success("جابه جایی سهام با موفقیت حذف شد");
                refetch();
              },
              onError: () => {
                toast.error("خطا در برقراری ارتباط");
              },
            });
            setIsDeleteOpen(false);
            setSelectedRow(null);
          }}
          onCancel={() => {
            setIsDeleteOpen(false);
          }}
        />
      )}
    </>
  );
};

export default StockTransferTable;
