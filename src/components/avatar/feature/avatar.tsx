import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "../../../Modules/userManagment/hooks/useProfile";
import { getCookie } from "../../../api/cookie";
import useLogout from "../hooks/useLogout";
import { removeCookie } from "../../../api/cookie";
import { Avatar } from "@mui/material";
import { server } from "../../../api/server";
import { identifyUser } from "../../../utils";
import { toast } from "react-hot-toast";
import VerifyLogoutPopup from "./verifyLogout.pop";
import { useNavigate } from "react-router-dom";
import { useUserPermissions } from "../../../Modules/permissions/hooks";
import { PiPlugsConnected } from "react-icons/pi";
import { TbPlugConnected } from "react-icons/tb";
import { StatusPositionType } from "../../../Modules/userManagment/types/profile.type";

const status : Record<StatusPositionType, { value: string; label: string; icon: JSX.Element; color: string }> = {
  login: { value: "login", label: "ورود", icon: <PiPlugsConnected />, color: "green" },
  logout: { value: "logout", label: "خروج", icon: <TbPlugConnected />, color: "red" },
  mission_start: { value: "mission_start", label: "ماموریت", icon: <TbPlugConnected />, color: "blue" },
  leave_start: { value: "leave_start", label: "مرخصی", icon: <TbPlugConnected />, color: "yellow" },
  mission_end: { value: "mission_end", label: "پایان ماموریت", icon: <TbPlugConnected />, color: "blue" },
  leave_end: { value: "leave_end", label: "پایان مرخصی", icon: <TbPlugConnected />, color: "yellow" }
};

const UserAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { data: profileData, isSuccess } = useProfile();
  const navigate = useNavigate();
  const { data: permissions } = useUserPermissions();
  const logout = useLogout();

  const Permissions = permissions || [];
  const hasPermission =
    Array.isArray(Permissions) &&
    Permissions.some((perm) => perm.codename === "position");

  const profileInfo = profileData
    ? {
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
      }
    : null;

  useEffect(() => {
    if (isSuccess) {
      identifyUser({
        customId: profileData?.uniqueIdentifier,
        friendlyName: profileData?.first_name + " " + profileData?.last_name,
      });
    }
  }, [isSuccess, profileData]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isPickerPopup =
        (event.target as Element)?.closest(".MuiPickersPopper-root") ||
        (event.target as Element)?.closest(".MuiDialog-root") ||
        (event.target as Element)?.closest(".MuiPaper-root") ||
        (event.target as Element)?.closest(".MuiPopover-root") ||
        (event.target as Element)?.closest(".MuiModal-root");

      if (isPickerPopup) {
        return;
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const tools = [
    {
      label: "تغییر رمز عبور",
      href: "/userManagement/changePassword",
    },
    {
      label: "پروفایل",
      href: "/userManagement/profile",
    },
    ...(hasPermission
      ? [
          {
            label: "ثبت تردد",
            href: "/timeflow/verify",
          },
        ]
      : []),
  ];

  const handleLogout = () => {
    const refresh_token = getCookie("refresh_token");
    if (refresh_token) {
      logout.mutate(refresh_token, {
        onSuccess: () => {
          removeCookie("access_token");
          removeCookie("refresh_token");
          toast.success("خروج با موفقیت انجام شد");
          navigate("/login");
        },
        onError: (error) => {
          toast.error("خطا در خروج از سیستم");
          console.error("خطای خروج:", error);
        },
      });
    } else {
      removeCookie("access_token");
      removeCookie("refresh_token");
      navigate("/login");
    }
  };

  return (
    <>
      <div
        onClick={toggleDropdown}
        className="flex items-center z-50 cursor-pointer border-2 border-gray-100 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 p-1 rounded-lg shadow-lg hover:bg-[#041685]/10 transition-all duration-300"
      >
        {window.innerWidth >= 768 ? (
          <span
            className="mr-4 ml-4 text-[#041685] font-semibold text-sm"
            style={{
              display: "inline-block",
              maxWidth: "100px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {profileData?.first_name && profileData?.first_name.length > 14
              ? `${profileData.first_name.slice(0, 14)}...`
              : profileData?.first_name}{" "}
            {profileData?.last_name}
          </span>
        ) : null}

        <div className="relative" ref={dropdownRef}>
          <Avatar
            alt="Remy Sharp"
            src={
              profileData?.profile_image
                ? server + profileData?.profile_image
                : undefined
            }
            sx={{ backgroundColor: "#041685" }}
          />

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="userDropdown"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute z-10 mt-3 left-0 bg-white divide-y divide-gray-100 rounded-xl shadow-lg w-48 border border-gray-100 overflow-hidden"
              >
                {profileInfo && (
                  <div className="px-4 py-3 text-sm bg-gradient-to-r from-[#041685]/10 to-transparent flex justify-between">
                    <div className="font-semibold text-gray-800">{`${profileInfo.first_name} ${profileInfo.last_name}`}</div>

                    {profileData?.status_position &&
                      status[profileData?.status_position] && (
                        <div
                          className="flex items-center gap-1 text-sm bg-white font-bold rounded-full p-1"
                          style={{
                            color: status[profileData.status_position].color,
                          }}
                        >
                          {status[profileData.status_position].icon}
                        </div>
                      )}
                  </div>
                )}

                <ul className="py-1 text-sm text-gray-700">
                  {tools.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="block px-4 py-2.5 hover:bg-[#041685]/10 transition-colors duration-200 font-medium"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="py-1">
                  <a
                    href="/login"
                    onClick={handleLogout}
                    className="block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium"
                  >
                    خروج
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <VerifyLogoutPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};

export default UserAvatar;
