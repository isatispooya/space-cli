import { Collapse, Ripple, initTWE } from "tw-elements";
import { RiMenuLine } from "react-icons/ri";
import { Avatar } from "../avatar";
import { motion } from "framer-motion";
import LogoWhite from "./Artboard 1 copy 17.png";
import { Position } from "../positions";
import { useState } from 'react'
import { useSidebarStore } from "../sidebar/sidebar.store";
initTWE({ Collapse, Ripple });

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { toggleSidebar } = useSidebarStore();

  return (
    <header>
      <nav
        dir="rtl"
        className="relative  shadow-2xl flex w-full items-center justify-between bg-gradient-to-r from-[#295270] to-[#524175] py-2  dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="flex items-center">
            <button
              className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200"
              type="button"
              onClick={toggleSidebar}
              aria-label="Toggle navigation"
            >
              <RiMenuLine className="text-white text-3xl" />
            </button>

            <div
              className="ml-4 max-w-xs h-14 flex items-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-lg font-semibold text-white dark:text-white"
                >
                  ایساتیس پویا
                </motion.span>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img src={LogoWhite}  className="h-12 w-12" />
                </motion.div>
              )}
            </div>
          </div>

          <div
            className="!visible hidden grow basis-[100%] items-center text-center lg:!flex lg:basis-auto lg:text-left"
            id="navbarSupportedContentY"
            data-twe-collapse-item
          ></div>

          <div className="flex items-center space-x-4">
            <Position />
            <Avatar />
          </div>
        </div>
      </nav>

    </header>
  );
};

export default Header;
