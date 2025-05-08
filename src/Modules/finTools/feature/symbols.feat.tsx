import { MainLayout } from "@/layouts";
import AnalysisSymbolFeat from "./analysis_symbol.feat";
import { Tabs } from "@/components";
import SymbolsPricingCom from "../components/symbolsTabs/symbols_pricing.com";
import SymbolsIntroCom from "../components/symbolsTabs/symbols_Intro.com";

const SymbolsFeat = () => {


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
    </MainLayout>
  );
};

export default SymbolsFeat;
