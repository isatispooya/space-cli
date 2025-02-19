import { motion } from "framer-motion";
import { useTimeflow } from "../hooks";
import { VerifyUser, VerifyParent, VerifyLogout } from "../components";
import { UserLoginType } from "../types";
import { Accordian } from "../../../components";
import { useState } from "react";
import { TabComponent } from "../../../components";

const Verify: React.FC = () => {
  const { data: userLogin } = useTimeflow.useGetUsersLogin();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenParent, setIsOpenParent] = useState(false);

  const tabs = [
    {
      id: "user",
      label: "ورود و خروج کاربر",
      content: (
        <>
          <div className="mb-5 mt-5">
            <Accordian
              title="ورود و خروج کاربر"
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
            >
              <VerifyUser userLogin={userLogin as UserLoginType} />
            </Accordian>
          </div>

          <Accordian
            title="ورود و خروج همکاران"
            isOpen={isOpenParent}
            onToggle={() => setIsOpenParent(!isOpenParent)}
          >
            <VerifyParent userLogin={userLogin as UserLoginType} />
          </Accordian>
        </>
      ),
    },
    {
      id: "parent",
      label: "ثبت خروج",
      content: (
        <div className="mb-5 mt-5">
          <VerifyLogout />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center  px-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" p-8 w-full max-w-5xl space-y-6 "
      >
        <TabComponent tabs={tabs} />
      </motion.div>
    </div>
  );
};

export default Verify;
