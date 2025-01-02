import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useDisplacement } from "../../hooks";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CustomDataGridToolbar, localeText } from "../../../../utils";
import moment from "moment-jalaali";
import "moment/locale/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import { DisplacementPrecendenceTypes } from "../../types";
import { tableStyles } from "../../../../ui";
import Popup from "../../../../components/popup";
import { useDisplacementStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { useUserPermissions } from "../../../permissions";

const DisplacementTable = () => {
  const { data, refetch } = useDisplacement.useGet();
  const { mutate: deleteDisplacement } = useDisplacement.useDelete();
  const { checkPermission } = useUserPermissions();
  const { setId } = useDisplacementStore();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] =
    useState<DisplacementPrecendenceTypes | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const rows = data || [];

  const columns = [
    {
      field: "buyer",
      headerName: "نام خریدار",
      width: 100,
      renderCell: (params: GridCellParams) => {
        const user = params.row.buyer_detail;
        return user && typeof user === "object" ? user.first_name : "";
      },
    },
    {
      field: "buyer_last_name",
      headerName: "نام خانوادگی خریدار",
      width: 100,
      renderCell: (params: GridCellParams) => {
        const user = params.row.buyer_detail;
        return user && typeof user === "object" ? user.last_name : "";
      },
    },
     {
      field: "buyer_uniqueIdentifier",
      headerName: "کدملی خریدار",
      width: 150,
      renderCell: (params: GridCellParams) => {
        const user = params.row.buyer_detail;
        return user && typeof user === "object" ? user.uniqueIdentifier : "";
      },
    },
    {
      field: "seller",
      headerName: "نام فروشنده",
      width: 100,
      renderCell: (params: GridCellParams) => {
        const user = params.row.seller_detail;
        return user && typeof user === "object" ? user.first_name : "";
      },
    },
    {
      field: "seller_last_name",
      headerName: "نام خانوادگی فروشنده",
      width: 150,
      renderCell: (params: GridCellParams) => {
        const user = params.row.seller_detail;
        return user && typeof user === "object" ? user.last_name : "";
      },
    },
    {
      field: "seller_uniqueIdentifier",
      headerName: "کدملی فروشنده",
      width: 150,
      renderCell: (params: GridCellParams) => {
        const user = params.row.seller_detail;
        return user && typeof user === "object" ? user.uniqueIdentifier : "";
      },
    },
    { field: "company", headerName: "شرکت", width: 100, renderCell: (params: GridCellParams) => {
      return params.row.company_detail.name;
    }, },
    { field: "number_of_shares", headerName: "تعداد حق تقدم", width: 120 },
    { field: "price", headerName: "قیمت", width: 100 },
    {
      field: "updated_at",
      headerName: "تاریخ بروزرسانی",
      width: 180,
      renderCell: (params: GridCellParams) => {
        return moment(params.row.updated_at)
          .locale("fa")
          .format("jYYYY/jMM/jDD");
      },
    },

  ];

  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک حق تقدم را انتخاب کنید");
      return;
    }
    setId(selectedRow.id);
    navigate("/displacement/update");
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
                data={rows as unknown as Record<string, unknown>[]}
                fileName="گزارش-پرداخت"
                showExcelExport={true}
                actions={{
                  edit: {
                    label: "ویرایش",

                    onClick: handleEdit,
                    show: checkPermission("change_displacementprecedence"),
                    icon: <FaEdit />,
                  },
                  delete: {
                    label: "حذف",
                    show: checkPermission("delete_displacementprecedence"),
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
        label="حذف جابه جایی حق تقدم"
        text="آیا مطمئن هستید؟"
        onConfirm={() => {
          deleteDisplacement(selectedRow.id.toString(), {
            onSuccess: () => {
              toast.success("   با موفقیت حذف شد");
              refetch();
            },
            onError: () => {
              toast.error("خطا در برقراری ارتباط");
            },
          });
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
export default DisplacementTable;
