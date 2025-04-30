import { Collapse, Ripple, initTWE } from "tw-elements";
import { UserAvatar } from "../../avatar";
import { motion } from "framer-motion";
import { maliTextLogo } from "@/assets";
import { useSidebarStore } from "../../../Modules/sidebar/store/sidebar.store";
import { FiMenu } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { useRemainPoints } from "../../../Modules/points";
import NotificationComponent from "../../notification/notification";
import { TbSeeding } from "react-icons/tb";
import { LuCoins } from "react-icons/lu";
import { CiStreamOn } from "react-icons/ci";
import { useLiveStream } from "../../../Modules/live/hooks";


initTWE({ Collapse, Ripple });

const Header = () => {
  const { toggleSidebar } = useSidebarStore();

  const { data: liveStream } = useLiveStream.useLiveStream();



  const ShowLiveStream = liveStream?.status;

  const { data: remainPoints } = useRemainPoints();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationIconRef = useRef<SVGSVGElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return "";
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationIconRef.current &&
      !notificationIconRef.current.contains(event.target as Node) &&
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav
        dir="rtl"
        className="relative shadow-2xl flex w-full items-center justify-between bg-white py-2 text-white lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="flex items-center">
            <div className="max-w-xs h-14 flex items-center">
              <div className="flex bg- h-full items-center justify-center  ">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleSidebar}
                  className="text-4xl tour-dashboard-menu lg:text-4xl md:text-3xl xs:text-2xl cursor-pointer text-blue-900 hover:text-blue-900 transition-colors duration-200"
                >
                  <FiMenu />
                </motion.div>
              </div>
              <div className="max-w-xs h-14 flex items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  
                  <img
                    src={maliTextLogo}
                    className="w-40 hidden lg:block mr-2"
                    alt="logo text"
                  />
                </motion.div>
              </div>
            </div>
          </div>
          <div
            className="!visible hidden grow basis-[100%] items-center text-center lg:!flex lg:basis-auto lg:text-left"
            id="navbarSupportedContentY"
            data-twe-collapse-item
          ></div>
          <div className="flex items-center justify-start relative xs:mr-1 lg:mx-4">
            {ShowLiveStream && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mr-10  cursor-pointer flex items-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                onClick={() => navigate("/stream")}
              >
                <CiStreamOn className="text-red-500 text-3xl cursor-pointer" />
                <span className="text-blue-900 text-sm font-bold">
                  {liveStream?.title}
                </span>
              </motion.div>
            )}

            <div className="mr-5">
              {showNotifications && (
                <NotificationComponent ref={notificationRef} />
              )}
            </div>
            <div className="flex flex-col items-end hover:cursor-pointer tour-header-points">
              <Tooltip title="سکه" placement="bottom" arrow>
                <span
                  className="flex items-center text-white mb-1"
                  onClick={() => navigate("/points/privileges")}
                >
                  <span className="text-blue-900 text-sm font-bold">
                    {formatNumber(remainPoints?.point_1)}
                  </span>
                  <LuCoins className="text-yellow-500 text-[25px] font-bold  ml-2" />
                </span>
              </Tooltip>

              <Tooltip title="بذر" placement="bottom" arrow>
                <span
                  className="flex items-center text-white"
                  onClick={() => navigate("/points/privileges")}
                >
                  <span className="text-blue-900 text-sm font-bold">
                    {formatNumber(remainPoints?.point_2)}
                  </span>
                  <TbSeeding className="text-green-500 text-[25px] font-bold ml-2" />
                </span>
              </Tooltip>
            </div>

            <div className="flex items-center tour-header-profile">
              <UserAvatar />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
