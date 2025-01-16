import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { FaEdit, FaPrint } from "react-icons/fa";
import {
  CustomDataGridToolbar,
  formatNumber,
  localeText,
} from "../../../../utils";
import { underwritingTypes } from "../../types/underwriting.type";
import { tableStyles } from "../../../../ui";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUnderwriting } from "../../hooks";
import { useUserPermissions } from "../../../permissions";
import moment from "moment-jalaali";
import "moment/locale/fa";
import Popup from "../../../../components/popup";
import { LoaderLg } from "../../../../components";
import { useUnderwritingStore } from "../../store";
import CustomPagination from "../../../../utils/paginationTable";

const UnderWritingTable: React.FC = () => {
  const { data, refetch, isPending } = useUnderwriting.useGet();
  const { setId } = useUnderwritingStore();
  const [pageSizeOptions] = useState([10, 20, 50, 100]);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const { checkPermission } = useUserPermissions();
  const { mutate: deletePurchasePrecendense } = useUnderwriting.useDelete();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<underwritingTypes | null>(
    null
  );

  const handlePrint = () => {
    if (!selectedRow) {
      toast.error("لطفا یک مورد را انتخاب کنید");
      return;
    }
    window.open(`/underwriting/print/${selectedRow.id}`, "_blank");
  };


  const columns: GridColDef[] = [
    {
      field: "type_peyment",
      headerName: "نوع",
      width: 100,
      align: "center",
      headerAlign: "center",
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
    },
    {
      field: "first_name",
      headerName: "نام",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "last_name",
      headerName: "نام خانوادگی",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "requested_amount",
      headerName: "تعداد درخواستی",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => formatNumber(params.row.price),
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
    },
  ];

  const rows = data || [];
  const rows_flat = data?.map((item) => ({... item,
    type_peyment: item.payment_detail?.type === "2" ? "درگاه پرداخت" : "فیش بانکی",
    track_id: item.payment_detail?.track_id,
    first_name: item.user_detail?.first_name,
    last_name: item.user_detail?.last_name,
    status: item.status==='approved' ? 'تایید شده' : item.status==='rejected' ? 'رد شده' :item.status==='success' ? 'تایید نهایی' : 'در انتظار',
  })) || [];
  

  if (isPending) {
    return (
      <div className="flex justify-center mb-10 items-center h-full">
        <LoaderLg />
      </div>
    );
  }

  const handleEdit = () => {
    if (!selectedRow || !selectedRow.id) {
      toast.error("لطفا یک مورد را انتخاب کنید");
      return;
    }
    setId(selectedRow.id);
    navigate("/underwriting/update");
  };

  return (
    <>
      <div
        className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden h-[600px]"
        style={{ maxWidth: "100%" }}
      >
        <DataGrid
          columns={columns}
          rows={rows_flat}
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
            height: "100%",
          }}
          checkboxSelection
          pageSizeOptions={[10]}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={(newPaginationModel) => {
            setPaginationModel(newPaginationModel);
          }}
          rowSelectionModel={selectedRow?.id ? [selectedRow.id] : []}
          disableMultipleRowSelection
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          disableColumnMenu
          filterMode="client"
          slots={{
            pagination: (props) => (
              <CustomPagination
                rows={rows}
                pageSize={paginationModel.pageSize}
                paginationModel={paginationModel}
                onPageChange={(_, newPage) => {
                  setPaginationModel((prev) => ({ ...prev, page: newPage }));
                }}
                pageSizeOptions={pageSizeOptions}
                onPageSizeChange={(newSize) => {
                  setPaginationModel((prev) => ({
                    ...prev,
                    pageSize: newSize,
                    page: 0,
                  }));
                }}
                {...props}
              />
            ),
            toolbar: (props) => (
              <CustomDataGridToolbar
                {...props}
                data={rows as unknown as Record<string, unknown>[]}
                fileName="گزارش-پذیره‌نویسی"
                showExcelExport={true}
                actions={{
                  edit: {
                    label: "ویرایش",
                    show: checkPermission(["change_underwriting"]),
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  print: {
                    label: "چاپ",
                    show: checkPermission(["allow_any"]),
                    onClick: handlePrint,
                    icon: <FaPrint />,
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
