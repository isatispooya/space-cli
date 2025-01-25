import React from "react";
import Joyride, {
  Step,
  CallBackProps,
  TooltipRenderProps,
} from "react-joyride";
import "../../../styles/tour.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";

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
    className="rtl bg-white p-3 sm:p-4 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] max-w-[92vw] sm:max-w-[360px] md:max-w-[400px] w-full mx-auto border border-blue-100"
  >
    {/* Header */}
    <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 flex items-center justify-center">
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <h3 className="text-xs sm:text-sm font-bold text-gray-800 font-iranSans">
          راهنمای {index + 1} از {size}
        </h3>
        <p className="text-[10px] sm:text-[11px] text-gray-500 font-iranSans">
          برای آشنایی بیشتر با امکانات، راهنما را دنبال کنید
        </p>
      </div>
    </div>

    {/* Content */}
    <div className="bg-blue-50 p-2.5 sm:p-3 rounded-md mb-3 sm:mb-4">
      <div className="text-gray-700 text-xs sm:text-sm font-iranSans leading-5 sm:leading-6">
        {step.content}
      </div>
    </div>

    {/* Progress Bar */}
    <div className="w-full bg-gray-100 rounded-full h-0.5 mb-3">
      <div
        className="bg-blue-500 h-0.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${((index + 1) / size) * 100}%` }}
      />
    </div>

    {/* Buttons */}
    <div className="flex flex-wrap sm:flex-nowrap gap-1.5 sm:gap-2 justify-start">
      {index > 0 && (
        <button
          {...backProps}
          className="w-full sm:w-auto min-w-[70px] px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 active:bg-gray-100 text-xs sm:text-sm font-iranSans transition-all duration-200 flex items-center justify-center gap-1"
        >
          <MdKeyboardArrowRight className=" text-lg" />
          قبلی
        </button>
      )}
      {continuous ? (
        <button
          {...primaryProps}
          className="w-full sm:w-auto min-w-[70px] px-2.5 sm:px-3 py-1.5 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 text-xs sm:text-sm font-iranSans transition-all duration-200 flex items-center justify-center gap-1"
        >
          {index === size - 1 ? (
            <>
              پایان
              <IoCheckmark />
            </>
          ) : (
            <>
              بعدی
              <MdKeyboardArrowLeft className=" text-lg" />
            </>
          )}
        </button>
      ) : (
        <button
          {...closeProps}
          className="w-full sm:w-auto min-w-[70px] px-2.5 sm:px-3 py-1.5 sm:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 text-xs sm:text-sm font-iranSans transition-all duration-200 flex items-center justify-center gap-1"
        >
          بستن
        </button>
      )}
      {index < size - 1 && (
        <button
          {...skipProps}
          className="w-full sm:w-auto min-w-[70px] px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 active:bg-gray-100 text-xs sm:text-sm font-iranSans transition-all duration-200"
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
      target: ".tour-dashboard-menu",
      content: "دسترسی به قسمت های مختلف پنل",
      disableBeacon: true,
    },
    {
      target: ".tour-header-profile",
      content: "پروفایل شما و تنظیمات حساب کاربری",
      disableBeacon: true,
    },
    {
      target: ".tour-header-notification",
      content: "اطلاع رسانی ها و پیام ها",
      disableBeacon: true,
    },
    {
      target: ".tour-header-points",
      content: "امتیازات شما و پاداش ها",
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
          overlayColor: "rgba(0, 0, 0, 0.5)",
          backgroundColor: "#ffffff",
          arrowColor: "#ffffff",
          textColor: "#4B5563",
        },
        spotlight: {
          borderRadius: "8px",
          backgroundColor: "transparent",
        },
      }}
    />
  );
};

export default DashboardTour;
