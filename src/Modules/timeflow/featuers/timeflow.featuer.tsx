import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { TimeFlowResponse, TimeFlowTypes } from "../types/timeflow.type";
import { LoaderLg } from "../../../components";
import { tableStyles } from "../../../ui";
import useTimeFlow from "../hooks/usetimeflow";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { useUserPermissions } from "../../permissions";
import { FaEdit, FaTrash } from "react-icons/fa";
import moment from 'moment-jalaali';

const TimeFlowTable = () => {
  const [selectedRow, setSelectedRow] = useState<TimeFlowTypes | null>(null);
  const { checkPermission } = useUserPermissions();


  const { data = {} as TimeFlowResponse, isLoading } = useTimeFlow.useGet();


  const rows = Object.entries(data).map(([date, log]) => {
    if (!log) return null;
    return {
      id: date,
      date: moment(date).format('jYYYY/jMM/jDD'),
      firstLoginTime: log.login?.time,
      ip: log.login?.ip,
      device: log.login?.device,
      browser: log.login?.browser,
      os: log.login?.os,
      intermediate_logs: log.intermediate_logs,
      last_logout: log.logout?.time,
      logout_ip: log.logout?.ip,
      logout_device: log.logout?.device,
      logout_browser: log.logout?.browser,
      logout_os: log.logout?.os,
      fullName: log.user?.full_name,
      duration: log.duration,
      username: log.user?.username,
    };
  }).filter(row => row !== null);

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "نام و نام خانوادگی",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "تاریخ",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "کد ملی",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "firstLoginTime",
      headerName: "زمان اولین ورود",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ip",
      headerName: "آی‌پی ورود",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "device",
      headerName: "دستگاه ورود",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "last_logout",
      headerName: "زمان خروج",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "logout_ip",
      headerName: "آی‌پی خروج",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "logout_device",
      headerName: "دستگاه خروج",
      width: 150,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "duration",
      headerName: "زمان",
      width: 150,
      align: "center",
      headerAlign: "center",
    },

  ];



  if (isLoading) {
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
            const selectedRow = rows.find(
              (row) => row.id === selectedId
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
              fileName="گزارش-زمان"
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

export default TimeFlowTable;
