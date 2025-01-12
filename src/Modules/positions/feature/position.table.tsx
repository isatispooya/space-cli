import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePositionData } from "../hooks";
import { useState, useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { ModalLayout } from "../../../layouts";
import { PositionUpdate } from "./";
import toast from "react-hot-toast";
import { deletePosition } from "../services";
import { useUserPermissions } from "../../permissions";
import { LoaderLg } from "../../../components";
import { tableStyles } from "../../../ui";
import moment from 'moment-jalaali';


type RowType = {
  id: number;
  name: string;
  company: number;
  parent: number;
  type_of_employment: number;
  description: string;
  user: {
    first_name: string;
    last_name: string;
  };
  created_at: string;
  start_date: string;
  end_date: string;
  sender: string;
  first_name: string;
  last_name: string;
};

const PositionsTable = () => {
  const { data: positions, isPending, refetch } = usePositionData();
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { checkPermission } = useUserPermissions();   


  const handleEdit = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک نقش را انتخاب کنید");
      return;
    }
    setIsUpdateOpen(true);
  }, [selectedRow]);

  const handleDelete = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک نقش را انتخاب کنید");
      return;
    }
    deletePosition(selectedRow.id);
    refetch();
  }, [selectedRow, refetch]);  

  const rows = positions ? positions.map((position) => ({
    id: position.id,
    name: position.name,
    company: position.company,
    parent: position.parent,
    type_of_employment: position.type_of_employment,
    description: position.description,
    user: {
      first_name: position.user.first_name,
      last_name: position.user.last_name,
    },
    created_at: moment(position.created_at).format('jYYYY/jMM/jDD'),
    start_date: moment(position.start_date).format('jYYYY/jMM/jDD'),
    end_date: moment(position.end_date).format('jYYYY/jMM/jDD'),
  })) : [];
  const columns: GridColDef[] = [
    { field: "name", headerName: "نام نقش", width: 200, headerAlign: "center", align: "center" },
    { field: "company", headerName: "نام شرکت", width: 130, headerAlign: "center", align: "center" },
    { field: "parent", headerName: "نام نقش", width: 200, headerAlign: "center", align: "center" },
    { field: "type_of_employment", headerName: "نوع استخدام", width: 200, headerAlign: "center", align: "center" },
    { field: "description", headerName: "توضیحات", width: 200, headerAlign: "center", align: "center" },
    { 
      field: "user", 
      headerName: "کاربر", 
      width: 200, 
      headerAlign: "center", 
      align: "center", 
      renderCell: (params) => {
        const user = params.row?.user;
        return <span>{user ? `${user.first_name} ${user.last_name}` : "نامشخص"}</span>;
      }
    },
    { field: "created_at", headerName: "تاریخ ایجاد", width: 200, headerAlign: "center", align: "center" },
    { field: "start_date", headerName: "تاریخ شروع", width: 200, headerAlign: "center", align: "center" },
    { field: "end_date", headerName: "تاریخ پایان", width: 200, headerAlign: "center", align: "center" },
  ];

  console.log(rows);

  if (isPending) {
    return (
      <div className="flex justify-center mb-10 items-center h-full">
        <LoaderLg />
      </div>
    );
  }

  return (
    <>

      <DataGrid
        rows={rows}
        columns={columns}
        sx={tableStyles}
        onRowClick={(params) => setSelectedRow(params.row)}
        onRowSelectionModelChange={(newSelectionModel) => {
          if (newSelectionModel.length > 0) {
            const selectedId = newSelectionModel[0];
            const selectedRow = rows.find((row: RowType) => row.id === selectedId);
            if (selectedRow) {
              setSelectedRow(selectedRow);
            }
          } else {
            setSelectedRow(null);
          }
        }}
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
        localeText={localeText}
        slots={{
          toolbar: (props) => (
            <CustomDataGridToolbar
              {...props}
              data={positions as unknown as Record<string, unknown>[]}
              fileName="گزارش-پرداخت"
              showExcelExport={true}
              actions={{
                edit: {
                  show: checkPermission(["change_position"]),
                  label: "ویرایش",
                  onClick: handleEdit,
                  icon: <FaEdit />,
                },
                delete: {
                  show: checkPermission(["delete_position"]),
                  label: "حذف",
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

      <ModalLayout
        isOpen={isUpdateOpen}
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedRow(null);
        }}
      >
        {selectedRow && (
          <PositionUpdate
            data={selectedRow}
            onClose={() => {
              setIsUpdateOpen(false);
              setSelectedRow(null);
            }}
          />
        )}
      </ModalLayout>
    </>
  );
};

export default PositionsTable;
