import { Chart, Details } from "../components";
import { MainLayout } from "@/layouts";
import { useSymbols } from "../hooks";
import { useParams } from "react-router-dom";
import { Symbol } from "../types";

const SymbolsFeat = () => {
  const { id } = useParams();
  const { data: symbolResponse } = useSymbols.useGetSymbolsById(Number(id));

  const symbol: Symbol | undefined = symbolResponse
    ? symbolResponse[0]
    : undefined;

  // Extract and format chart data
  const chartData =
    symbol?.history_data?.map((item) => item.closing_price_value) || [];
  const chartLabels = symbol?.history_data?.map((item) => item.date) || [];

  return (
    <MainLayout>
      <div className="w-full flex flex-col md:flex-row items-center justify-center p-6 bg-gray-100 min-h-screen relative">
        <div className="flex-1 w-full h-full flex items-center justify-center p-6 ">
          <div className="w-full h-96">
            <Chart
              data={chartData.reverse()}
              labels={chartLabels.reverse()}
              symbols={symbol}
            />
          </div>
        </div>

        <Details symbol={symbol} />
      </div>
    </MainLayout>
  );
};

export default SymbolsFeat;
