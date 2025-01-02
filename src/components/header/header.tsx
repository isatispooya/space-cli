import { Collapse, Ripple, initTWE } from "tw-elements";
import { Avatar } from "../avatar";
import { motion } from "framer-motion";
import LogoWhite from "../../assets/Artboard 1 copy 17.png";
import LogoText from "../../assets/textLogo.png";


initTWE({ Collapse, Ripple });

const Header = () => {
  
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <img src={LogoWhite} className="w-20 hidden lg:block" alt="logo" />
                <img src={LogoText} className="w-40 hidden lg:block" alt="logo text" />
              </motion.div>
            </div>
          </div>

          <div
            className="!visible hidden grow basis-[100%] items-center text-center lg:!flex lg:basis-auto lg:text-left"
            id="navbarSupportedContentY"
            data-twe-collapse-item
          ></div>
          <h1 className="text-md  text-[#5677BC] ml-7">
            نرم افزار تحت وب ایساتیس من
          </h1>
          <div className="flex items-center ml-8 space-x-4">
            <Avatar />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
