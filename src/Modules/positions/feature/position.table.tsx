import { DataGrid } from "@mui/x-data-grid";
import { usePositionData } from "../hooks";
import { useState, useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { PositionData } from "../types";
import { ModalLayout } from "../../../layouts";
import { PositionUpdate } from "./";
import toast from "react-hot-toast";
import { deletePosition } from "../services";
import { useUserPermissions } from "../../permissions";
import { LoaderLg } from "../../../components";

const PositionsTable = () => {
  const { data: positions, isPending } = usePositionData();
  const [selectedRow, setSelectedRow] = useState<PositionData | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { checkPermission } = useUserPermissions();   

 

  const handleEdit = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک نقش را انتخاب کنید");
      return;
    }
    setIsUpdateOpen(true);
  }, [selectedRow]);

  const handleDelete = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک نقش را انتخاب کنید");
      return;
    }
    deletePosition(selectedRow.id);
  }, [selectedRow]);

  const rows = positions?.results || [];
  console.log(rows);
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

  if (isPending) {
    return (
      <div className="flex justify-center mb-10 items-center h-full">
        <LoaderLg />
      </div>
    );
  }

  return (
    <>

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
                edit: {
                  show: checkPermission(["change_position"]),
                  label: "ویرایش",
                  onClick: handleEdit,
                  icon: <FaEdit />,
                },
                delete: {
                  show: checkPermission(["delete_position"]),
                  label: "حذف",
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
        isOpen={isUpdateOpen}
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedRow(null);
        }}
      >
        {selectedRow && (
          <PositionUpdate
            data={selectedRow}
            onClose={() => {
              setIsUpdateOpen(false);
              setSelectedRow(null);
            }}
          />
        )}
      </ModalLayout>
    </>
  );
};

export default PositionsTable;
