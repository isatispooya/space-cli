import { DataGrid } from "@mui/x-data-grid";
import { usePositionData } from "../hooks";
import { useState, useCallback } from "react";
import { FaEdit } from "react-icons/fa";
import CustomDataGridToolbar from "../../companies/utils/tableToolbar";
import { localeText } from "../../companies/utils/localtext";
import { PositionData } from "../types";
import { FaPlus } from "react-icons/fa";
import ModalLayout from "../../../layouts/modal.layout.";
import { PositionCreate, PositionUpdate } from "./";
import toast, { Toaster } from "react-hot-toast";


const PositionsTable = () => {
  const { data: positions } = usePositionData();
  const [selectedRow, setSelectedRow] = useState<PositionData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const handleCreate = () => {
    setIsOpen(true);
  };

  const handleEdit = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک نقش را انتخاب کنید");
      return;
    }
    setIsUpdateOpen(true);
  }, [selectedRow]);

  const rows = positions?.results || [];
  const columns = [
    { field: "name", headerName: "نام نقش", width: 200 },
    { field: "company", headerName: "نام شرکت", width: 130 },
    { field: "parent", headerName: "نام نقش", width: 200 },
    { field: "type_of_employment", headerName: "نوع استخدام", width: 200 },
    { field: "description", headerName: "توضیحات", width: 200 },
    { field: "user", headerName: "کاربر", width: 200 },
    { field: "created_at", headerName: "تاریخ ایجاد", width: 200 },
    { field: "start_date", headerName: "تاریخ شروع", width: 200 },
    { field: "end_date", headerName: "تاریخ پایان", width: 200 },
  ];

  return (
    <>
      <Toaster />
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={(params) => setSelectedRow(params.row)}
        onRowSelectionModelChange={(newSelectionModel) => {
          if (newSelectionModel.length > 0) {
            const selectedId = newSelectionModel[0];
            const selectedRow = rows.find(
              (row: PositionData) => row.id === selectedId
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
              data={positions}
              fileName="گزارش-پرداخت"
              showExcelExport={true}
              actions={{
                create: {
                  show: true,
                  label: "ایجاد",
                  onClick: handleCreate,
                  icon: <FaPlus />,
                },
                edit: {
                  show: true,
                  label: "ویرایش",
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

      <ModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PositionCreate />
      </ModalLayout>
      <ModalLayout isOpen={isUpdateOpen} onClose={() => {
        setIsUpdateOpen(false);
        setSelectedRow(null);
      }}>
        {selectedRow && <PositionUpdate data={selectedRow} />}
      </ModalLayout>
    </>
  );
};

export default PositionsTable;
