import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useCorrespondencesData } from "../hooks"; 
import CustomDataGridToolbar from "../utils/tableToolbar"; 
import { localeText } from "../utils/localtext"; 
import { useCallback, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { CorrespondenceData } from "../types";
import { ModalLayout } from "../../../layouts"; 
import toast, { Toaster } from "react-hot-toast";
import {SeeCorrespondence} from "./"; 
import {DeleteCorrespondence} from "./"; 

const CorrespondenceTable = () => {
  const { data } = useCorrespondencesData();
  const rows = data?.results || [];
  const [selectedRow, setSelectedRow] = useState<CorrespondenceData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEdit = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک مکاتبه را انتخاب کنید");
      return;
    }
    setIsOpen(true);
  }, [selectedRow]);

  const handleView = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک مکاتبه را انتخاب کنید");
      return;
    }
    setIsOpen(true);
  }, [selectedRow]);

  const handleDelete = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک مکاتبه را انتخاب کنید");
      return;
    }
    setIsDeleteOpen(true);
  }, [selectedRow]);

  const columns = [
    { field: "title", headerName: "عنوان", width: 200 },
    { field: "sender", headerName: "فرستنده", width: 150 },
    { field: "receiver", headerName: "گیرنده", width: 150 },
    { field: "date", headerName: "تاریخ", width: 120 },
    { field: "subject", headerName: "موضوع", width: 200 },
    { 
      field: "status", 
      headerName: "وضعیت", 
      width: 120,
      renderCell: (params: GridRenderCellParams<CorrespondenceData, string>) => {
        const statusColors = {
          draft: "bg-gray-200",
          sent: "bg-green-200",
          received: "bg-blue-200"
        };
        return (
          <div className={`px-3 py-1 rounded-full ${statusColors[params.value as keyof typeof statusColors]} text-right`}>
            {params.value === 'draft' ? 'پیش‌نویس' : 
             params.value === 'sent' ? 'ارسال شده' : 'دریافت شده'}
          </div>
        );
      }
    },
    { 
      field: "priority", 
      headerName: "اولویت", 
      width: 100,
      renderCell: (params: GridRenderCellParams<CorrespondenceData, string>) => {
        const priorityColors = {
          low: "bg-green-100 text-green-800",
          medium: "bg-yellow-100 text-yellow-800",
          high: "bg-red-100 text-red-800"
        };
        return (
          <div className={`px-3 py-1 rounded-full ${priorityColors[params.value as keyof typeof priorityColors]} text-right`}>
            {params.value === 'low' ? 'کم' : 
             params.value === 'medium' ? 'متوسط' : 'زیاد'}
          </div>
        );
      }
    },
    { field: "reference_number", headerName: "شماره مرجع", width: 150 },
    { field: "category", headerName: "دسته‌بندی", width: 150 },
  ];

  return (
    <>
      <Toaster />
      <div className="w-full bg-gray-100 shadow-md relative" dir="rtl">
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={(params) => setSelectedRow(params.row)}
          onRowSelectionModelChange={(newSelectionModel) => {
            if (newSelectionModel.length > 0) {
              const selectedId = newSelectionModel[0];
              const selectedRow = rows.find(
                (row: CorrespondenceData) => row.id === selectedId
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
                data={data || { count: 0, next: null, previous: null, results: [] }}
                fileName="گزارش-مکاتبات"
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
                  import: {
                    label: "ورود از اکسل",
                    show: true,
                    onClick: () => {
                      // اینجا می‌توانید منطق مربوط به ورود از اکسل را اضافه کنید
                      toast.success("قابلیت ورود از اکسل در حال توسعه است");
                    },
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    ),
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
          {selectedRow && <SeeCorrespondence data={selectedRow} />}
        </ModalLayout>

        <ModalLayout
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
        >
          {selectedRow && <DeleteCorrespondence data={selectedRow} />}
        </ModalLayout>
      </div>
    </>
  );
};

export default CorrespondenceTable; 