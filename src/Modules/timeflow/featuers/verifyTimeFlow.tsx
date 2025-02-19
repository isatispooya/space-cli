import { motion } from "framer-motion";
import { useTimeflow } from "../hooks";
import UserTimeflowVerify from "./userTimeflowVerify.list";
import ParentTimeFlowVerify from "./parentTimeFlowVerify.list";
import { UserLoginType } from "../types";
import UserLogoutVerify from "./usersLogoutVerify.list";
import { Accordian } from "../../../components";
import { useState } from "react";

const VerifyTimeFlow: React.FC = () => {
  const { data: userLogin } = useTimeflow.useGetUsersLogin();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center  px-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-5xl space-y-6 border border-gray-300"
      >
        <Accordian
          title="ورود و خروج کاربر"
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        >
          <UserTimeflowVerify userLogin={userLogin as UserLoginType} />
        </Accordian>

        <hr className="border-t-2  border-gray-300" />

        <Accordian
          title="ورود و خروج همکاران"
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        >
          <ParentTimeFlowVerify userLogin={userLogin as UserLoginType} />
        </Accordian>
      </motion.div>
    </div>
  );
};

export default VerifyTimeFlow;
