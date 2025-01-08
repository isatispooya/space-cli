import { MainLayout } from "../../../layouts";
import DashboardSlider, { SlideItem } from "../components/dashboard.slider";
import DashboardChart from "../components/dashboard.chart";
import { useMemo } from "react";

import { DashboardMarketingStat } from "../components";
import { useDashboard } from "../hooks";
import DashboardCrowdStat from "../components/dashboardCrowd.stat";
import DashboardBimeStat from "../components/dashboardBime.stat";
import DashboardBorsStat from "../components/dashboardBors.stat";

const DashboardPage = () => {
  const { data: shortcuts } = useDashboard.useGetShortcuts();

  const sliderData = useMemo(
    () =>
      shortcuts?.map((shortcut: SlideItem) => ({
        id: shortcut.id,
        picture: shortcut.picture,
        title: shortcut.title,
        link: shortcut.link,
      })) || [],
    [shortcuts]
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="lg:col-span-3 space-y-4 lg:space-y-6">
            <div className="h-[250px] sm:h-[300px] lg:h-[24vh]">
              {sliderData.length > 0 && <DashboardSlider slides={sliderData} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sx gap-4 lg:gap-10 ">
              <div className="md:col-span-2 ">
                <DashboardChart />
              </div>
              <div className="md:col-span-1 ">
                <DashboardMarketingStat />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
            <div>
              <DashboardCrowdStat />
            </div>
            <div>
              <DashboardBimeStat />
            </div>
            <div>
              <DashboardBorsStat />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
