import "moment/locale/fa";
import moment from "moment-jalaali";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ShareholdersTypes } from "../../types";
import { CustomDataGridToolbar, localeText } from "../../../../utils";
import { tableStyles } from "../../../../ui";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../../../../components/popup";
import { useUserPermissions } from "../../../permissions";
import { companyTypes } from "../../data/companyTypes";
import { useShareholders } from "../../hooks";
import { LoaderLg } from "../../../../components";
import CustomPagination from "../../../../utils/paginationTable";

const ShareholdTable: React.FC = () => {
  const { data: shareholders, refetch, isPending } = useShareholders.useGet();
  const [selectedRow, setSelectedRow] = useState<ShareholdersTypes | null>(
    null
  );
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { mutate: deleteShareholder } = useShareholders.useDelete();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const { checkPermission } = useUserPermissions();
  const [pageSizeOptions] = useState([10 , 20 , 50 , 100]);

  const columns: GridColDef[] = [
    {
      field: "company_name",
      headerName: "شرکت",
      width: 150,
    },
    {
      field: "company_type",
      headerName: "نوع شرکت",
      width: 150,
      renderCell: (params) => {
        const company = params.row.company_type;
        if (!company || typeof company !== "object") return "";

        const companyType = companyTypes.find(
          (type) => type.value === company.company_type
        );
        return companyType?.label || company.company_type;
      },
    },
    {
      field: "number_of_shares",
      headerName: "تعداد سهام",
      width: 100,
    },
    {
      field: "first_name",
      headerName: "نام",
      width: 150,
    },
    {
      field: "last_name",
      headerName: "نام خانوادگی",
      width: 150,
    },
    {
      field: "uniqueIdentifier",
      headerName: "کدملی ",
      width: 150,
    },
    {
      field: "updated_at",
      headerName: "تاریخ ویرایش",
      width: 150,
      renderCell: (params) => {
        return moment(params.row.updated_at)
          .locale("fa")
          .format("jYYYY/jMM/jDD");
      },
    },
  ];
  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک شرکت را انتخاب کنید");
      return;
    }
    navigate(`/shareholders/update/${selectedRow.id}`);
  };

  const handleDelete = () => {
    if (!selectedRow) {
      toast.error("لطفا یک شرکت را انتخاب کنید");
      return;
    }

    setIsDeleteOpen(true);
  };

  const shareholdersData = shareholders || [];

  const processedData = shareholdersData.map((row: ShareholdersTypes) => ({
    ...row,
    company_name: row?.company_detail?.name,
    company_type: row?.company_detail?.company_type,
    first_name: row?.user_detail?.first_name,
    last_name: row?.user_detail?.last_name,
    uniqueIdentifier: row?.user_detail?.uniqueIdentifier,
    id: row.id || Math.random(),
  }));

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
          rows={processedData}
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
              const selectedRow = processedData.find(
                (row: ShareholdersTypes) => row.id === selectedId
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
                rows={processedData}
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
                data={processedData as unknown as Record<string, unknown>[]}
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
      </div>
      {selectedRow && (
        <Popup
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          label="حذف شرکت"
          text="آیا مطمئن هستید؟"
          onConfirm={() => {
            deleteShareholder(selectedRow.id.toString(), {
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
    </>
  );
};

export default ShareholdTable;
