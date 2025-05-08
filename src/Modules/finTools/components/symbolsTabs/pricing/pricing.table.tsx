import { TabulatorTable } from "@/components";
import { ColumnDefinition } from "tabulator-tables";
import { SymbolsType } from "../../../types";

const columns: ColumnDefinition[] = [
  {
    title: "تاریخ",
    field: "date",
    headerFilter: true,
    hozAlign: "center",
    headerHozAlign: "center",
  },
  {
    title: "نرخ رشد",
    field: "growth_rate",
    headerFilter: true,
    hozAlign: "center",
    headerHozAlign: "center",
    formatter: (cell) => {
      const value = cell.getValue();
      return `${value.toFixed(2)}%`;
    },
  },
  {
    title: "قیمت هدف",
    field: "target_price",
    headerFilter: true,
    hozAlign: "center",
    headerHozAlign: "center",
    formatter: (cell) => {
      const value = cell.getValue();
      return value.toLocaleString();
    },
  },
];

const PricingTable = ({ pricing }: { pricing: SymbolsType["pricingRes"] }) => {
  

  if (!pricing) {
    console.log("Pricing is undefined");
    return <div>No pricing data available</div>;
  }

  if (!pricing.symbol) {
    console.log("Symbol is missing from pricing data");
    return <div>Invalid pricing data format</div>;
  }

  const summaryInfo = (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-gray-600">نماد</p>
          <p className="font-semibold">{pricing.symbol}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">نوع محاسبه</p>
          <p className="font-semibold">
            {pricing.calculation_type === "compound" ? "مرکب" : "ساده"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">قیمت فعلی</p>
          <p className="font-semibold">
            {pricing.current_price.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">بازده واقعی</p>
          <p
            className={`font-semibold ${
              pricing.actual_return >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {pricing.actual_return.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {summaryInfo}
      <TabulatorTable
        data={pricing.table || []}
        columns={columns}
        height="600px"
        pagination={true}
        paginationSize={10}
        showActions={true}
      />
    </div>
  );
};

export default PricingTable;
