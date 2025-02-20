import { useTimeflow } from "../hooks";
import { TabComponent } from "../../../components";
import { ParentMissionForm, UserMissionView } from "../components";
import MissionCreate from "../components/missionCreate.form";
import { motion } from "framer-motion";

const MissionTimeFlowList = () => {
  const { data: MissionData, refetch } = useTimeflow.useGetMission();

  const tabs = [
    {
      id: "mission",
      label: "ماموریت های کاربر",
      content: (
        <>
          <div className="mb-5 mt-5">
            <UserMissionView
              missionData={MissionData || { other_logs: [], own_logs: [] }}
              refetch={refetch}
            />
          </div>

          <div>
            <ParentMissionForm
              dataMissionTimeFlow={
                MissionData || { other_logs: [], own_logs: [] }
              }
              refetch={refetch}
            />
          </div>
        </>
      ),
    },
    {
      id: "missionCreate",
      label: "ایجاد ماموریت",
      content: <MissionCreate refetch={refetch} />,
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

export default MissionTimeFlowList;
