import { useDashboard } from "../hooks";
import { crowd } from "@/assets";
import usePostUUID from "../hooks/useuuidpost";
import toast from "react-hot-toast";
import DashboardCard from "./DashboardCard";

const formatValue = (value: number) => {
  const length = value.toString().length;

  if (length > 9) {
    const billionValue = Math.floor(value / 1000000000);
    return (
      <>
        {billionValue}
        <span className="text-base text-[#4b0082] font-iranSans"> میلیارد</span>
        <span className="text-base text-[#4b0082] font-iranSans"> ریال</span>
      </>
    );
  } else if (length > 6) {
    const millionValue = Math.floor(value / 1000000);
    return (
      <>
        {millionValue}
        <span className="text-base text-[#4b0082] font-iranSans"> میلیون</span>
        <span className="text-base text-[#4b0082] font-iranSans"> ریال</span>
      </>
    );
  } else if (length > 3) {
    const thousandValue = Math.floor(value / 1000);
    return (
      <>
        {thousandValue}
        <span className="text-base text-[#4b0082] font-iranSans"> هزار</span>
        <span className="text-base text-[#4b0082] font-iranSans"> ریال</span>
      </>
    );
  }
  return value;
};

const DashboardCrowdStat = () => {
  const { data: stats } = useDashboard.useGetCrowd();
  const { mutate: crowdUUID } = usePostUUID();
  
  const totalValue = Number(stats?.["total value"]);

  const handleCrowdUUID = () => {
    crowdUUID(undefined, {
      onSuccess: (response) => {
        const crowdUUIDLink = `https://app.isatiscrowd.ir/onetimeLogin/${response.uuid}`;
        window.open(crowdUUIDLink, "_blank");
      },
      onError: (error) => {
        toast.error(`خطایی رخ داده است: ${error.message}`);
        window.location.href = "https://app.isatiscrowd.ir/login";
      },
    });
  };

  return (
    <DashboardCard
      title="ایساتیس کراد"
      icon={<img src={crowd} alt="crowd" className="w-10 h-10" />}
      iconColor="#4b0082"
      waveColor="purple"
      buttonText="پنل کراد"
      onButtonClick={handleCrowdUUID}
      customColors={{
        background: "#4b0082",
        hoverBackground: "#6b238e",
        text: "white",
      }}
      content={
        <div className="flex-grow">
          <p className="text-sm font-bold text-[#4b0082] font-iranSans">
            {stats?.["total value"]
              ? "مجموع تامین مالی جمعی"
              : "مجموع تامین مالی جمعی"}
          </p>
          <div className="text-center mt-3">
            <p className="text-6xl font-bold text-[#4b0082] font-iranSans overflow-hidden text-ellipsis whitespace-nowrap">
              {!totalValue ? (
                <>
                  0
                  <span className="text-base text-[#4b0082] font-iranSans">
                    {" "}
                    ریال
                  </span>
                </>
              ) : (
                formatValue(totalValue)
              )}
            </p>
          </div>
        </div>
      }
      className="tour-crowd"
    />
  );
};

export default DashboardCrowdStat;
