import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import useProfile from "../../Modules/profile/hooks/useProfile";

const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const { data } = useProfile();

  const profileInfo = data
    ? {
        first_name: data.first_name || "",
        mobile: data.mobile || "",
      }
    : null;

  const tools = [
    {
      label: "sتنظیمات",
      href: "/settings",
      // render: <LoginForm />,
    },
    {
      label: "خروج",
      href: "/login",
    },
    {
      label: "درآمد",
      href: "/income",
      // render: <UserIncome />,
    },
  ];

  return (
    <div className="relative">
      <motion.div
        onClick={toggleDropdown}
        whileHover={{ scale: 1.1, rotate: 5, color: "#5677BC" , borderColor: "#5677BC" }}
        whileTap={{ scale: 0.9 }}
        className="text-2xl cursor-pointer text-[#5677BC] border-2 border-[#5677BC] rounded-xl p-1"
      >
        <CgProfile />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="userDropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            {profileInfo && (
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{profileInfo.first_name}</div>
                <div className="font-medium truncate">{profileInfo.mobile}</div>
              </div>
            )}
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {tools.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="py-1">
              <a
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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
