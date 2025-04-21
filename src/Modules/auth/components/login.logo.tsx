// import React from "react";
import Logo from "../../../components/common/logo/logo";
import { fadeIn } from "../animations/fadeIn";
import { motion } from "framer-motion";
import { maliText } from "@/assets";

const LoginHead = () => {
  return (
    <div className="text-center">
      <motion.div {...fadeIn(0.6, 0, 0.5)} className="mx-auto w-20 md:w-36">
        <Logo positionSize="" />
      </motion.div>
      <motion.h4
        {...fadeIn(0.8, -20)}
        className="mb-2  flex items-center justify-center  text-lg font-semibold"
      >
        <img src={maliText} alt="typo" className=" w-[250px]" />
      </motion.h4>
    </div>
  );
};

export default LoginHead;
