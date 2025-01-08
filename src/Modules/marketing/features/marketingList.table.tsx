import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useInvitation } from "../hooks";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { useState } from "react";
import { InvitationTypes } from "../types/invitationList.type";
import { tableStyles } from "../../../ui";
import { useUserPermissions } from "../../permissions";
import { FaEdit, FaTrash } from "react-icons/fa";
import "moment/locale/fa";
import moment from "moment-jalaali";
import { LoaderLg } from "../../../components";

interface InvitationTableRow extends InvitationTypes {
  first_name: string;
  last_name: string;
  mobile_number: string;
  national_code: string;
  invitation_date: string;
  invitation_code: string;
  code: string;
  invited_user_detail: {
    first_name: string;
    last_name: string;
    mobile: string;
    uniqueIdentifier: string;
    created_at?: string;
  };
}

type TableRow = Omit<InvitationTableRow, "invitation_code_detail">;

const MarketingListTable = () => {
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const { checkPermission } = useUserPermissions();


  const columns: GridColDef[] = [
    {
      field: "first_name",
      headerName: "نام",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "last_name",
      headerName: "نام خانوادگی",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "mobile_number",
      headerName: "شماره موبایل",
      width: 150,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "invitation_date",
      headerName: "تاریخ دعوت",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) =>
        moment(params.row.invitation_date).locale("fa").format("jYYYY/jMM/jDD"),
    },
    {
      field: "invitation_code",
      headerName: "کد دعوت",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
  ];

  const { data, isPending } = useInvitation.useGetList();
  console.log(data);

  if (isPending) {
    return (
      <div className="flex justify-center mb-10 items-center h-full">
        <LoaderLg />
      </div>
    );
  }

  const handleEdit = () => {
    if (selectedRow) {
      console.log("edit", selectedRow);
    }
  };

  const handleDelete = () => {
    if (selectedRow) {
      console.log("delete", selectedRow);
    }
  };

  const rows = (data || []).map((row) => ({
    id: row.id,
    invited_user_detail: row.invited_user_detail,
    code: row.code,
    created_at: row.created_at,
    first_name: row.invited_user_detail.first_name,
    last_name: row.invited_user_detail.last_name,
    mobile_number: row.invited_user_detail.mobile,
    national_code: row.invited_user_detail.uniqueIdentifier,
    invitation_date: row.created_at,
    invitation_code: row.invitation_code_detail.code,
  }));

  if (isPending) {
    return (
      <div className="flex justify-center mb-10 items-center h-full">
        <LoaderLg />
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 shadow-md relative" dir="rtl">
      <DataGrid
        columns={columns}
        rows={rows}
        localeText={localeText}
        onRowClick={(params) => setSelectedRow(params.row)}
        onRowSelectionModelChange={(newSelectionModel) => {
          if (newSelectionModel.length > 0) {
            const selectedId = newSelectionModel[0];
            const selectedRow = rows.find((row) => row.id === selectedId);
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
                  show: checkPermission("allow-any"),
                  onClick: handleEdit,
                  icon: <FaEdit />,
                },
                delete: {
                  label: "حذف",
                  show: checkPermission("delete_shareholders"),
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

export default MarketingListTable;
