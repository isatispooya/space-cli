import { useParams } from "react-router-dom";
import { useSymbols } from "../../hooks";
import { Chart, Details } from "..";
import { SymbolsType } from "../../types";

const SymbolsIntroCom = () => {
  const { id } = useParams();
  const { data: symbolResponse } = useSymbols.useGetSymbolsById(Number(id));
  const symbol: SymbolsType["symbolRes"][0] | undefined = symbolResponse
    ? symbolResponse[0]
    : undefined;

  const chartData =
    symbol?.history_data?.map((item) => item.closing_price_value) || [];
  const chartLabels = symbol?.history_data?.map((item) => item.date) || [];
  return (
    <>
      <div className="w-full flex flex-col md:flex-row items-start justify-center p-6 relative">
        <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-6">
          <div className="w-full h-96 mb-8">
            <Chart
              data={chartData.reverse()}
              labels={chartLabels.reverse()}
              symbols={symbol}
            />
          </div>
        </div>

        <div className="w-full md:w-1/3 mt-6 md:mt-0 md:ml-6">
          <Details symbol={symbol} />
        </div>
      </div>
    </>
  );
};

export default SymbolsIntroCom;
