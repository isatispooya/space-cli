import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { FaEdit } from "react-icons/fa";
import {
  CustomDataGridToolbar,
  formatNumber,
  localeText,
} from "../../../../utils";
import { underwritingTypes } from "../../types";
import { tableStyles } from "../../../../ui";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUnderwriting } from "../../hooks";
import { useUserPermissions } from "../../../permissions";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { useUnderwritingStore } from "../../store";
import Popup from "../../../../components/popup";

const UnderWritingTable: React.FC = () => {
  const { setId } = useUnderwritingStore();
  const { data, refetch } = useUnderwriting.useGet();
  const navigate = useNavigate();
  const { checkPermission } = useUserPermissions();
  const { mutate: deletePurchasePrecendense } = useUnderwriting.useDelete();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<underwritingTypes | null>(
    null
  );

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
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return params.row.type === "2" ? "درگاه پرداخت" : "فیش بانکی";
      },
    },
    {
      field: "price",
      headerName: "مبلغ",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => formatNumber(params.row.price),
    },

    {
      field: "track_id",
      headerName: "شماره پیگیری",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return params.row.payment_detail?.track_id || "ندارد";
      },
    },
    {
      field: "user_detail",
      headerName: "نام کاربر",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const user = params.row.user_detail;
        return user ? `${user.first_name} ${user.last_name}` : "نامشخص";
      },
    },
    {
      field: "requested_amount",
      headerName: "تعداد درخواستی",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "تاریخ ایجاد",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return moment(params.row.created_at)
          .locale("fa")
          .format("jYYYY/jMM/jDD");
      },
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const status = params.row.status;
        const statusObj = statusNames.find((s) => s.value === status);
        return statusObj ? statusObj.label : "نامشخص";
      },
    },
  ];

  const rows = data || [];

  console.log(data);

  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک مورد را انتخاب کنید");
      return;
    }
    setId(Number(selectedRow.id));
    navigate("/underwriting/update");
  };


  return (
    <>
      <div
        className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden"
        style={{ maxWidth: "100%" }}
      >
        <DataGrid
          columns={columns}
          rows={rows}
          localeText={localeText}
          onRowClick={(params) => setSelectedRow(params.row)}
          onRowSelectionModelChange={(newSelectionModel) => {
            if (newSelectionModel.length > 0) {
              const selectedId = newSelectionModel[0];
              const selectedRow = rows.find(
                (row: underwritingTypes) => row.id === selectedId
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
            width: "100%",
          }}
          checkboxSelection
          rowSelectionModel={selectedRow?.id ? [selectedRow.id] : []}
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
                data={rows as unknown as Record<string, unknown>[]}
                fileName="گزارش-پذیره‌نویسی"
                showExcelExport={true}
                actions={{
                  edit: {
                    label: "ویرایش",
                    show: checkPermission("change_underwriting"),
                    onClick: handleEdit,
                    icon: <FaEdit />,
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

      {selectedRow && (
        <Popup
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          label="حذف پذیره‌نویسی"
          text="آیا از حذف پذیره‌نویسی مطمئن هستید؟"
          onConfirm={() => {
            deletePurchasePrecendense(Number(selectedRow.id), {
              onSuccess: () => {
                toast.success("پذیره‌نویسی با موفقیت حذف شد");
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
export default UnderWritingTable;
