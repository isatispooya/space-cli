import { DataGrid } from "@mui/x-data-grid";
import useCompaniesData from "../hooks/useCompaniesData";

import CustomDataGridToolbar from "../utils/tableToolbar";
import { localeText } from "../utils/localtext";


const CompanyTable = () => {
  const { data } = useCompaniesData();
  const rows = data?.results || [];

  const columns = [
    { field: "name", headerName: "نام شرکت", width: 130 },
    { field: "company_type", headerName: "نوع شرکت", width: 200 },
    { field: "year_of_establishment", headerName: "سال تاسیس", width: 90 },
    { field: "phone", headerName: "تلفن", width: 90 },
    { field: "postal_code", headerName: "کد پستی", width: 90 },
    { field: "national_id", headerName: "کد شناسه", width: 90 },
    { field: "description", headerName: "توضیحات", width: 90 },
    { field: "logo", headerName: "لوگو", width: 90 },
    { field: "letterhead", headerName: "سربرگ", width: 90 },
    { field: "registered_capital", headerName: "سرمایه ثبتی", width: 90 },
    {
      field: "registration_number",
      headerName: "تعداد سرمایه ثبتی",
      width: 90,
    },
    { field: "seal", headerName: "علامت تجاری", width: 90 },
    { field: "signature", headerName: "امضا", width: 90 },
    { field: "type_of_activity", headerName: "نوع فعالیت", width: 90 },
    { field: "website", headerName: "وبسایت", width: 90 },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
      pageSizeOptions={[10]}
      disableRowSelectionOnClick
      disableColumnMenu
      filterMode="client"
      localeText={localeText}
      slots={{
        toolbar: (props) => (
          <CustomDataGridToolbar
            {...props}
            data={data}
            fileName="گزارش-پرداخت"
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
  );
};

export default CompanyTable;
