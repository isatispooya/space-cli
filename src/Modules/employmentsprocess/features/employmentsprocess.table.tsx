import { LoaderLg } from "@/components";
import { UseEmProcess } from "../hooks";
import { EmProcessType } from "../types";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useUserPermissions } from "../../permissions";
import { useState } from "react";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { tableStyles } from "../../../ui";
import moment from "moment-jalaali";
import "moment/locale/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Popup from "../../points/components/popup";

const EmploymentsProcessTable = () => {
  const { data, isLoading, refetch } = UseEmProcess.useGet();
  const { mutate: deleteEmprocess } = UseEmProcess.useDelete();
  const { checkPermission } = useUserPermissions();

  const [selectedRow, setSelectedRow] = useState<EmProcessType | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();
  if (isLoading) {
    return <LoaderLg />;
  }
  const columns: GridColDef[] = [
    {
      field: "user_name",
      headerName: "نام متقاضی",
      width: 150,
      renderCell: (params) => {
        const user = params.row.user_detail;
        return user && typeof user === "object"
          ? user.first_name + " " + user.last_name
          : "";
      },
    },
    {
      field: "user_uniqueIdentifier",
      headerName: "کد ملی متقاضی",
      width: 150,
      renderCell: (params) => {
        const user = params.row.user_detail;
        return user && typeof user === "object" ? user.uniqueIdentifier : "";
      },
    },

    { field: "job_title", headerName: "عنوان شغلی", width: 100 },
    { field: "job_description", headerName: "توضیحات شغلی", width: 100 },
    { field: "job_location", headerName: "مکان شغلی", width: 100 },
    { field: "position", headerName: "سمت شغلی", width: 100 },

    {
      field: "reason_for_termination_of_cooperation",
      headerName: "دلیل پایان شغل",
      width: 100,
    },
    { field: "salary", headerName: "حقوق", width: 100 },
    {
      field: "start_date",
      headerName: "تاریخ شروع",
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        return moment(params.row.start_date)
          .locale("fa")
          .format("jYYYY/jMM/jDD");
      },
    },
    {
      field: "end_date",
      headerName: "تاریخ پایان",
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        return moment(params.row.end_date).locale("fa").format("jYYYY/jMM/jDD");
      },
    },
  ];
  const rows = data || [];

  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک ردیف را انتخاب کنید");
    }
    navigate("/employmentsprocess/edit/");
  };
  const handleDelete = () => {
    if (!selectedRow) {
      toast.error("لطفا یک ردیف را انتخاب کنید");
    }
    setIsDeleteOpen(true);
  };
  return (
    <>
      <div
        className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden h-[600px]"
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
                (row: EmProcessType) => row.id === selectedId
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
                    show: checkPermission(["allow_any"]),
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  // print: {
                  //   label: "چاپ",
                  //   show: checkPermission(["allow_any"]),
                  //   onClick: handlePrint,
                  //   icon: <FaPrint />,
                  // },
                  delete: {
                    label: "حذف",
                    show: checkPermission(["allow_any"]),
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
      {selectedRow && (
        <Popup
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onCancel={() => setIsDeleteOpen(false)}
          label="حذف فرایند"
          text="آیا از حذف فرایند مطمئن هستید؟"
          onConfirm={() => {
            deleteEmprocess(selectedRow?.id as number, {
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
        />
      )}
    </>
  );
};

export default EmploymentsProcessTable;
