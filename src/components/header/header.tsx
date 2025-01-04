import { Collapse, Ripple, initTWE } from "tw-elements";
import { Avatar } from "../avatar";
import { motion } from "framer-motion";
import LogoWhite from "../../assets/Artboard 1 copy 17.png";
import LogoText from "../../assets/textLogo.png";
import { useSidebarStore } from "../../Modules/sidebar/store/sidebar.store";
import { FiMenu } from "react-icons/fi";
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState, useRef, useEffect } from 'react';
import { useCorrespondencesData } from '../notification/hook/notification.get';
import Notification from '../notification/notification';

initTWE({ Collapse, Ripple });

const Header = () => {
  const { toggleSidebar } = useSidebarStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationIconRef = useRef<SVGSVGElement>(null);
  const { data: notifications } = useCorrespondencesData();
  const unreadCount = notifications?.filter(notification => notification.read === false).length ?? 0;
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (notificationIconRef.current && !notificationIconRef.current.contains(event.target as Node)) {
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
        className="relative shadow-2xl flex w-full items-center justify-between bg-white py-2 dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="flex items-center">
            <div className="max-w-xs h-14 flex items-center">
              <div className="flex h-full items-center justify-center m-4">
                <p
                  onClick={toggleSidebar}
                  className="text-4xl cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <FiMenu />
                </p>
              </div>
              <div className=" max-w-xs h-14 flex items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <img
                    src={LogoWhite}
                    className="w-20 hidden lg:block"
                    alt="logo"
                  />
                  <img
                    src={LogoText}
                    className="w-40 hidden lg:block"
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
          >

            
          </div>
          
          <h1 className="text-md  text-[#5677BC] ml-7">
            نرم افزار تحت وب ایساتیس من
          </h1>
          <div className="flex items-center ml-8 space-x-4 relative">
            <Badge 
              sx={{
                position: "relative", 
                zIndex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }} 
              badgeContent={unreadCount} 
              color="primary"
            >
              <NotificationsNoneIcon
                ref={notificationIconRef}
                onClick={toggleNotifications}
                sx={{
                  transform: "scale(1.1)",
                  transition: "transform 0.2s", 
                  borderRadius: "50%",
                  padding: "2px",
                  fontSize: "2.3rem",
                  cursor: "pointer",
                  color: "#5677BC",
                  marginLeft: "10px"
                }}
              />
            </Badge>
            {showNotifications && (
              <Notification />
            )}
            <Avatar />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
