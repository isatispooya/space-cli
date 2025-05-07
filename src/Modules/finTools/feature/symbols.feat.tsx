import { Chart, Details } from "../components";
import { MainLayout } from "@/layouts";
import { useSymbols } from "../hooks";
import { useParams } from "react-router-dom";
import { SymbolsType } from "../types";
import AnalysisSymbolFeat from "./analysis_symbol.feat";
import { Tabs } from "@/components";

const SymbolsFeat = () => {
  const { id } = useParams();
  const { data: symbolResponse } = useSymbols.useGetSymbolsById(Number(id));
  const symbol: SymbolsType["symbolRes"][0] | undefined = symbolResponse
    ? symbolResponse[0]
    : undefined;

  const chartData =
    symbol?.history_data?.map((item) => item.closing_price_value) || [];
  const chartLabels = symbol?.history_data?.map((item) => item.date) || [];

  const IntroductionTab = () => (
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
  );

  const PricingTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">قیمت‌گذاری</h3>
      <p className="text-gray-700">محتوای قیمت‌گذاری به زودی اضافه خواهد شد.</p>
    </div>
  );

  const tabsData = [
    { id: "introduction", label: "معرفی", content: <IntroductionTab /> },
    {
      id: "competitors",
      label: "تحلیل رقبا",
      content: <AnalysisSymbolFeat />,
    },
    { id: "pricing", label: "قیمت‌گذاری", content: <PricingTab /> },
  ];

  return (
    <MainLayout>
      <div className="w-full flex flex-col md:flex-row items-start justify-center p-6 relative">
        <div className="w-full bg-white rounded-lg shadow p-4 h-auto">
          <Tabs tabs={tabsData} />
        </div>
      </div>
    </MainLayout>
  );
};

export default SymbolsFeat;
