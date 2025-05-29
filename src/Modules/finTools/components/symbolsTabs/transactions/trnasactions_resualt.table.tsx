import { symbolsStore } from "../../../store";
import { useSymbols } from "../../../hooks";
import { LoaderLg, TabulatorTable } from "@/components";
import { ColumnDefinition } from "tabulator-tables";

interface StockChangeType {
  first_name: string | number;
  last_name: string | number;
  national_code: string;
  from_date: string;
  to_date: string;
  total_stock_from: number;
  total_stock_to: number;
  diff_total_stock: number;
}

const TransactionsResult = ({ symbolID }: { symbolID: number }) => {
  const { dateRange, setDateRange } = symbolsStore();

  console.log("Date Range:", dateRange);
  console.log("Symbol ID:", symbolID);

  const columns = (): ColumnDefinition[] => [
    {
      title: "نام",
      field: "first_name",
      headerFilter: true,
      formatter: (cell) => {
        const value = cell.getValue();
        return value || "-";
      },
    },
    {
      title: "نام خانوادگی",
      field: "last_name",
      headerFilter: true,
      formatter: (cell) => {
        const value = cell.getValue();
        return value || "-";
      },
    },
    {
      title: "کد ملی",
      field: "national_code",
      headerFilter: true,
    },
    {
      title: "تاریخ از",
      field: "from_date",
      headerFilter: true,
    },
    {
      title: "تاریخ تا",
      field: "to_date",
      headerFilter: true,
    },
    {
      title: "تعداد سهام از",
      field: "total_stock_from",
      headerFilter: true,
      formatter: (cell) => {
        const value = cell.getValue();
        return value ? value.toLocaleString() : "0";
      },
    },
    {
      title: "تعداد سهام تا",
      field: "total_stock_to",
      headerFilter: true,
      formatter: (cell) => {
        const value = cell.getValue();
        return value ? value.toLocaleString() : "0";
      },
    },
    {
      title: "تغییرات",
      field: "diff_total_stock",
      headerFilter: true,
      formatter: (cell) => {
        const value = cell.getValue();
        return value ? value.toLocaleString() : "0";
      },
    },
  ];

  const { data, isLoading, error } = useSymbols.useGetTransactions(
    symbolID,
    Number(dateRange.startId),
    Number(dateRange.endId)
  );

  console.log("API Response:", { data, error });

  if (isLoading) {
    return <LoaderLg />;
  }

  if (error) {
    return <div>خطا در دریافت اطلاعات</div>;
  }

  if (!dateRange.startId || !dateRange.endId) {
    return <div>لطفا بازه زمانی را انتخاب کنید</div>;
  }

  const tableData = (data?.changed_stocks || []).map(
    (item: StockChangeType) => ({
      first_name: item.first_name || "-",
      last_name: item.last_name || "-",
      national_code: item.national_code || "-",
      from_date: item.from_date || "-",
      to_date: item.to_date || "-",
      total_stock_from: Number(item.total_stock_from) || 0,
      total_stock_to: Number(item.total_stock_to) || 0,
      diff_total_stock: Number(item.diff_total_stock) || 0,
    })
  );

  console.log("Table Data:", tableData);

  return (
    <TabulatorTable
      data={tableData}
      columns={columns()}
      title="تغییرات سهام"
      showActions={true}
      pagination={true}
      paginationSize={10}
      layout="fitColumns"
      height="calc(100vh - 200px)"
    />
  );
};

export default TransactionsResult;
