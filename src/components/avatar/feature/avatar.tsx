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

const UserAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // New state for popup
  const dropdownRef = useRef(null);
  const { data: profileData, isSuccess } = useProfile();

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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsPopupOpen(false); // Close popup when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { data } = useProfile();
  const logout = useLogout();

  const profileInfo = data
    ? {
        first_name: data.first_name || "",
        last_name: data.last_name || "",
      }
    : null;

  const tools = [
    {
      label: "تغییر رمز عبور",
      href: "/userManagement/changePassword",
    },
    {
      label: "پروفایل",
      href: "/userManagement/profile",
    },
    {
      label: "ثبت زمان خروج",
      href: "#", // Changed to "#" to prevent navigation
      onClick: () => setIsPopupOpen(true), // Trigger popup
    },
  ];

  const handleLogout = () => {
    const refresh_token = getCookie("refresh_token");
    if (refresh_token) {
      logout.mutate(refresh_token, {
        onSuccess: () => {
          removeCookie("access_token");
          removeCookie("refresh_token");
          toast.success("خروج با موفقیت انجام شد");
        },
        onError: (error) => {
          toast.error("خطا در خروج از سیستم");
          console.error("خطای خروج:", error);
        },
      });
    } else {
      removeCookie("access_token");
      removeCookie("refresh_token");
    }
  };

  return (
    <>
      <div
        onClick={toggleDropdown}
        className="flex items-center cursor-pointer border-2 border-gray-100 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 p-1 rounded-lg shadow-lg hover:bg-[#041685]/10 transition-all duration-300"
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
                  <div className="px-4 py-3 text-sm bg-gradient-to-r from-[#041685]/10 to-transparent">
                    <div className="font-semibold text-gray-800">{`${profileInfo.first_name} ${profileInfo.last_name}`}</div>
                  </div>
                )}
                <ul className="py-1 text-sm text-gray-700">
                  {tools.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        onClick={item.onClick} // Add onClick handler
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

      {/* Popup for "ثبت زمان خروج" */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                ثبت زمان خروج
              </h2>
              <p className="text-gray-600 mb-4">
                آیا مطمئن هستید که می‌خواهید زمان خروج خود را ثبت کنید؟
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  لغو
                </button>
                <button
                  onClick={() => {
                    // Add your logout time registration logic here
                    toast.success("زمان خروج با موفقیت ثبت شد");
                    setIsPopupOpen(false);
                  }}
                  className="px-4 py-2 bg-[#041685] text-white rounded hover:bg-[#041685]/90 transition-colors"
                >
                  ثبت
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserAvatar;