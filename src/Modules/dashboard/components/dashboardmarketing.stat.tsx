/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState, useMemo } from "react";
import { useInvitation } from "../../invitation/hooks";
import { RiUserReceived2Line } from "react-icons/ri";
import "moment/locale/fa";
import { useRemainPoints } from "../../points";
import { useNavigate } from "react-router-dom";
import { TbSeeding } from "react-icons/tb";
import { LuCoins } from "react-icons/lu";
import { useProfile } from "../../userManagment";
import { useUserPermissions } from "../../permissions";
import { MdCardGiftcard } from "react-icons/md";
import Card from "../../../components/cards/card";
import WaveEffect from "../../../ui/wave";
import "../../../ui/wave.css";
import { motion } from "framer-motion";

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

  const content = (
    <div className="flex flex-col h-full w-full p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <RiUserReceived2Line className="w-5 h-5 text-[#D2042D]" />
          <h3 className="text-sm text-[#D2042D] font-bold font-iranSans mr-2">
            باشگاه ایساتیس
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/points/privileges")}
            className="flex items-center gap-1 text-xs text-[#D2042D] border border-[#D2042D] rounded-lg px-2 py-1 hover:bg-[#D2042D] hover:text-white transition-all duration-300"
          >
            <LuCoins className="w-3 h-3" />
            <span>امتیازات</span>
          </button>

          {hasPermission && (
            <button
              onClick={() => navigate("/rewards/table")}
              className="flex items-center gap-1 text-xs text-[#D2042D] border border-[#D2042D] rounded-lg px-2 py-1 hover:bg-[#D2042D] hover:text-white transition-all duration-300"
            >
              <MdCardGiftcard className="w-3 h-3" />
              <span>رفاهی</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-full gap-12">
          <button
            onClick={() => navigate("/invitation/list")}
            className="text-4xl font-bold text-[#A0001C] font-iranSans"
          >
            {invitedUserFiltered?.length || 0}
            <span className="text-lg text-[#D2042D] font-iranSans mx-2">
              نفر
            </span>
          </button>
          <button
            onClick={() => navigate("/points/missions")}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center">
              <span className="text-2xl text-[#A0001C] font-bold text-left">
                {formatNumber(remainPoints?.point_1)}
              </span>
              <LuCoins className="text-yellow-500 text-xl mx-2" />
              <span className="text-lg text-[#D2042D]">(سکه)</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl text-[#A0001C] font-bold text-left">
                {formatNumber(remainPoints?.point_2)}
              </span>
              <TbSeeding className="text-green-500 text-xl mx-2" />
              <span className="text-lg text-[#D2042D]">(بذر)</span>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-auto relative z-10 w-full">
        <div className="flex items-center gap-2 bg-[#ffffff] p-2 rounded-lg shadow-inner hover:bg-gray-100 transition-colors duration-200">
          <p className="flex-1 text-xs text-[#D2042D] font-iranSans truncate">
            {`my.isatispooya.com/login?rf=${
              invitedUserFilteredCode?.[0]?.code || ""
            }`}
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              copied
                ? "bg-[#D2042D] text-[#ffffff]"
                : "bg-[#D2042D] text-white hover:bg-[#E57350]"
            }`}
          >
            {copied ? "کپی شد!" : "کپی لینک"}
          </motion.button>
        </div>
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
      footerSlot={<WaveEffect color="red" />}
    />
  );
};

export default DashboardMarketingStat;
