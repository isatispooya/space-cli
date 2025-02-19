import { useTimeflow } from "../hooks";
import { TabComponent } from "../../../components";
import { ParentLeaveForm, UserLeaveView } from "../components";
import LeaveCreate from "../components/leaveCreate.form";
import { motion } from "framer-motion";

const Leave = () => {
  const { data: LeaveData, refetch } = useTimeflow.useGetLeave();

  const tabs = [
    {
      id: "leave",
      label: "مرخصی های کاربر",
      content: (
        <>
          <div className="mb-5 mt-5">
            <UserLeaveView
              leaveData={LeaveData || { other_logs: [], own_logs: [] }}
              refetch={refetch}
            />
          </div>

          <div>
            <ParentLeaveForm
              dataLeaveTimeFlow={LeaveData || { other_logs: [], own_logs: [] }}
              refetch={refetch}
            />
          </div>
        </>
      ),
    },
    {
      id: "leaveCreate",
      label: "ایجاد مرخصی",
      content: <LeaveCreate refetch={refetch} />,
    },
  ];

  return (
    <>
      <div
        className="flex flex-col items-center justify-center  px-4"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" p-8 w-full max-w-5xl space-y-6 "
        >
          <TabComponent tabs={tabs} />
        </motion.div>
      </div>
    </>
  );
};

export default Leave;
