import { ReactNode, useEffect, useState } from "react";
import { useInvitation } from "../../marketing/hooks";
import { motion } from "framer-motion";
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
  const { data: invitedUsers } = useInvitation.useGetList();

  const allNames = [...(invitedUsers || [])];
  console.log(allNames);

  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

  useEffect(() => {
    const indices = [];
    if (allNames.length >= 1) indices.push(0);
    if (allNames.length >= 2) indices.push(1);
    if (allNames.length >= 3) indices.push(2);
    setVisibleIndices(indices);

    if (allNames.length > 3) {
      const interval = setInterval(() => {
        setVisibleIndices((prevIndices) => {
          return prevIndices.map((index) => (index + 1) % allNames.length);
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [allNames.length]);

  const handleCopy = async () => {
    const code = invitation?.[0]?.invitation_code_detail?.code;
    if (code) {
      await navigator.clipboard.writeText(
        `my.isatispooya.com/login?rf=${code}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      console.error("Invitation code is undefined");
    }
  };

  const getMotionDivStyles = () => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    className: "relative bg-white rounded-xl shadow-lg p-6 h-auto md:h-[520px] transition-shadow duration-300 hover:shadow-2xl transform hover:scale-105",
    style: { zIndex: 2 }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="background" style={{ zIndex: -2 }}></div>

      <motion.div {...getMotionDivStyles()}>
        <div className="flex flex-col md:flex-row items-center justify-between space-x-4">
          <div className="flex items-center">
            <RiUserReceived2Line className="w-5 h-6 text-[#E5533D] animate-bounce" />
            <h3 className="text-sm text-[#E5533D] font-bold font-iranSans mr-2">
              باشگاه مشتریان
            </h3>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center">
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-4xl md:text-6xl lg:text-8xl text-center font-bold text-[#E5533D] font-iranSans"
          >
            {invitation?.[0]?.invited_user_detail?.uniqueIdentifier || 0}
            <span className="text-sm text-[#E5533D] font-iranSans mr-2">
              نفر
            </span>
          </motion.p>
        </div>

        <div className="mt-6 mb-4 flex-grow">
          <h4 className="text-gray-600 font-iranSans mb-3 text-sm">
            لیست کاربران دعوت شده
          </h4>
          <div className="flex flex-col gap-1 overflow-hidden" style={{ height: '150px' }}>
            {visibleIndices.map((index) => {
              const userDetail = allNames[index]?.invited_user_detail;
              return (
                <motion.div
                  key={index}
                  className="p-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="flex flex-col">
                    <span className="font-iranSans text-gray-800 text-base whitespace-nowrap overflow-hidden text-ellipsis flex justify-between">
                      <span>{userDetail ? `${userDetail.first_name} ${userDetail.last_name}` : "نام کاربر نامشخص"}</span>
                      <span>{userDetail ? ` ${userDetail.uniqueIdentifier}` : ""}</span>
                    </span>
                    <div className="w-full h-0.5 bg-[#E5533D] opacity-10"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-[120px] z-20">
          <div className="flex items-center gap-1 bg-[#ffffff] p-1.5 rounded-lg shadow-inner hover:bg-gray-200 transition-colors duration-200">
            <p className="flex-1 text-[13px] text-[#E5533D] font-iranSans truncate">
              {`my.isatispooya.com/login?rf=${
                invitation?.[0]?.invitation_code_detail?.code || ""
              }`}
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className={`px-2 rounded-md text-[12px] font-medium transition-all duration-200 ${
                copied
                  ? "bg-[#E5533D] text-[#ffffff]"
                  : "bg-[#E5533D] text-white hover:bg-[#E57350]"
              }`}
            >
              {copied ? "کپی شد!" : "کپی لینک"}
            </motion.button>
          </div>
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
            fill="#E5533D"
            fillOpacity="0.3"
            d="M0,160L34.3,165.3C68.6,171,137,181,206,192C274.3,203,343,213,411,197.3C480,181,549,139,617,144C685.7,149,754,203,823,224C891.4,245,960,235,1029,213.3C1097.1,192,1166,160,1234,144C1302.9,128,1371,128,1406,128L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default DashboardMarketingStat;
