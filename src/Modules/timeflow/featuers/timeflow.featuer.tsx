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

  const formatJalaliDate = (date: string) => moment(date).format('jYYYY/jMM/jDD');

  const rows = Object.entries(data).map(([date, log]) => {
    const { first_login, intermediate_logs, last_logout, user } = log;
    const { firstName, lastName, nationalId } = user || {};
    const { time: firstLoginTime, ip, device, browser, os } = first_login || {};

    return {
      id: date,
      date: formatJalaliDate(date),
      firstLoginTime,
      ip,
      device,
      browser,
      os,
      intermediate_logs,
      last_logout,
      firstName,
      lastName,
      nationalId
    };
  });

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "تاریخ",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "firstName",
      headerName: "نام",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "نام خانوادگی",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nationalId",
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

export default TimeFlowTable;
