import { IoIosArrowBack } from "react-icons/io";
import Card from "../../../components/cards/card";
import WaveEffect from "../../../ui/wave";
import "../../../ui/wave.css";
import { Button } from "@/components";

const DashboardGoldStat = () => {
  const content = (
    <div className="flex flex-col h-full w-full p-4">
      <div className="flex items-start">
        <h3 className="text-base text-amber-900 font-bold font-iranSans tracking-tight">
          طلای آب شده
        </h3>
      </div>

      <div className="flex-grow flex items-center justify-center mb-5">
        <div className="relative w-full h-24 flex items-center justify-center">
          <svg
            className="absolute w-20 h-12 transform -rotate-12 left-1/2 -translate-x-1/2"
            viewBox="0 0 100 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="5"
              width="90"
              height="50"
              rx="5"
              fill="#f59e0b"
              stroke="#d97706"
              strokeWidth="2"
            />
            <path
              d="M5 15L95 10M5 25L95 20M5 35L95 30"
              stroke="#fbbf24"
              strokeWidth="2"
              opacity="0.7"
            />
          </svg>
          <svg
            className="absolute w-18 h-11 transform rotate-6 left-1/2 -translate-x-1/2 top-1"
            viewBox="0 0 100 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="5"
              width="90"
              height="50"
              rx="5"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="2"
            />
            <path
              d="M5 15L95 10M5 25L95 20M5 35L95 30"
              stroke="#f59e0b"
              strokeWidth="2"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      <div className="mt-auto relative z-10 w-full">
        <Button
          variant="custom"
          customColors={{
            background: "#FCBB01",
            hoverBackground: "#F6D16D",
            text: "white",
          }}
          fullWidth
          animationOnHover="scale"
          animationOnTap="scale"
          rightIcon={<IoIosArrowBack className="w-4 h-4" />}
          className="font-iranSans text-base"
        >
          <span>به زودی</span>
        </Button>
      </div>
    </div>
  );

  return (
    <Card
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
      footerSlot={<WaveEffect color="orange" />}
    />
  );
};

export default DashboardGoldStat;
