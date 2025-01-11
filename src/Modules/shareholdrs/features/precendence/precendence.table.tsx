import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { usePrecendence } from "../../hooks";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { CustomDataGridToolbar, localeText } from "../../../../utils";
import { PrecedenceTypes } from "../../types";
import { tableStyles } from "../../../../ui";
import { useState } from "react";
import toast from "react-hot-toast";
import Popup from "../../../../components/popup";
import { usePrecendenceStore } from "../../store";
import { useNavigate } from "react-router-dom";
import "moment/locale/fa";
import moment from "moment-jalaali";
import { useUserPermissions } from "../../../permissions";
import { LoaderLg } from "../../../../components";

const PrecendenceTable: React.FC = () => {
  const { data, refetch, isPending } = usePrecendence.useGet();
  const navigate = useNavigate();

  const { mutate: deletePrecendence } = usePrecendence.useDelete();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { checkPermission } = useUserPermissions();
  const [selectedRow, setSelectedRow] = useState<PrecedenceTypes | null>(null);
  const { setId } = usePrecendenceStore();
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "نام",
      width: 100,
      renderCell: (params) => {
        return params.row.user_detail.first_name;
      },
    },
    {
      field: "last_name",
      headerName: "نام خانوادگی",
      width: 100,
      renderCell: (params) => {
        return params.row.user_detail.last_name;
      },
    },
    {
      field: "uniqueIdentifier",
      headerName: "کدملی",
      width: 100,
      renderCell: (params) => {
        return params.row.user_detail.uniqueIdentifier;
      },
    },
    {
      field: "company",
      headerName: "شرکت",
      width: 100,
      renderCell: (params) => {
        return params.row.company_detail.name;
      },
    },
    { field: "precedence", headerName: "حق تقدم", width: 100 },

    {
      field: "total_precedence",
      headerName: "حق تقدم استفاده شده",
      width: 100,
    },
    {
      field: "updated_at",
      headerName: "تاریخ بروزرسانی",
      width: 180,
      renderCell: (params) => {
        return moment(params.row.updated_at)
          .locale("fa")
          .format("jYYYY/jMM/jDD");
      },
    },
  ];

  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک سهم را انتخاب کنید");
      return;
    }
    setId(selectedRow.id);
    navigate("/precendence/update");
  };

  const handleDelete = () => {
    if (!selectedRow) {
      toast.error("لطفا یک سهم را انتخاب کنید");
      return;
    }
    setIsDeleteOpen(true);
  };

  const rows = data || [];

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
                (row: PrecedenceTypes) => row.id === selectedId
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
                data={rows as unknown as Record<string, unknown>[]}
                fileName="گزارش-پرداخت"
                showExcelExport={true}
                actions={{
                  edit: {
                    label: "ویرایش",
                    show: checkPermission(["change_precedence"]),
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  delete: {
                    label: "حذف",
                    show: checkPermission(["delete_precedence"]),
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
            label="حذف سهم"
            text="آیا از حذف شرکت مطمئن هستید؟"
            onConfirm={() => {
              deletePrecendence(selectedRow.id.toString(), {
                onSuccess: () => {
                  setIsDeleteOpen(false);
                  setSelectedRow(null);

                  toast.success("سهم با موفقیت حذف شد");
                  refetch();
                },
                onError: () => {
                  toast.error("خطایی رخ داده است");
                },
              });
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
export default PrecendenceTable;
