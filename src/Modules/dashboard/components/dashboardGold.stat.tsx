import { FaCoins } from "react-icons/fa";
import DashboardCard from "./DashboardCard";

const DashboardGoldStat = () => {
  const goldContent = (
    <div className="flex-grow flex items-center justify-center">
      <div className="relative w-full h-12 flex items-center justify-center">
        <svg
          className="absolute w-14 h-8 transform -rotate-12 left-1/2 -translate-x-1/2"
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
          className="absolute w-14 h-8 transform rotate-6 left-1/2 -translate-x-1/2 top-0"
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
  );

  return (
    <DashboardCard
      title="طلای آب شده"
      icon={<FaCoins className="w-3.5 h-3.5" />}
      iconColor="#b45309"
      waveColor="orange"
      buttonText="به زودی"
      customColors={{
        background: "#FCBB01",
        hoverBackground: "#F6D16D",
        text: "white",
      }}
      content={goldContent}
      className="tour-gold"
    />
  );
};

export default DashboardGoldStat;
