import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "../../Modules/userManagment/hooks/useProfile";
import { getCookie } from "../../api/cookie";
import useLogout from "./hooks/useLogout";
import { removeCookie } from "../../api/cookie";
import { Avatar } from "@mui/material";
import { server } from "../../api/server";
import { identifyUser } from "../../utils";
import { toast } from "react-hot-toast";
import Stories from "stories-react";
import "stories-react/dist/index.css";

const UserAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: profileData, isSuccess } = useProfile();
  const [showStories, setShowStories] = useState(false);

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

  const handleStoriesEnd = () => {
    setShowStories(false);
  };

  const storyData = [
    {
      url: profileData?.profile_image ? server + profileData.profile_image : "",
      type: "image",
      duration: 5000,
      heading: `${profileData?.first_name} ${profileData?.last_name}`,
      subheading: "هم اکنون",
      profileImage: profileData?.profile_image
        ? server + profileData.profile_image
        : "",
    },
    {
      url: profileData?.profile_image ? server + profileData.profile_image : "",
      type: "image",
      duration: 5000,
      heading: `${profileData?.first_name} ${profileData?.last_name}`,
      subheading: "هم اکنون",
      profileImage: profileData?.profile_image
        ? server + profileData.profile_image
        : "",
    },

    {
      url: profileData?.profile_image ? server + profileData.profile_image : "",
      type: "image",
      duration: 5000,
      heading: `${profileData?.first_name} ${profileData?.last_name}`,
      subheading: "هم اکنون",
      profileImage: profileData?.profile_image
        ? server + profileData.profile_image
        : "",
    },
  ];

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
          <div
            style={{
              border: "3px solid #e1306c",
              borderRadius: "50%",
              padding: "2px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowStories(true);
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={
                profileData?.profile_image
                  ? server + profileData?.profile_image
                  : undefined
              }
              sx={{ backgroundColor: "#041685" }}
            />
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="userDropdown"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute z-10 mt-3 left-0 bg-white divide-y divide-gray-100 rounded-xl shadow-lg w-48  border border-gray-100 overflow-hidden"
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

      {showStories && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <button
              onClick={() => setShowStories(false)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "10px",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                zIndex: 1001,
              }}
            >
              ✕
            </button>
            <Stories
              stories={storyData}
              width="100%"
              height="600px"
              defaultInterval={5000}
              onAllStoriesEnd={handleStoriesEnd}
              storyStyles={{
                borderRadius: "8px",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserAvatar;
