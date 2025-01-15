import { Collapse, Ripple, initTWE } from "tw-elements";
import { Avatar } from "../avatar";
import { motion } from "framer-motion";
import LogoWhite from "../../assets/Artboard 1 copy 17.png";
import LogoText from "../../assets/textLogo.png";
import { useSidebarStore } from "../../Modules/sidebar/store/sidebar.store";
import { FiMenu } from "react-icons/fi";
import Badge from "@mui/material/Badge";
import { useState, useRef, useEffect } from "react";
import { useCorrespondencesData } from "../notification/hook/notification.get";
import Notification from "../notification/notification";
import { useNavigate } from "react-router-dom";
import { GiTwoCoins } from "react-icons/gi";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


initTWE({ Collapse, Ripple });

const Header = () => {
  const { toggleSidebar } = useSidebarStore();

  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationIconRef = useRef<SVGSVGElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { data: notifications } = useCorrespondencesData();
  const unreadCount =
    notifications?.filter((notification) => notification.read === false)
      .length ?? 0;
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
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
                <p
                  onClick={toggleSidebar}
                  className="text-4xl cursor-pointer text-blue-900 hover:text-blue-900 transition-colors duration-200"
                >
                  <FiMenu />
                </p>
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
          ></div>

          <Badge
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            badgeContent={unreadCount}
            color="error"
          >
            <NotificationsNoneIcon
              ref={notificationIconRef}
              onClick={toggleNotifications}
              sx={{
                transform: "scale(1.1)",
                transition: "transform 0.2s",
                borderRadius: "50%",
                fontSize: "2.2rem",
                cursor: "pointer",
                color: "#041685",
              }}
            />
          </Badge>

          <div
            style={{
              width: "2px",
              backgroundColor: "#eaeaea",
              height: "40px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          ></div>

          <div className="flex items-start justify-start ml-8 relative ">
            <div className="flex flex-col items-center">
              <span className="flex items-center text-white mr-2 mb-1">
                <span className="text-blue-900 text-sm font-bold">10,000</span>
                <GiTwoCoins
                  className="w-5 h-5 mr-1 ml-4 mb-1 text-5xl"
                  color="#f1c40f"
                />
              </span>
              <span className="flex items-center text-white mr-2">
                <span className="text-blue-900 text-sm font-bold">10,000</span>
                <GiTwoCoins
                  className="w-5 h-5 mr-1 ml-4 mb-1 text-1xl"
                  color="#707b7c"
                />
              </span>
            </div>

            {showNotifications && <Notification ref={notificationRef} />}
              <Avatar/>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
