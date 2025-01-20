import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePosition } from "../hooks";
import { useState, useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import toast from "react-hot-toast";
import { deletePosition } from "../services";
import { useUserPermissions } from "../../permissions";
import { LoaderLg } from "../../../components";
import { tableStyles } from "../../../ui";
import moment from "moment-jalaali";
import { useNavigate } from "react-router-dom";

type RowType = {
  id: number;
  name: string;
  company: string;
  parent: { id: number; name: string } | null;
  type_of_employment: string;
  description: string;
  user: {
    first_name: string;
    last_name: string;
  };
  created_at: string;
  start_date: string;
  end_date: string;
};

const typeOfEmploymentTranslations: Record<string, string> = {
  full_time: "تمام وقت",
  part_time: "پاره وقت",
  contract: "قراردادی",
  freelance: "فریلنسر",
  internship: "کارآموزی",
};

const PositionsTable = () => {
  const { data: positions, isPending, refetch } = usePosition.useGet();
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const { checkPermission } = useUserPermissions();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک نقش را انتخاب کنید");
      return;
    }
    navigate(`/positions/update/${selectedRow.id}`);
  };

  const handleDelete = useCallback(() => {
    if (!selectedRow) {
      toast.error("لطفا یک نقش را انتخاب کنید");
      return;
    }
    deletePosition(selectedRow.id);
    refetch();
  }, [selectedRow, refetch]);

  const rows = positions
    ? positions.map((position) => {
        return {
          id: position.id,
          name: position.name,
          company: position.company_detail?.name || "نامشخص",
          parent: position.parent,
          type_of_employment: position.type_of_employment
            ? typeOfEmploymentTranslations[position.type_of_employment]
            : "",
          description: position.description,
          user: {
            first_name: position.user?.first_name || "نامشخص",
            last_name: position.user?.last_name || "نامشخص",
          },
          created_at: moment(position.created_at, "YYYY-MM-DD").format(
            "jYYYY/jMM/jDD"
          ),
          start_date: moment(position.start_date, "YYYY-MM-DD").format(
            "jYYYY/jMM/jDD"
          ),
          end_date: moment(position.end_date, "YYYY-MM-DD").format(
            "jYYYY/jMM/jDD"
          ),
        };
      })
    : [];
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "نام نقش",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "company",
      headerName: "نام شرکت",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "type_of_employment",
      headerName: "نوع استخدام",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "توضیحات",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "user",
      headerName: "کاربر",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const user = params.row.user as {
          first_name: string;
          last_name: string;
        };
        return (
          <span>
            {user ? `${user.first_name} ${user.last_name}` : "نامشخص"}
          </span>
        );
      },
    },
    {
      field: "created_at",
      headerName: "تاریخ ایجاد",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "start_date",
      headerName: "تاریخ شروع",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "end_date",
      headerName: "تاریخ پایان",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
  ];

  const hasPermission = (permissions: string[]) => {
    return checkPermission ? checkPermission(permissions) : false;
  };

  const canEdit = hasPermission(["change_position"]);
  const canDelete = hasPermission(["delete_position"]);

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
            const selectedRow = rows.find(
              (row: RowType) => row.id === selectedId
            );
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
                  show: canEdit,
                  label: "ویرایش",
                  onClick: handleEdit,
                  icon: <FaEdit />,
                },
                delete: {
                  show: canDelete,
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
    </>
  );
};

export default PositionsTable;
