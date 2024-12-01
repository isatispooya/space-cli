import { DataGrid } from "@mui/x-data-grid";
import useCompaniesData from "../hooks/useCompaniesData";
import CustomDataGridToolbar from "../utils/tableToolbar";
import { localeText } from "../utils/localtext";
import { useCallback, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { CompanyData } from "../types";
import ModalLayout from "../../../layouts/modal.layout.";
import toast, { Toaster } from "react-hot-toast";
import SeeCompany from "../components/seeCompany";
import DeleteCompany from "../components/deleteCompany";


const CompanyTable = () => {
  const { data } = useCompaniesData();
  
  const rows = data?.results || [];
  const [selectedRow, setSelectedRow] = useState<CompanyData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک شرکت را انتخاب کنید");
      return;
    }
    setIsOpen(true);
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
    setIsDeleteOpen(true);
  }, [selectedRow]);

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
      <Toaster />
      <div className="w-full bg-gray-100 shadow-md relative">
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
          sx={{
            "& .Mui-selected": {
              backgroundColor: "rgba(25, 118, 210, 0.08) !important",
            },
          }}
          slots={{
            toolbar: (props) => (
              <CustomDataGridToolbar
                {...props}
                data={data}
                fileName="گزارش-پرداخت"
                showExcelExport={true}
                actions={{
                  edit: {
                    label: "ویرایش",
                    show: true,
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  view: {
                    label: "مشاهده",
                    show: true,
                    onClick: handleView,
                    icon: <FaEye />,
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
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
        >
          {selectedRow && <DeleteCompany data={selectedRow} />}
        </ModalLayout>
      </div>
    </>
  );
};

export default CompanyTable;
