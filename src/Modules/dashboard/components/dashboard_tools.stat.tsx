import { FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";

const DashboardToolsStat = () => {
  const navigate = useNavigate();

  return (
    <DashboardCard
      title="ابزار های مالی"
      icon={<FaTools className="w-5 h-5" />}
      iconColor="#2D3748"
      waveColor="dark"
      buttonText="ابزار ها"
      onButtonClick={() => navigate("/finTools")}
      customColors={{
        background: "#2D3748",
        hoverBackground: "#898989",
        text: "white",
      }}
      content={
        <div className="flex flex-col items-center mb-8">
          <p className="text-lg font-bold text-[#2D3748] font-iranSans text-center">
            ابزار های مالی
          </p>
          <p className="text-xs text-gray-600 mt-1 font-iranSans text-center">
            مدیریت هوشمند دارایی‌ها و سرمایه‌گذاری
          </p>
        </div>
      }
    />
  );
};

export default DashboardToolsStat;
