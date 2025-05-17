import { FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";

const DashboardToolsStat = () => {
  const navigate = useNavigate();

  return (
    <DashboardCard
      title="ابزار های مالی"
      icon={<FaTools className="w-5 h-5" />}
      iconColor="#0ac9cb"
      waveColor="custom1"
      buttonText="پنل ابزار های مالی"
      onButtonClick={() => navigate("/finTools")}
      customColors={{
        background: "#099ea0",
        hoverBackground: "#18e9f3",
        text: "white",
      }}
      content={
        <div className="flex flex-col items-center mb-8">
          <p className="text-lg font-bold text-[#099ea0] font-iranSans text-center">
            ابزار های مالی
          </p>
          <p className="text-xs text-[#099ea0] mt-1 font-iranSans text-center">
            مدیریت هوشمند دارایی‌ها و سرمایه‌گذاری
          </p>
        </div>
      }
    />
  );
};

export default DashboardToolsStat;
