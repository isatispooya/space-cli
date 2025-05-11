import { MainLayout } from "../../../layouts";
import DashboardSlider, { SlideItemType } from "../components/dashboard.slider";
import DashboardChart from "../components/dashboard.chart";
import { useMemo } from "react";
import { DashboardMarketingStat, DashboardToolsStat } from "../components";
import { useDashboard } from "../hooks";
import {
  DashboardCrowdStat,
  DashboardGoldStat,
  DashboardBimeStat,
  DashboardBorsStat,
} from "../components";

const DashboardPage = () => {
  const { data: shortcuts } = useDashboard.useGetShortcuts();

  const sliderData = useMemo(
    () =>
      Array.isArray(shortcuts)
        ? shortcuts.map((shortcut: SlideItemType) => ({
            id: shortcut.id,
            picture: shortcut.picture,
            title: shortcut.title,
            link: shortcut.link,
          }))
        : [],
    [shortcuts]
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-2 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <div className="lg:col-span-3 grid grid-rows-3 gap-4 h-full">
            <div className="h-full">
              <DashboardCrowdStat />
            </div>
            <div className="h-full">
              <DashboardToolsStat />
            </div>
            <div className="h-full">
              <DashboardMarketingStat />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col h-full">
            <div className="mb-4">
              {sliderData.length > 0 && <DashboardSlider slides={sliderData} />}
            </div>
            <div className="flex-grow">
              <DashboardChart />
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-rows-3 gap-4 h-full">
            <div className="h-full">
              <DashboardBorsStat />
            </div>
            <div className="h-full">
              <DashboardBimeStat />
            </div>
            <div className="h-full">
              <DashboardGoldStat />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
