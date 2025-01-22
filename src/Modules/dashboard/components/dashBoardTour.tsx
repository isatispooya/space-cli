import React from "react";
import Joyride, {
  Step,
  CallBackProps,
  TooltipRenderProps,
} from "react-joyride";
import "../../../styles/tour.css";

interface TourProps {
  runTour: boolean;
  onTourEnd: () => void;
}

const Tooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  size,
  tooltipProps,
}: TooltipRenderProps) => (
  <div
    {...tooltipProps}
    className="rtl bg-white p-3 sm:p-4 rounded-lg shadow-lg max-w-[90vw] sm:max-w-md md:max-w-lg w-full"
  >
    <div className="text-gray-700 text-xs sm:text-sm font-iranSans break-words">
      {step.content}
    </div>
    <div className="mt-3 sm:mt-4 flex flex-wrap sm:flex-nowrap gap-1.5 sm:gap-2 justify-start">
      {index > 0 && (
        <button
          {...backProps}
          className="w-full sm:w-auto px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-iranSans"
        >
          قبلی
        </button>
      )}
      {continuous ? (
        <button
          {...primaryProps}
          className="w-full sm:w-auto px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs sm:text-sm font-iranSans"
        >
          {index === size - 1 ? "پایان" : "بعدی"}
        </button>
      ) : (
        <button
          {...closeProps}
          className="w-full sm:w-auto px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs sm:text-sm font-iranSans"
        >
          بستن
        </button>
      )}
      {index < size - 1 && (
        <button
          {...skipProps}
          className="w-full sm:w-auto px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-iranSans"
        >
          رد کردن
        </button>
      )}
    </div>
  </div>
);

const DashboardTour: React.FC<TourProps> = ({ runTour, onTourEnd }) => {
  const steps: Step[] = [
    {
      target: ".tour-slider",
      content: "دسترسی به فرصت های سرمایه گذاری از طریق قسمت میانبر",
      placement: "bottom",
      disableBeacon: true,
    },
    {
      target: ".tour-share-dashboard",
      content: "اشتراک گذاری فرصت های سرمایه گذاری",
      disableBeacon: true,
    },
    {
      target: ".tour-stock-chart",
      content: " نمای کلی درصد سهام شما",
      disableBeacon: true,
    },
    {
      target: ".tour-marketing-stat",
      content: "باشگاه مشتریان و امتیازات شما",
      disableBeacon: true,
    },
    {
      target: ".tour-marketing-share",
      content:
        "با اشتراک گذاری این لینک دوستان خود را دعوت کیند و امتیاز کسب کنید",
      disableBeacon: true,
    },
    {
      target: ".tour-crowd",
      content: "دسترسی سریع به پنل ایساتیس کراد شما ",
      disableBeacon: true,
    },
    {
      target: ".tour-bime",
      content: "پنل بیمه شما",
      disableBeacon: true,
    },
    {
      target: ".tour-bors",
      content:
        "نمای سهام های شما در کاگزاری ایساتیس پویا و ورود به پنل کارگزاری",
      disableBeacon: true,
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (["finished", "skipped"].includes(status)) {
      onTourEnd();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous={true}
      scrollToFirstStep={true}
      showSkipButton={true}
      showProgress={true}
      callback={handleJoyrideCallback}
      tooltipComponent={Tooltip}
      disableOverlayClose={true}
      spotlightClicks={false}
      disableOverlay={false}
      hideBackButton={false}
      locale={{
        back: "قبلی",
        close: "بستن",
        last: "پایان",
        next: "بعدی",
        skip: "رد کردن",
      }}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#3B82F6",
        },
      }}
    />
  );
};

export default DashboardTour;
