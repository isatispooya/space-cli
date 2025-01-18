import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useInvitation } from "../hooks";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { useState } from "react";
import { tableStyles } from "../../../ui";
import { useUserPermissions } from "../../permissions";
import { FaEdit, FaTrash } from "react-icons/fa";
import "moment/locale/fa";
import moment from "moment-jalaali";
import { LoaderLg } from "../../../components";
import { InvitationTypes } from "../types";
import CustomPagination from "../../../utils/paginationTable";

type TableRow = Omit<InvitationTypes, "invitation_code_detail">;

const InvitationListTable = () => {
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const [pageSizeOptions] = useState([10, 20, 50, 100]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { checkPermission } = useUserPermissions();
  const { data, isPending } = useInvitation.useGetList();

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
      field: "introducer",
      headerName: "معرف",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) =>
        params.row.introducer || "-",
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
    code: row.invitation_code_detail?.code,
    created_at: row.created_at,
    first_name: row.invited_user_detail.first_name,
    last_name: row.invited_user_detail.last_name,
    mobile_number: row.invited_user_detail.mobile,
    national_code: row.invited_user_detail.uniqueIdentifier,
    invitation_date: row.created_at,
    invitation_code: row.invitation_code_detail?.code,
    introducer: row.invitation_code_detail?.introducer_user_detail
      ? `${row.invitation_code_detail.introducer_user_detail.first_name} ${row.invitation_code_detail.introducer_user_detail.last_name}`
      : "-",
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
              setSelectedRow(selectedRow as unknown as TableRow);
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
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={(newPaginationModel) => {
          setPaginationModel(newPaginationModel);
        }}
        disableColumnMenu
        filterMode="client"
        slots={{
          pagination: (props) => (
            <CustomPagination
              rows={rows}
              pageSize={paginationModel.pageSize}
              paginationModel={paginationModel}
              onPageChange={(_, newPage) => {
                setPaginationModel((prev) => ({ ...prev, page: newPage }));
              }}
              pageSizeOptions={pageSizeOptions}
              onPageSizeChange={(newSize) => {
                setPaginationModel((prev) => ({
                  ...prev,
                  pageSize: newSize,
                  page: 0,
                }));
              }}
              {...props}
            />
          ),
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

export default InvitationListTable;
