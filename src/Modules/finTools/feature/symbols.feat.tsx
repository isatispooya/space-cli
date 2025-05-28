import { MainLayout } from "@/layouts";
import { Tabs } from "@/components";
import {
  SymbolsIntroCom,
  SymbolsPricingCom,
  AnalysisSymbolCom,
  InvestDocument,
  BaseReport,
} from "../components";
import { useSymbols } from "../hooks";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CalculationFeat, TransactionsFeat } from ".";

const SymbolsFeat = () => {
  const { id } = useParams();
  const { data } = useSymbols.useGetSymbolsById(Number(id));
  const [activeTab, setActiveTab] = useState("introduction");

  const isFixedIncome = data?.[0]?.symbol_detail?.type === "fixincome";


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
      content: <AnalysisSymbolCom />,
      permission: ["view_all_introduce_symbols"],
    },
    {
      id: "pricing",
      label: "قیمت‌گذاری",
      content: <SymbolsPricingCom />,
      permission: ["view_all_introduce_symbols"],
    },

    {
      id: "calculation",
      label: "بارگزاری ddn  ",
      content: <InvestDocument />,
      permission: ["view_all_introduce_symbols"],
    },
    {
      id: "investment",
      label: "معاملات سرمایه گذاران ",
      content: <TransactionsFeat />,
      permission: ["view_all_introduce_symbols"],
    },
    {
      id: "base_reports",
      label: "گزارشات پایه",
      content: <BaseReport />,
      permission: ["view_all_introduce_symbols"],
    },
  ];

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
