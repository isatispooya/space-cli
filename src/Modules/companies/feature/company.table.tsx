import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomDataGridToolbar from "../../../utils/tableToolbar";
import { localeText } from "../../../utils/localtext";
import { useCallback, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { CompanyTypes } from "../types";
import { ModalLayout } from "../../../layouts";
import { ErrorIcon } from "react-hot-toast";
import SeeCompany from "./company.details";
import Popup from "../../points/components/popup";
import EditCompanyForm from "./company.edit.form";
import { tableStyles } from "../../../ui";
import { useUserPermissions } from "../../permissions";
import useCompany from "../hooks/useCompany";
import Spinner from "../../../components/loaders/spinner";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../../components/common"; 

const CompanyTable = () => {
  const { data, isPending } = useCompany.useGet();
  const { mutate: deleteCompanyMutation } = useCompany.useDelete();
  const { checkPermission } = useUserPermissions();
  const navigate = useNavigate();
  const rows = data || [];
  const [selectedRow, setSelectedRow] = useState<CompanyTypes | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = useCallback(() => {
    if (!selectedRow) {
      Toast("لطفا یک شرکت را انتخاب کنید", <ErrorIcon />, "bg-red-500");
      return;
    }
    navigate(`/companies/edit/${selectedRow.id}`);
  }, [selectedRow, navigate]);

  const handleView = useCallback(() => {
    if (!selectedRow) {
      Toast("لطفا یک شرکت را انتخاب کنید", <ErrorIcon />, "bg-red-500");
      return;
    }
    setIsOpen(true);
  }, [selectedRow]);

  const handleDelete = useCallback(() => {
    if (!selectedRow) {
      Toast("لطفا یک شرکت را انتخاب کنید", <ErrorIcon />, "bg-red-500");
      return;
    }
    deleteCompanyMutation(selectedRow.id);
    setIsDeleteOpen(true);
  }, [selectedRow, deleteCompanyMutation]);

  const columns: GridColDef<CompanyTypes>[] = [
    {
      field: "name",
      headerName: "نام شرکت",
      width: 130,
      headerAlign: "center",
      align: "center",
      type: "string",
    },
    {
      field: "company_type",
      headerName: "نوع شرکت",
      width: 200,
      headerAlign: "center",
      align: "center",
      type: "string",
    },
    {
      field: "year_of_establishment",
      headerName: "سال تاسیس",
      width: 90,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "phone",
      headerName: "تلفن",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "postal_code",
      headerName: "کد پستی",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "national_id",
      headerName: "کد شناسه",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "توضیحات",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "registered_capital",
      headerName: "سرمایه ثبتی",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "registration_number",
      headerName: "تعداد سرمایه ثبتی",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "type_of_activity",
      headerName: "نوع فعالیت",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "website",
      headerName: "وبسایت",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
  ];

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden ">
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={(params) => setSelectedRow(params.row)}
          onRowSelectionModelChange={(newSelectionModel) => {
            if (newSelectionModel.length > 0) {
              const selectedId = newSelectionModel[0];
              const selectedRow = rows.find(
                (row: CompanyTypes) => row.id === selectedId
              );
              if (selectedRow) {
                setSelectedRow(selectedRow);
              }
            } else {
              setSelectedRow(null);
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
          localeText={localeText}
          sx={tableStyles}
          slots={{
            toolbar: (props) => (
              <CustomDataGridToolbar
                {...props}
                data={data as unknown as Record<string, unknown>[]}
                fileName="گزارش-پرداخت"
                showExcelExport={true}
                actions={{
                  edit: {
                    label: "ویرایش",
                    show: checkPermission(["change_company"]),
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  view: {
                    label: "مشاهده",
                    show: checkPermission(["view_company"]),
                    onClick: handleView,
                    icon: <FaEye />,
                  },
                  delete: {
                    label: "حذف",
                    show: checkPermission(["delete_company"]),
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
        <ModalLayout
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setSelectedRow(null);
          }}
        >
          {selectedRow && <SeeCompany data={selectedRow} />}
        </ModalLayout>
        <ModalLayout
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedRow(null);
          }}
        >
          {selectedRow && <EditCompanyForm />}
        </ModalLayout>
        {selectedRow && (
          <Popup
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            label="حذف شرکت"
            text="آیا از حذف شرکت مطمئن هستید؟"
            onConfirm={() => {
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

export default CompanyTable;
