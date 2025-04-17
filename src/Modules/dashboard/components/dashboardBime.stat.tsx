import { useDashboard } from "../hooks";
import { IoIosArrowBack } from "react-icons/io";
import bimeImg from "../../../../public/assets/bime.png";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/cards/card";
import WaveEffect from "../../../ui/wave";
import "../../../ui/wave.css";
import { Button } from "@/components";

const DashboardBimeStat = () => {
  const { data: stats } = useDashboard.useGetPishkar();
  const navigate = useNavigate();

  const content = (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center mb-6">
        <img src={bimeImg} alt="bime" className="w-10 h-10" />
        <h3 className="text-base text-[#1a5c35] font-bold font-iranSans mr-2">
          بیمه ایساتیس
        </h3>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <p className="text-6xl font-bold text-[#1a5c35] font-iranSans">
          {stats?.pishkar || 0}
          <span className="text-base text-[#1a5c35] font-iranSans mr-1">
            عدد
          </span>
        </p>
      </div>

      <div className="mt-auto pt-4 relative z-10 w-full">
        <Button
          onClick={() => navigate("/requestinsurance/table")}
          variant="custom"
          customColors={{
            background: "#1a5c35",
            hoverBackground: "#16a34a",
            text: "white",
          }}
          fullWidth
          animationOnHover="scale"
          animationOnTap="scale"
          className="w-full py-2 px-3  rounded-lg font-iranSans text-base"
          rightIcon={<IoIosArrowBack className="w-4 h-4" />}
        >
          <span className="font-bold">پنل بیمه</span>
        </Button>
      </div>
    </div>
  );

  return (
    <Card
      disableAnimation={true}
      className="relative bg-white rounded-xl shadow-md p-4 w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl wave-container"
      contentClassName="h-full p-0"
      content={content}
      customStyles={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      padding="0"
      footerSlot={<WaveEffect color="green" />}
    />
  );
};

export default DashboardBimeStat;
