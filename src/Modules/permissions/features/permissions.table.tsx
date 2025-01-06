import { useCallback, useState } from "react";
import { usePermissionList } from "../hooks";
import { DataGrid } from "@mui/x-data-grid";
import { PermissionData } from "../types";
import toast from "react-hot-toast";
import { tableStyles } from "../../../ui";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { FaEdit } from "react-icons/fa";
import ModalLayout from "../../../layouts/ModalLayout";
import EditPermissionForm from "./editpermissions.form";
import { PaginatedResponse } from "../../../types/paginated";
import { LoaderLg } from "../../../components";

const PermissionsTable: React.FC = () => {
  const { data, isPending  } = usePermissionList();
  const [selectedRow, setSelectedRow] = useState<PermissionData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);



  const columns = [
    { field: "id", headerName: "شناسه", width: 100 },
    { field: "name", headerName: "نام", width: 100 },
    { field: "codename", headerName: "کد نام", width: 100 },
  ];

  const handleEdit = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک شرکت را انتخاب کنید");
      return;
    }
    setIsEditOpen(true);
  }, [selectedRow]);

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
          rows={data}
          columns={columns}
          onRowClick={(params) => setSelectedRow(params.row)}
          onRowSelectionModelChange={(newSelectionModel) => {
            if (newSelectionModel.length > 0) {
              const selectedId = newSelectionModel[0];
              const selectedRow = data?.find(
                (row: PermissionData) => row.id === selectedId
              );
              if (selectedRow) {
                setSelectedRow(selectedRow);
              }
            }
          }}
          checkboxSelection
          rowSelectionModel={selectedRow ? [selectedRow.id] : []}
          disableMultipleRowSelection
          disableColumnMenu
          filterMode="client"
          localeText={localeText}
          sx={tableStyles}
          slots={{
            toolbar: (props) => (
              <CustomDataGridToolbar
                {...props}
                data={(data || []) as unknown as PaginatedResponse<Record<string, unknown>>}
                fileName="گزارش-دسترسی‌ها"
                showExcelExport={true}
                actions={{
                  edit: {
                    label: "ویرایش",
                    show: true,
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
      </div>

      <ModalLayout open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        {selectedRow && (
          <EditPermissionForm
            data={selectedRow}
            onClose={() => setIsEditOpen(false)}
          />
        )}
      </ModalLayout>
    </>
  );
};

export default PermissionsTable;
