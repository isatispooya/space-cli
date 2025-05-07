import { TabulatorTable } from "@/components";
import { useSymbols } from "../hooks";
import { CellComponent } from "tabulator-tables";

const AnalysisSymbolFeat = () => {
  const { data } = useSymbols.useGetSymbolsAnalysis();

  const columns = [
    {
      title: "نماد",
      field: "symbol",
      headerFilter: true,
      width: 100,
    },
    {
      title: "قیمت آخر",
      field: "last_price",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        return cell.getValue().toLocaleString();
      },
    },
    {
      title: "بازده 7 روزه",
      field: "7_day_return",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        return `${value.toFixed(2)}%`;
      },
    },
    {
      title: "رتبه 7 روزه",
      field: "7_day_rank",
      headerFilter: true,
    },
    {
      title: "بازده 30 روزه",
      field: "30_day_return",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        return `${value.toFixed(2)}%`;
      },
    },
    {
      title: "رتبه 30 روزه",
      field: "30_day_rank",
      headerFilter: true,
    },
    {
      title: "بازده 90 روزه",
      field: "90_day_return",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        return `${value.toFixed(2)}%`;
      },
    },
    {
      title: "رتبه 90 روزه",
      field: "90_day_rank",
      headerFilter: true,
    },
    {
      title: "بازده 180 روزه",
      field: "180_day_return",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        return `${value.toFixed(2)}%`;
      },
    },
    {
      title: "رتبه 180 روزه",
      field: "180_day_rank",
      headerFilter: true,
    },
    {
      title: "بازده 365 روزه",
      field: "365_day_return",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        return `${value.toFixed(2)}%`;
      },
    },
    {
      title: "رتبه 365 روزه",
      field: "365_day_rank",
      headerFilter: true,
    },
  ];

  return (
    <TabulatorTable
      data={data || []}
      columns={columns}
      height="600px"
      pagination={true}
      paginationSize={10}
      showActions={true}
    />
  );
};

export default AnalysisSymbolFeat;
