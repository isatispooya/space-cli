import { ReactNode } from "react";
import { useInvitation } from "../../marketing/hooks";
import { motion } from "framer-motion";
import { useState } from "react";
import { RiUserReceived2Line } from "react-icons/ri";


export interface StatsProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeText?: string;
  changeTimeSpan?: string;
  trend?: "up" | "down" | "neutral";
  bgColor?: string;
  iconColor?: string;
  route?: string;
}

const DashboardMarketingStat = () => {
  const [copied, setCopied] = useState(false);
  const { data: invitation } = useInvitation.useGetCodes();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `my.isatispooya.com/login?rf=${invitation?.[0]?.invitation_code_detail.code}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  

  return (
    <div>
      <div className="background" style={{ zIndex: -2 }}>
        {/* پس‌زمینه */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-xl shadow-lg p-6 h-full transition-shadow duration-300 hover:shadow-2xl transform hover:scale-105"
        style={{ zIndex: 2, backgroundColor: '#ebf8ff' }}
      >
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center">
            <RiUserReceived2Line className="w-5 h-5 text-[#3182ce]" />
            <h3 className="text-sm text-[#3182ce] font-bold font-iranSans">
              کاربران دعوت شده
            </h3>
          </div>
        </div>

        <div className="mb-4">
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-6xl md:text-8xl text-center font-bold text-[#3182ce] mt-2 font-iranSans"
          >
            {invitation?.[0]?.invited_user_detail.uniqueIdentifier || 0}
            <span className="text-sm text-[#3182ce] font-iranSans">
              نفر
            </span>
          </motion.p>
        </div>
        <div className="relative z-20 flex items-center gap-1 bg-gray-100 p-1.5 rounded-lg shadow-inner hover:bg-gray-200 transition-colors duration-200 mt-4">
          <p className="flex-1 text-[13px] text-[#3182ce] font-iranSans truncate">
            {`my.isatispooya.com/login?rf=${invitation?.[0]?.invitation_code_detail.code}`}
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={`px-2 rounded-md text-[12px] font-medium transition-all duration-200 ${
              copied ? "bg-blue-200 text-blue-700" : "bg-blue-200 text-blue-700 hover:bg-blue-300"
            }`}
          >
            {copied ? "کپی شد!" : "کپی لینک"}
          </motion.button>
        </div>

        <svg
          className="absolute bottom-0 rounded-xl left-0 w-full h-32 md:h-48"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          width="100%"
          style={{ zIndex: 1 }}
        >
          <path
            fill="#63b3ed"
            fillOpacity="0.3"
            d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,245.3C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

       
      </motion.div>
    </div>
  );
};

export default DashboardMarketingStat;
