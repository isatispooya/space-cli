import { DataGrid } from "@mui/x-data-grid";
import CustomDataGridToolbar from "../../../utils/tableToolbar";
import { localeText } from "../../../utils/localtext";
import { useCallback, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { CompanyData } from "../types/companyData.type";
import { ModalLayout } from "../../../layouts";
import toast from "react-hot-toast";
import SeeCompany from "./company.details";
import Popup from "../../../components/popup";

import EditCompanyForm from "./company.edit.form";
import { tableStyles } from "../../../ui";
import { useUserPermissions } from "../../permissions";
import useCompany from "../hooks/useCompany";

const CompanyTable = () => {
  const { data } = useCompany.useGet();
  const { mutate: deleteCompanyMutation } = useCompany.useDelete();
  const { checkPermission } = useUserPermissions(); 

  const rows = data || [];
  const [selectedRow, setSelectedRow] = useState<CompanyData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک شرکت را انتخاب کنید");
      return;
    }
    setIsEditOpen(true);
  }, [selectedRow]);

  const handleView = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک شرکت را انتخاب کنید");
      return;
    }
    setIsOpen(true);
  }, [selectedRow]);

  const handleDelete = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک شرکت را انتخاب کنید");
      return;
    }
    deleteCompanyMutation(selectedRow.id);
    setIsDeleteOpen(true);
  }, [selectedRow, deleteCompanyMutation]);

  const columns = [
    { field: "name", headerName: "نام شرکت", width: 130 },
    { field: "company_type", headerName: "نوع شرکت", width: 200 },
    { field: "year_of_establishment", headerName: "سال تاسیس", width: 90 },
    { field: "phone", headerName: "تلفن", width: 90 },
    { field: "postal_code", headerName: "کد پستی", width: 90 },
    { field: "national_id", headerName: "کد شناسه", width: 90 },
    { field: "description", headerName: "توضیحات", width: 90 },
    { field: "logo", headerName: "لوگو", width: 90 },
    { field: "letterhead", headerName: "سربرگ", width: 90 },
    { field: "registered_capital", headerName: "سرمایه ثبتی", width: 90 },
    {
      field: "registration_number",
      headerName: "تعداد سرمایه ثبتی",
      width: 90,
    },
    { field: "seal", headerName: "علامت تجاری", width: 90 },
    { field: "signature", headerName: "امضا", width: 90 },
    { field: "type_of_activity", headerName: "نوع فعالیت", width: 90 },
    { field: "website", headerName: "وبسایت", width: 90 },
  ];

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
                (row: CompanyData) => row.id === selectedId
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
                    show: checkPermission("change_company"),
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  view: {
                    label: "مشاهده",
                    show: checkPermission("view_company"),
                    onClick: handleView,
                    icon: <FaEye />,
                  },
                  delete: {
                    label: "حذف",
                    show: checkPermission("delete_company"),
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
          {selectedRow && (
            <EditCompanyForm
              data={selectedRow}
              onClose={() => {
                setIsEditOpen(false);
                setSelectedRow(null);
              }}
            />
          )}
        </ModalLayout>
        {selectedRow && (
          <Popup
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            label="حذف شرکت"
            text="آیا از حذف شرکت مطمئن هستید؟"
            onConfirm={() => {
              console.log("Deleting company:", selectedRow);
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
