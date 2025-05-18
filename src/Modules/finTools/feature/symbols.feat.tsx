import { MainLayout } from "@/layouts";
import AnalysisSymbolFeat from "../components/symbolsTabs/analysis/analysis_symbol.com";
import { Tabs } from "@/components";
import SymbolsPricingCom from "../components/symbolsTabs/pricing/symbols_pricing.com";
import SymbolsIntroCom from "../components/symbolsTabs/intro/symbols_Intro.com";
import { useSymbols } from "../hooks";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CalculationFeat from "./calculation.feat";

const SymbolsFeat = () => {
  const { id } = useParams();
  const { data } = useSymbols.useGetSymbolsById(Number(id));
  const [activeTab, setActiveTab] = useState("introduction");

  // Check if the symbol is fixed income type
  const isFixedIncome = data?.[0]?.symbol_detail?.type === "fixincome";

  // Create base tabs that are always shown
  const baseTabs = [
    {
      id: "introduction",
      label: "معرفی",
      content: (
        <SymbolsIntroCom
          onSwitchToCalculator={() => setActiveTab("calculator")}
        />
      ),
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

  // Add calculator tab only for fixed income symbols
  const tabsData = isFixedIncome
    ? [
        ...baseTabs,
        {
          id: "calculator",
          label: "ماشین حساب سود",
          content: <CalculationFeat data={data} />,
          permission: ["allow_any"],
        },
      ]
    : baseTabs;

  return (
    <MainLayout>
      <div className="w-full flex flex-col md:flex-row items-start justify-center p-6 relative">
        <div className="w-full bg-white rounded-lg shadow p-4 h-auto">
          <Tabs
            tabs={tabsData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default SymbolsFeat;
