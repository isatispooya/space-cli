import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { tableStyles } from "../../../ui";
import Popup from "./popup";
import { useUserPermissions } from "../../permissions";
import toast from "react-hot-toast";
import useGiftsUser from "../hooks/useGiftsUser";

interface RequestType {
  id: number;
  title: string;
  description: string;
  points: number;
  user: {
    first_name: string;
    last_name: string;
  };
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

const Request = () => {
  const { checkPermission } = useUserPermissions();
  const [selectedRow, setSelectedRow] = useState<RequestType | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { data: giftsUser } = useGiftsUser.useGetGifts(); 
  
  const rows: RequestType[] = giftsUser?.map((item: any) => ({
    id: item.id,
    title: item.gift_detail.display_name,
    description: item.gift_detail.description,
    points: item.gift_detail.point_1,
    user: {
      first_name: item.user_detail.first_name,
      last_name: item.user_detail.last_name
    },
    status: item.status,
    created_at: item.created_at
  })) || [];

  const columns: GridColDef[] = [
    { 
      field: "title", 
      headerName: "عنوان", 
      width: 150,
      headerAlign: "center",
      align: "center"
    },
    { 
      field: "description", 
      headerName: "توضیحات", 
      width: 200,
      headerAlign: "center",
      align: "center"
    },
    { 
      field: "points", 
      headerName: "امتیاز", 
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div className="text-center">{params.row.points}</div>;
      }
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const statusMap = {
          pending: "در انتظار",
          approved: "تایید شده",
          rejected: "رد شده"
        };
        const statusColors = {
          pending: "text-yellow-600",
          approved: "text-green-600",
          rejected: "text-red-600"
        };
        return <div className={`text-center ${statusColors[params.row.status as keyof typeof statusColors]}`}>
          {statusMap[params.row.status as keyof typeof statusMap]}
        </div>;
      }
    },
    {
      field: "user",
      headerName: "نام و نام خانوادگی",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="text-center w-full">
            {params.row.user.first_name} {params.row.user.last_name}
          </div>
        );
      }
    },
    {
      field: "created_at",
      headerName: "تاریخ ایجاد",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div className="text-center w-full">
          {moment(params.row.created_at).locale("fa").format("jYYYY/jMM/jDD")}
        </div>;
      },
    },
  ];

  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک درخواست را انتخاب کنید");
      return;
    }
  };

  const handleDelete = () => {
    if (!selectedRow) {
      toast.error("لطفا یک درخواست را انتخاب کنید");
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
                (row: RequestType) => row.id === selectedId
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
                fileName="گزارش-درخواست‌ها"
                showExcelExport={true}
                actions={{
                  edit: {
                    label: "ویرایش",
                    show: checkPermission(["change_request"]),
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  delete: {
                    label: "حذف",
                    show: checkPermission(["delete_request"]),
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
            label="حذف درخواست"
            text="آیا از حذف این درخواست مطمئن هستید؟"
            onConfirm={() => {
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

export default Request;

