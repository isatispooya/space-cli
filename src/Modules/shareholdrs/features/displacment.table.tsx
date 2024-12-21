import { DataGrid } from "@mui/x-data-grid";
import { useDelDisplacment, useGetDisplacementPrecendence } from "../hooks";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { DisplacementPrecendenceTypes } from "../types";
import { tableStyles } from "../../../ui";
import Popup from "../../../components/popup";
import { useDisplacementStore } from "../store";
import { useNavigate } from "react-router-dom";

const DisplacementTable = () => {
  const { data, refetch } = useGetDisplacementPrecendence();
  const { mutate: deleteDisplacement } = useDelDisplacment();
  const { setId } = useDisplacementStore();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] =
    useState<DisplacementPrecendenceTypes | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const rows = data || [];
  const columns = [
    { field: "id", headerName: "شناسه", width: 70 },
    { field: "buyer", headerName: "خریدار", width: 100 },
    { field: "seller", headerName: "فروشنده", width: 100 },
    { field: "company", headerName: "شرکت", width: 100 },
    { field: "number_of_shares", headerName: "تعداد سهام", width: 120 },
    { field: "price", headerName: "قیمت", width: 100 },

    {
      field: "document",
      headerName: "سند",
      width: 200,
    },
  ];

  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک حق تقدم را انتخاب کنید");
      return;
    }
    setId(selectedRow.id);
    navigate("displacement/update");
  };

  const handleDelete = () => {
    if (!selectedRow) {
      toast.error("لطفا یک حق تقدم را انتخاب کنید");
      return;
    }
    setIsDeleteOpen(true);
  };

  return (
    <>
      <Toaster />
      <div className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden">
        <DataGrid
          columns={columns}
          rows={rows}
          localeText={localeText}
          onRowClick={(params) => {
            if (!selectedRow) {
              setSelectedRow(params.row);
            }
          }}
          isRowSelectable={(params) => {
            return !selectedRow || params.row.id === selectedRow.id;
          }}
          onRowSelectionModelChange={(newSelectionModel) => {
            if (newSelectionModel.length > 0) {
              const selectedId = newSelectionModel[0];
              const selectedRow = rows.find(
                (row: DisplacementPrecendenceTypes) => row.id === selectedId
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
                data={rows}
                fileName="گزارش-پرداخت"
                showExcelExport={true}
                actions={{
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
        {selectedRow && (
          <Popup
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            label="حذف حق تقدم"
            text="آیا از حذف حق تقدم مطمئن هستید؟"
            onConfirm={() => {
              deleteDisplacement(selectedRow.id);
              setIsDeleteOpen(false);
              setSelectedRow(null);
              refetch();
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
export default DisplacementTable;
