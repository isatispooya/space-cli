import { useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "../../Modules/userManagment/hooks/useProfile";
import { getCookie } from "../../api/cookie";
import useLogout from "./hooks/useLogout";
import { removeCookie } from "../../api/cookie";

const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: profileData } = useProfile();

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
      logout.mutate(refresh_token);
    }
    removeCookie("access_token");
    removeCookie("refresh_token");
  };

  return (
    <div
      onClick={toggleDropdown}
      className="flex items-center cursor-pointer border-2 border-gray-100 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 p-1 rounded-lg shadow-lg hover:bg-[#041685]/10 transition-all duration-300"
    >
      <span className="mr-4 ml-4 text-[#041685] font-semibold text-sm">
        {profileData?.first_name} {profileData?.last_name}
      </span>

      <div className="relative" ref={dropdownRef}>
        <motion.div
          whileHover={{
            scale: 1.05,
            rotate: 3,
            color: "#041685",
            borderColor: "#041685",
            boxShadow: "0 4px 12px #041685",
          }}
          whileTap={{ scale: 0.95 }}
          className="text-3xl cursor-pointer text-[#041685]  rounded-xl p-1 transition-all duration-300 hover:bg-[#041685]/10"
        >
          <CgProfile />
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="userDropdown"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute z-10 mt-3 left-0 bg-white divide-y divide-gray-100 rounded-xl shadow-lg w-48 backdrop-blur-sm border border-gray-100 overflow-hidden"
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
  );
};

export default Avatar;
