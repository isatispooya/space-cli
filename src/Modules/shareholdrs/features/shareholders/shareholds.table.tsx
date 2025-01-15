import "moment/locale/fa";
import moment from "moment-jalaali";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ShareholdersTypes } from "../../types";
import { CustomDataGridToolbar, localeText } from "../../../../utils";
import { tableStyles } from "../../../../ui";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../../../../components/popup";
import { useUserPermissions } from "../../../permissions";
import { companyTypes } from "../../data/companyTypes";
import { useShareholders } from "../../hooks";
import { LoaderLg } from "../../../../components";
const ShareholdTable: React.FC = () => {
  const { data: shareholders, refetch, isPending } = useShareholders.useGet();
  const [selectedRow, setSelectedRow] = useState<ShareholdersTypes | null>(
    null
  );
  const { mutate: deleteShareholder } = useShareholders.useDelete();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const { checkPermission } = useUserPermissions();

  const columns: GridColDef[] = [
    {
      field: "company",
      headerName: "شرکت",
      width: 150,
      renderCell: (params) => {
        const company = params.row.company_detail;
        return company && typeof company === "object" ? company.name : "";
      },
    },
    {
      field: "company_type",
      headerName: "نوع شرکت",
      width: 150,
      renderCell: (params) => {
        const company = params.row.company_detail;
        if (!company || typeof company !== "object") return "";

        const companyType = companyTypes.find(
          (type) => type.value === company.company_type
        );
        return companyType?.label || company.company_type;
      },
    },
    {
      field: "number_of_shares",
      headerName: "تعداد سهام",
      width: 100,
    },
    {
      field: "user",
      headerName: "نام",
      width: 150,
      renderCell: (params) => {
        const user = params.row.user_detail;
        return user && typeof user === "object" ? user.first_name : "";
      },
    },
    {
      field: "last_name",
      headerName: "نام خانوادگی",
      width: 150,
      renderCell: (params) => {
        const user = params.row.user_detail;
        return user && typeof user === "object" ? user.last_name : "";
      },
    },
    {
      field: "uniqueIdentifier",
      headerName: "کدملی ",
      width: 150,
      renderCell: (params) => {
        const user = params.row.user_detail;
        return user && typeof user === "object" ? user.uniqueIdentifier : "";
      },
    },
    {
      field: "updated_at",
      headerName: "تاریخ ویرایش",
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
      toast.error("لطفا یک شرکت را انتخاب کنید");
      return;
    }
    navigate(`/shareholders/update/${selectedRow.id}`);
  };

  const handleDelete = () => {
    if (!selectedRow) {
      toast.error("لطفا یک شرکت را انتخاب کنید");
      return;
    }

    setIsDeleteOpen(true);
  };

  const shareholdersData = shareholders || [];

  const processedData = shareholdersData.map((row: ShareholdersTypes) => ({
    ...row,
    id: row.id || Math.random(),
  }));

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
          rows={processedData}
          localeText={localeText}
          onRowClick={(params) => setSelectedRow(params.row)}
          onRowSelectionModelChange={(newSelectionModel) => {
            if (newSelectionModel.length > 0) {
              const selectedId = newSelectionModel[0];
              const selectedRow = shareholdersData.find(
                (row: ShareholdersTypes) => row.id === selectedId
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
                data={shareholdersData as unknown as Record<string, unknown>[]}
                fileName="گزارش-پرداخت"
                showExcelExport={true}
                actions={{
                  edit: {
                    label: "ویرایش",
                    show: checkPermission(["change_shareholders"]),
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  delete: {
                    label: "حذف",
                    show: checkPermission(["delete_shareholders"]),
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
          label="حذف شرکت"
          text="آیا مطمئن هستید؟"
          onConfirm={() => {
            deleteShareholder(selectedRow.id.toString(), {
              onSuccess: () => {
                toast.success("   با موفقیت حذف شد");
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

export default ShareholdTable;
