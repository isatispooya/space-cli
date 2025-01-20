/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState, useMemo } from "react";
import { useInvitation } from "../../invitation/hooks";
import { motion } from "framer-motion";
import { RiUserReceived2Line } from "react-icons/ri";
import "moment/locale/fa";
import moment from "moment-jalaali";
import { useRemainPoints } from "../../points";
import { useNavigate } from "react-router-dom";
import { TbSeeding } from "react-icons/tb";
import { LuCoins } from "react-icons/lu";
import { useProfile } from "../../userManagment";

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
  created_at?: string;
}

const DashboardMarketingStat = () => {
  const [copied, setCopied] = useState(false);
  const { data: remainPoints } = useRemainPoints();
  const { data: invitation } = useInvitation.useGetCodes();
  const { data: invitedUsers } = useInvitation.useGetList();
  const { data: profile } = useProfile();

  const invitedUserFiltered = useMemo(() => {
    if (!Array.isArray(invitedUsers) || !profile?.uniqueIdentifier) {
      return [];
    }

    return invitedUsers.filter(
      (item: any) =>
        item.invitation_code_detail?.introducer_user_detail
          ?.uniqueIdentifier === profile.uniqueIdentifier
    );
  }, [invitedUsers, profile]);

  const invitedUserFilteredCode = useMemo(() => {
    if (!Array.isArray(invitation) || !profile?.uniqueIdentifier) {
      return [];
    }

    return invitation.filter(
      (item: any) =>
        item.introducer_user_detail.uniqueIdentifier ===
        profile.uniqueIdentifier
    );
  }, [invitation, profile]);

  const navigate = useNavigate();

  const allNames = [...(invitedUserFiltered || [])];

  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return "";
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    } else {
      return num.toString();
    }
  };

  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

  useEffect(() => {
    const indices = [];
    if (allNames.length >= 1) indices.push(0);
    if (allNames.length >= 2) indices.push(1);
    if (allNames.length >= 3) indices.push(2);
    if (allNames.length >= 4) indices.push(3);
    setVisibleIndices(indices);

    if (allNames.length > 4) {
      const interval = setInterval(() => {
        setVisibleIndices((prevIndices) => {
          return prevIndices.map((index) => (index + 1) % allNames.length);
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [allNames.length]);

  const handleCopy = async () => {
    const code = invitedUserFilteredCode?.[0]?.code;
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
    className:
      "relative bg-white rounded-xl shadow-lg p-6 h-auto sm:h-[520px] md:h-[520px] lg:h-[550px] transition-shadow duration-300 hover:shadow-2xl transform hover:scale-105 ",
    style: { zIndex: 2 },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative isolate"
    >
      <div className="background"></div>

      <motion.div {...getMotionDivStyles()}>
        <div className="flex flex-col md:flex-row items-center justify-between space-x-4 ">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <RiUserReceived2Line className="w-5 h-6 text-[#D2042D] " />
              <h3 className="text-sm text-[#D2042D] font-bold font-iranSans mr-2">
                باشگاه مشتریان
              </h3>
            </div>
            <button
              onClick={() => navigate("/points/missions")}
              className="flex items-center gap-2 text-xs text-[#D2042D] border-2 border-[#D2042D] rounded-lg px-3 py-1.5 hover:bg-[#D2042D] hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md"
            >
              <LuCoins className="w-4 h-4" />
              <span>امتیازات</span>
            </button>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center mt-10">
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-xl sm:text-4xl md:text-6xl lg:text-8xl text-center font-bold text-[#A0001C] font-iranSans mt-8 sm:mt-0"
          >
            <span className="flex flex-col sm:flex-row items-center">
              <button onClick={() => navigate("/invitation/list")}>
                {invitedUserFiltered?.length || 0}
                <span className="text-[10px] sm:text-sm text-[#D2042D] font-iranSans mx-2">
                  نفر
                </span>
              </button>
              <button onClick={() => navigate("/points/missions")}>
                <div className="flex flex-col items-center sm:mr-8 mt-6 sm:mt-0">
                  <div className="flex items-center mb-3">
                    <span className="text-[#A0001C] text-base sm:text-xl font-bold w-20 text-left">
                      {formatNumber(remainPoints?.point_1)}
                    </span>
                    <LuCoins className="text-yellow-500 text-[16px] sm:text-[25px] font-bold ml-2" />
                    <span className="text-[10px] sm:text-sm text-[#D2042D] w-16">
                      (سکه)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#A0001C] text-base sm:text-xl font-bold w-20 text-left">
                      {formatNumber(remainPoints?.point_2)}
                    </span>
                    <TbSeeding className="text-green-500 text-[16px] sm:text-[25px] font-bold ml-2" />
                    <span className="text-[10px] sm:text-sm text-[#D2042D] w-16">
                      (بذر)
                    </span>
                  </div>
                </div>
              </button>
            </span>
          </motion.p>
        </div>
        <div className="mt-6 mb-4 flex-grow">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-gray-600 font-iranSans text-sm">
              لیست کاربران دعوت شده
            </h4>
            <button
              onClick={() => navigate("/invitation/list")}
              className="text-xs text-gray-600 hover:text-[#D2042D] transition-colors"
            >
              مشاهده بیشتر
            </button>
          </div>
          <div
            className="flex flex-col gap-1 overflow-hidden"
            style={{ height: "180px" }}
          >
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
                      <span>
                        {userDetail
                          ? `${userDetail.first_name} ${userDetail.last_name}`
                          : "نام کاربر نامشخص"}
                      </span>
                      <span>
                        {userDetail
                          ? ` ${moment(userDetail.created_at)
                              .locale("fa")
                              .format("jYYYY/jMM/jDD")}`
                          : ""}
                      </span>
                    </span>
                    <div className="w-full h-0.5 bg-[#D2042D] opacity-10"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative z-20 py-8 md:py-4 sm:py-[10px] xs:py-0 ">
          <div className="flex items-center gap-1 bg-[#ffffff] p-1.5 rounded-lg shadow-inner hover:bg-gray-200 transition-colors duration-200">
            <p className="flex-1 text-[13px] text-[#D2042D] font-iranSans truncate">
              {`my.isatispooya.com/login?rf=${
                invitedUserFilteredCode?.[0]?.code || ""
              }`}
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className={`px-2 rounded-md text-[12px] font-medium transition-all duration-200 ${
                copied
                  ? "bg-[#D2042D] text-[#ffffff]"
                  : "bg-[#D2042D] text-white hover:bg-[#E57350]"
              }`}
            >
              {copied ? "کپی شد!" : "کپی لینک"}
            </motion.button>
          </div>
        </div>

        <svg
          className="absolute bottom-0 rounded-xl left-0 w-full  lg:h-56 xl:h-64 sm:h-48 md:h-56  xs:h-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ zIndex: -1 }}
        >
          <path
            fill="#A0001C"
            fillOpacity=".6"
            d="M0,160L34.3,165.3C68.6,171,137,181,206,192C274.3,203,343,213,411,197.3C480,181,549,139,617,144C685.7,149,754,203,823,224C891.4,245,960,235,1029,213.3C1097.1,192,1166,160,1234,144C1302.9,128,1371,128,1406,128L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default DashboardMarketingStat;
