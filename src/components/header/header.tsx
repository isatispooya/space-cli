import { Collapse, Ripple, initTWE } from "tw-elements";
import { RiMenuLine } from "react-icons/ri";
import { Avatar } from "../avatar";
import { motion } from "framer-motion";
import LogoWhite from "./Artboard 1 copy 17.png";
import LogoText from "../textLogo.png";
import { useSidebarStore } from "../sidebar/sidebar.store";
initTWE({ Collapse, Ripple });

const Header = () => {
  const { toggleSidebar } = useSidebarStore();

  return (
    <header>
      <nav
        dir="rtl"
        className="relative  shadow-2xl flex w-full items-center justify-between bg-white py-2  dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200"
              type="button"
              onClick={toggleSidebar}
              aria-label="Toggle navigation"
            >
              <RiMenuLine className="text-[#02205F] text-3xl" />
            </motion.button>

            <div className="ml-4 max-w-xs h-14 flex items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <img src={LogoWhite} className="w-20" />
                <img src={LogoText} className=" w-40" />
              </motion.div>
            </div>
          </div>

          <div
            className="!visible hidden grow basis-[100%] items-center text-center lg:!flex lg:basis-auto lg:text-left"
            id="navbarSupportedContentY"
            data-twe-collapse-item
          ></div>

          <div className="flex items-center ml-8 space-x-4">
            <Avatar />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
