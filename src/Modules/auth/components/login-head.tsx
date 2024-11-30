// import React from "react";
import Logo from "../../../components/logo";
import { fadeIn } from "../animations/fadeIn";
import { motion } from "framer-motion";
import typo from "./گروه مالی@2x.png"

const LoginHead = () => {
  return (
    <div className="text-center">
      <motion.div {...fadeIn(0.6, 0, 0.5)} className="mx-auto w-20 md:w-36">
        <Logo positionSize="" />
      </motion.div>
      <motion.h4 {...fadeIn(0.8, -20)} className="mb-2  text-lg font-semibold">
        <img src={typo} alt="typo" />
      </motion.h4>
    </div>
  );
};

export default LoginHead;
