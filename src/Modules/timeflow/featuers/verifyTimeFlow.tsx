import { motion } from "framer-motion";
import { useTimeflow } from "../hooks";
import UserTimeflowVerify from "./userTimeflowVerify.list";
import ParentTimeFlowVerify from "./parentTimeFlowVerify.list";
import { UserLoginType } from "../types";

const VerifyTimeFlow: React.FC = () => {
  const { data: userLogin } = useTimeflow.useGetUsersLogin();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4"
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          ورود کاربر
        </h2>

        <UserTimeflowVerify userLogin={userLogin as UserLoginType} />

     
        <hr className="border-t-2 border-gray-300" />

        <h2 className="text-3xl font-bold text-center text-indigo-700">
          همکاران
        </h2>

        <ParentTimeFlowVerify userLogin={userLogin as UserLoginType} />
      </motion.div>
    </div>
  );
};

export default VerifyTimeFlow;
