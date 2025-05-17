import { MainLayout } from "@/layouts";
import AnalysisSymbolFeat from "../components/symbolsTabs/analysis/analysis_symbol.com";
import { Tabs } from "@/components";
import SymbolsPricingCom from "../components/symbolsTabs/pricing/symbols_pricing.com";
import SymbolsIntroCom from "../components/symbolsTabs/intro/symbols_Intro.com";
// import { Calculator } from "../components";
// import { useSymbols } from "../hooks";
// import { useParams } from "react-router-dom";

const SymbolsFeat = () => {
  // const { id } = useParams();
  // const { data } = useSymbols.useGetSymbolsById(Number(id));
  const tabsData = [
    {
      id: "introduction",
      label: "معرفی",
      content: <SymbolsIntroCom />,
      permission: ["allow_any"],
    },
    {
      id: "competitors",
      label: "تحلیل رقبا",
      content: <AnalysisSymbolFeat />,
      permission: ["allow_any"],
    },
    {
      id: "pricing",
      label: "قیمت‌گذاری",
      content: <SymbolsPricingCom />,
      permission: ["allow_any"],
    },
  ];

  return (
    <MainLayout>
      <div className="w-full flex flex-col md:flex-row items-start justify-center p-6 relative">
        <div className="w-full bg-white rounded-lg shadow p-4 h-auto">
          <Tabs tabs={tabsData} />
        </div>
      </div>
      {/* <Calculator data={data} /> */}
    </MainLayout>
  );
};

export default SymbolsFeat;
