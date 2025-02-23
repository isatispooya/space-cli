import { MainLayout } from "../../../layouts";
import DashboardSlider, { SlideItem } from "../components/dashboard.slider";
import DashboardChart from "../components/dashboard.chart";
import { useMemo, useState } from "react";
import { DashboardMarketingStat } from "../components";
import { useDashboard } from "../hooks";
import DashboardCrowdStat from "../components/dashboardCrowd.stat";
import DashboardBimeStat from "../components/dashboardBime.stat";
import DashboardBorsStat from "../components/dashboardBors.stat";
import TimeflowVerify from "../../timeflow/components/oldVersionOfverify";

const DashboardPage = () => {
  const { data: shortcuts } = useDashboard.useGetShortcuts();
  const [isVerifyOpen, setIsVerifyOpen] = useState(true);

  const sliderData = useMemo(
    () =>
      Array.isArray(shortcuts)
        ? shortcuts.map((shortcut: SlideItem) => ({
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
      {isVerifyOpen && <TimeflowVerify onClose={() => setIsVerifyOpen(true)} />}
      <div className="container mx-auto px-4 py-2 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="lg:col-span-3 space-y-4 lg:space-y-6">
            <div className="h-[250px] sm:h-[300px] lg:h-[24vh] tour-slider">
              {sliderData.length > 0 && <DashboardSlider slides={sliderData} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sx gap-4 lg:gap-10">
              <div className="md:col-span-2 tour-stock-chart">
                <DashboardChart />
              </div>
              <div className="md:col-span-1 tour-marketing-stat">
                <DashboardMarketingStat />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
            <div className="tour-crowd">
              <DashboardCrowdStat />
            </div>
            <div className="tour-bime">
              <DashboardBimeStat />
            </div>
            <div className="tour-bors">
              <DashboardBorsStat />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
