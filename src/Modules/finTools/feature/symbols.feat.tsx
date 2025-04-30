import { Chart, Details } from "../components";
import { MainLayout } from "@/layouts";
import { useSymbols } from "../hooks";
import { useParams } from "react-router-dom";
import { Symbol } from "../types";

const SymbolsFeat = () => {
  const { id } = useParams();
  const { data: symbolResponse } = useSymbols.useGetSymbolsById(Number(id));

  // Convert SymbolResponse to Symbol if available
  const symbol: Symbol | undefined = symbolResponse
    ? symbolResponse[0]
    : undefined;

  return (
    <MainLayout>
      <div className="w-full flex flex-col md:flex-row items-center justify-center p-6 bg-gray-100 min-h-screen relative">
        <div className="flex-1 w-full h-full flex items-center justify-center p-6 ">
          <div className="w-full h-96">
            <Chart
              data={[1, 2, 3, 4, 5]}
              labels={["1", "2", "3", "4", "5"]}
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
