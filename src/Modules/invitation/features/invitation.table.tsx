import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useInvitation } from "../hooks";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { useState } from "react";
import { InvitationTypes } from "../types";
import { tableStyles } from "../../../ui";
import { useUserPermissions } from "../../permissions";
import { FaEdit, FaTrash } from "react-icons/fa";
import "moment/locale/fa";
import moment from "moment-jalaali";
import { TableParamsTypes } from "../types/tableParams.type";
import { LoaderLg } from "../../../components";

const InvitationTable = () => {
  const [selectedRow, setSelectedRow] = useState<InvitationTypes | null>(null);
  const { checkPermission } = useUserPermissions();
  const columns = [
    {
      field: "code",
      headerName: "کد معرف",
      width: 230,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: "توضیحات",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "userFirstName",
      headerName: "نام",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "userLastName",
      headerName: "نام خانوادگی",
      width: 100,
      align: "center",
    },
    {
      field: "invited_users_count",
      headerName: "تعداد دعوت ها",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "uniqueIdentifier",
      headerName: "کد ملی",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "تاریخ ایجاد",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params: TableParamsTypes) => {
        return moment(params.row.created_at)
          .locale("fa")
          .format("jYYYY/jMM/jDD");
      },
    },
  ];

  const { data, isPending } = useInvitation.useGetCodes();

  if (isPending) {
    return (
      <div className="flex justify-center mb-10 items-center h-full">
        <LoaderLg />
      </div>
    );
  }

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  const rows = (data || []).map((row) => ({
    ...row,
    code: `my.isatispooya.com/login?rf=${row.code}`,

    userFirstName: row.introducer_user_detail?.first_name,
    userLastName: row.introducer_user_detail?.last_name,
    uniqueIdentifier: row.introducer_user_detail?.uniqueIdentifier,
  }));

  return (
    <div className="w-full bg-gray-100 shadow-md relative" dir="rtl">
      <DataGrid
        columns={columns as unknown as GridColDef[]}
        rows={rows}
        localeText={localeText}
        onRowClick={(params) => setSelectedRow(params.row)}
        onRowSelectionModelChange={(newSelectionModel) => {
          if (newSelectionModel.length > 0) {
            const selectedId = newSelectionModel[0];
            const selectedRow = rows.find(
              (row: (typeof rows)[0]) => row.id === selectedId
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
                  show: checkPermission(["allow-any"]),
                  onClick: handleEdit,
                  icon: <FaEdit />,
                },
                delete: {
                  label: "حذف",
                  show: checkPermission(["delete_shareholders"]),
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
    </div>
  );
};

export default InvitationTable;
