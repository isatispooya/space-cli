import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useDelPurchasePrecendense } from "../hooks";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import {
  CustomDataGridToolbar,
  formatNumber,
  localeText,
} from "../../../utils";
import { purchacePrecendenceTypes } from "../types";
import { tableStyles } from "../../../ui";
import { useState } from "react";
import toast from "react-hot-toast";
import Popup from "../../../components/popup";
import usePurchacePrecendence from "../hooks/usePurchacePrecendence";
import { useUnusedPrecedenceProcessStore } from "../store";
import { useNavigate } from "react-router-dom";
import { useUserPermissions } from "../../permissions";
import moment from "moment-jalaali";
import "moment/locale/fa";

const PurchacePrecendenceTable: React.FC = () => {
  const { data } = usePurchacePrecendence();

  const navigate = useNavigate();
  const { checkPermission } = useUserPermissions();
  const { mutate: deletePurchasePrecendense } = useDelPurchasePrecendense();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<purchacePrecendenceTypes | null>(null);

  const statusNames = [
    {
      value: "pending",
      label: "در انتظار",
    },
    {
      value: "approved",
      label: "تایید شده",
    },
    {
      value: "rejected",
      label: "رد شده",
    },
  ];
  const columns: GridColDef[] = [
    {
      field: "type",
      headerName: "نوع",
      width: 100,
      renderCell: (params) => {
        return params.row.type === "2" ? "درگاه پرداخت" : "فیش بانکی";
      },
      headerAlign: 'right',
      align: 'right',
      flex: 1,
    },
    {
      field: "invoice_unique_id",
      headerName: "شماره فاکتور",
      width: 100,
      headerAlign: 'right',
      align: 'right',
      flex: 1,
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 100,
      renderCell: (params) => formatNumber(params.row.price),
      headerAlign: 'right',
      align: 'right',
      flex: 1,
    },
    { field: "company", headerName: "شرکت", width: 100, headerAlign: 'right', align: 'right', flex: 1 },
    {
      field: "status",
      headerName: "وضعیت",
      width: 100,
      renderCell: (params) => {
        const statusObj = statusNames.find(
          (status) => status.value === params.row.status
        );
        return statusObj ? statusObj.label : params.row.status;
      },
      headerAlign: 'right',
      align: 'right',
      flex: 1,
    },
    { field: "track_id", headerName: "شناسه پیگیری", width: 120, headerAlign: 'right', align: 'right', flex: 1 },
    { field: "user", headerName: "کاربر", width: 100, headerAlign: 'right', align: 'right', flex: 1 },
    {
      field: "document",
      headerName: "سند",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <a href={params.value} target="_blank" rel="noopener noreferrer">
            مشاهده سند
          </a>
        ) : (
          <span>ناموجود</span>
        ),
      headerAlign: 'right',
      align: 'right',
      flex: 1,
    },
    {
      field: "updated_at",
      headerName: "تاریخ بروزرسانی",
      width: 150,
      renderCell: (params) => {
        return moment(params.row.updated_at)
          .locale("fa")
          .format("jYYYY/jMM/jDD");
      },
      headerAlign: 'right',
      align: 'right',
      flex: 1,
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
          sx={{
            ...tableStyles,
            '& .MuiDataGrid-cell': {
              direction: 'rtl'
            },
            '& .MuiDataGrid-columnHeaders': {
              direction: 'rtl'
            }
          }}
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
                    show: checkPermission("change_unusedprecedencepurchase"),
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  delete: {
                    label: "حذف",
                    show: checkPermission("delete_unusedprecedencepurchase"),
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
