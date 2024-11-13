import React from "react";
import Logo from "../../../components/logo";
import { fadeIn } from "../animations/fadeIn";
import { motion } from "framer-motion";

const LoginHead = () => {
  return (
    <div className="text-center">
      <motion.div {...fadeIn(0.6, 0, 0.5)} className="mx-auto w-20 md:w-36">
        <Logo positionSize={null} />
      </motion.div>
      <motion.h4 {...fadeIn(0.8, -20)} className="mb-2  text-lg font-semibold">
        ایساتیس پویا
      </motion.h4>
    </div>
  );
};

export default LoginHead;
