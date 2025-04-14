/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState, useMemo } from "react";
import { useInvitation } from "../../invitation/hooks";
import { motion } from "framer-motion";
import { RiUserReceived2Line } from "react-icons/ri";
import "moment/locale/fa";
import { useRemainPoints } from "../../points";
import { useNavigate } from "react-router-dom";
import { TbSeeding } from "react-icons/tb";
import { LuCoins } from "react-icons/lu";
import { useProfile } from "../../userManagment";
import { useUserPermissions } from "../../permissions";
import { MdCardGiftcard } from "react-icons/md";

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
  const { data: profile } = useProfile();
  const { data: invitedUsers } = useInvitation.useGetList();
  const { data: permissions } = useUserPermissions();
  const navigate = useNavigate();

  const hasPermission =
    Array.isArray(permissions) &&
    permissions.some((perm) => perm.codename === "position");

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-xl shadow-md p-4 w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <RiUserReceived2Line className="w-4 h-4 text-[#D2042D]" />
          <h3 className="text-xs text-[#D2042D] font-bold font-iranSans mr-2">
            باشگاه ایساتیس
          </h3>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => navigate("/points/privileges")}
            className="flex items-center gap-1 text-[9px] text-[#D2042D] border border-[#D2042D] rounded-lg px-1 py-0.5 hover:bg-[#D2042D] hover:text-white transition-all duration-300"
          >
            <LuCoins className="w-2 h-2" />
            <span>امتیازات</span>
          </button>

          {hasPermission && (
            <button
              onClick={() => navigate("/rewards/table")}
              className="flex items-center gap-1 text-[9px] text-[#D2042D] border border-[#D2042D] rounded-lg px-1 py-0.5 hover:bg-[#D2042D] hover:text-white transition-all duration-300"
            >
              <MdCardGiftcard className="w-2 h-2" />
              <span>رفاهی</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="flex items-center justify-center w-full">
          <button
            onClick={() => navigate("/invitation/list")}
            className="text-xl font-bold text-[#A0001C] font-iranSans"
          >
            {invitedUserFiltered?.length || 0}
            <span className="text-[9px] text-[#D2042D] font-iranSans mx-1">
              نفر
            </span>
          </button>
          <button
            onClick={() => navigate("/points/missions")}
            className="flex flex-col ml-4"
          >
            <div className="flex items-center">
              <span className="text-[#A0001C] text-sm font-bold text-left">
                {formatNumber(remainPoints?.point_1)}
              </span>
              <LuCoins className="text-yellow-500 text-[12px] mx-1" />
              <span className="text-[9px] text-[#D2042D]">(سکه)</span>
            </div>
            <div className="flex items-center">
              <span className="text-[#A0001C] text-sm font-bold text-left">
                {formatNumber(remainPoints?.point_2)}
              </span>
              <TbSeeding className="text-green-500 text-[12px] mx-1" />
              <span className="text-[9px] text-[#D2042D]">(بذر)</span>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-auto pt-4 relative z-10">
        <div className="flex items-center gap-1 bg-[#ffffff] p-1 rounded-lg shadow-inner hover:bg-gray-100 transition-colors duration-200">
          <p className="flex-1 text-[9px] text-[#D2042D] font-iranSans truncate">
            {`my.isatispooya.com/login?rf=${
              invitedUserFilteredCode?.[0]?.code || ""
            }`}
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={`px-2 py-1 rounded-md text-[9px] font-medium transition-all duration-200 ${
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
        className="absolute bottom-0 left-0 w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ zIndex: 0 }}
      >
        <path
          fill="#A0001C"
          fillOpacity=".3"
          d="M0,160L34.3,165.3C68.6,171,137,181,206,192C274.3,203,343,213,411,197.3C480,181,549,139,617,144C685.7,149,754,203,823,224C891.4,245,960,235,1029,213.3C1097.1,192,1166,160,1234,144C1302.9,128,1371,128,1406,128L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
    </motion.div>
  );
};

export default DashboardMarketingStat;
