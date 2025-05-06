import { useDashboard } from "../hooks";
import { bime } from "@/assets";
import { useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";

const DashboardBimeStat = () => {
  const { data: stats } = useDashboard.useGetPishkar();
  const navigate = useNavigate();

  return (
    <DashboardCard
      title="بیمه ایساتیس"
      icon={<img src={bime} alt="bime" className="w-10 h-10" />}
      iconColor="#1a5c35"
      waveColor="green"
      buttonText="پنل بیمه"
      onButtonClick={() => navigate("/requestinsurance/table")}
      customColors={{
        background: "#1a5c35",
        hoverBackground: "#16a34a",
        text: "white",
      }}
      content={
        <div className="flex-grow flex items-center justify-center">
          <p className="text-6xl font-bold text-[#1a5c35] font-iranSans">
            {stats?.pishkar || 0}
            <span className="text-base text-[#1a5c35] font-iranSans mr-1">
              عدد
            </span>
          </p>
        </div>
      }
      className="tour-bime"
    />
  );
};

export default DashboardBimeStat;
