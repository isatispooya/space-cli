import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "../../Modules/userManagment/hooks/useProfile";

const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const { data } = useProfile();

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

  return (
    <div className="relative">
      <motion.div
        onClick={toggleDropdown}
        whileHover={{
          scale: 1.05,
          rotate: 3,
          color: "#5677BC",
          borderColor: "#5677BC",
          boxShadow: "0 4px 12px rgba(86, 119, 188, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        className="text-2xl cursor-pointer text-[#5677BC] border-2 border-[#5677BC] rounded-xl p-2 transition-all duration-300 hover:bg-[#5677BC]/10"
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
              <div className="px-4 py-3 text-sm bg-gradient-to-r from-[#29D2C7]/10 to-transparent">
                <div className="font-semibold text-gray-800">{`${profileInfo.first_name} ${profileInfo.last_name}`}</div>
              </div>
            )}
            <ul className="py-1 text-sm text-gray-700">
              {tools.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="block px-4 py-2.5 hover:bg-[#29D2C7]/10 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="py-1">
              <a
                href="/login"
                className="block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium"
              >
                خروج
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Avatar;
