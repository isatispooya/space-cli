import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCorrespondencesData } from "../hooks";
import { CorrespondenceTypes } from "../types";
import { PaginatedResponse } from "../../../types/paginated";
import { ModalLayout } from "../../../layouts";

import { CustomDataGridToolbar } from "../../../utils";
import { localeText } from "../utils/localtext";
import { useCorrespondenceTableStore } from "../store/corrrenTable.store";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

import EditCorrespondence from "./editCorrespondence.form";
import DeleteCorrespondence from "./deleteCorrespondence";
import { LoaderLg } from "../../../components";

const CorrespondenceTable = () => {
  const { data, isPending } = useCorrespondencesData();
  const {
    selectedRow,
    setSelectedRow,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
  } = useCorrespondenceTableStore();

  const handleEdit = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک مکاتبه را انتخاب کنید");
      return;
    }
    setIsEditOpen(true);
  }, [selectedRow]);

  const handleDelete = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک مکاتبه را انتخاب کنید");
      return;
    }
    setIsDeleteOpen(true);
  }, [selectedRow]);

  const actions = {
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
  };

  if (isPending) {
    return (
      <div className="flex justify-center mb-10 items-center h-full">
        <LoaderLg />
      </div>
    );
  }

  const columns: GridColDef<CorrespondenceTypes>[] = [
    { field: "subject", headerName: "موضوع", width: 150 },
    { field: "description", headerName: "توضیحات", width: 200 },
    { field: "kind_of_correspondence", headerName: "نوع مکاتبه", width: 130 },
    { field: "priority", headerName: "اولویت", width: 100 },
    { field: "created_at", headerName: "تاریخ ایجاد", width: 150 },
    {
      field: "confidentiality_level",
      headerName: "سطح محرمانگی",
      width: 130,
    },
    {
      field: "is_internal",
      headerName: "مکاتبه داخلی",
      width: 120,
      valueFormatter: ({ value }) => (value ? "بله" : "خیر"),
    },
    {
      field: "binding",
      headerName: "الزام آور",
      width: 100,
      valueFormatter: ({ value }) => (value ? "بله" : "خیر"),
    },
    {
      field: "draft",
      headerName: "پیش‌نویس",
      width: 100,
      valueFormatter: ({ value }) => (value ? "بله" : "خیر"),
    },
    {
      field: "published",
      headerName: "منتشر شده",
      width: 100,
      valueFormatter: ({ value }) => (value ? "بله" : "خیر"),
    },
  ];

  const rows = data?.results || [];

  return (
    <div className="w-full bg-gray-100 shadow-md relative" dir="rtl">
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={(params) => setSelectedRow(params.row)}
        onRowSelectionModelChange={(newSelectionModel) => {
          if (newSelectionModel.length > 0) {
            const selectedId = newSelectionModel[0];
            const selectedRow = rows.find(
              (row: CorrespondenceTypes) => row.id === selectedId
            );
            if (selectedRow) {
              setSelectedRow(selectedRow);
            }
          } else {
            setSelectedRow({} as CorrespondenceTypes);
          }
        }}
        disableMultipleRowSelection
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10]}
        disableColumnMenu
        checkboxSelection
        filterMode="client"
        localeText={localeText}
        sx={{
          "& .Mui-selected": {
            backgroundColor: "rgba(25, 118, 210, 0.08) !important",
          },
          "& .MuiDataGrid-cell": {
            textAlign: "right",
          },
          "& .MuiDataGrid-columnHeader": {
            textAlign: "right",
          },
        }}
        slots={{
          toolbar: (props) => (
            <CustomDataGridToolbar
              {...props}
              data={
                (data || {
                  count: 0,
                  next: null,
                  previous: null,
                  results: [],
                }) as unknown as PaginatedResponse<Record<string, unknown>>
              }
              fileName="گزارش-مکاتبات"
              showExcelExport={true}
              actions={actions}
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

      <ModalLayout isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        {selectedRow && (
          <EditCorrespondence
            data={selectedRow}
            onClose={() => setIsEditOpen(false)}
          />
        )}
      </ModalLayout>

      <ModalLayout isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        {selectedRow && <DeleteCorrespondence data={selectedRow} />}
      </ModalLayout>
    </div>
  );
};

export default CorrespondenceTable;
