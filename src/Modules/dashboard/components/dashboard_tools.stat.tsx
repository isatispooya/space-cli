import { FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/cards/card";
import WaveEffect from "../../../ui/wave";
import "../../../ui/wave.css";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components";

const DashboardToolsStat = () => {
  const navigate = useNavigate();

  const content = (
    <div className="flex flex-col h-full w-full p-4">
      {/* Header */}
      <div className="flex items-center mb-10">
        <FaTools className="w-5 h-5 text-gray-700" />
        <h3 className="text-sm text-[#2D3748] font-bold font-iranSans mr-2">
          ابزار های مالی
        </h3>
      </div>

      {/* Title */}
      <div className="flex-grow flex flex-col mb-8 ">
        <p className="text-lg font-bold text-[#2D3748] font-iranSans text-center">
          ابزارهای مدیریت مالی
        </p>
        <p className="text-xs text-gray-600 mt-1 font-iranSans text-center">
          مدیریت هوشمند دارایی‌ها و سرمایه‌گذاری
        </p>
      </div>

      {/* Tools */}
      <div className="mt-auto pt-4 relative z-10 w-full">
        <Button
          onClick={() => navigate("/finTools")}
          variant="custom"
          customColors={{
            background: "#2D3748",
            hoverBackground: "#898989",
            text: "white",
          }}
          fullWidth
          animationOnHover="scale"
          animationOnTap="scale"
          className="w-full py-2 px-3  rounded-lg font-iranSans text-base"
          rightIcon={<IoIosArrowBack className="w-4 h-4" />}
        >
          <span>امورمالی</span>
        </Button>
      </div>
    </div>
  );

  return (
    <Card
      onClick={undefined}
      disableAnimation={true}
      className="relative bg-white rounded-xl shadow-md w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl wave-container"
      contentClassName="h-full p-0 flex flex-col"
      content={content}
      customStyles={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
      padding="0"
      footerSlot={<WaveEffect color="dark" />}
    />
  );
};

export default DashboardToolsStat;
