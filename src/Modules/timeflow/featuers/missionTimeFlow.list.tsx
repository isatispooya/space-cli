import moment from "moment-jalaali";
import { useTimeflow } from "../hooks";
import { Forms } from "../../../components";

const MissionList = () => {
  const { mutate: postMissions } = useTimeflow.usePostMissions();

  const payload = {
    time_user_start: moment().format("YYYY-MM-DDTHH:mm:ss"),
    time_user_end: moment().format("YYYY-MM-DDTHH:mm:ss"),
  };

  const handlePostMissions = () => {
    postMissions(payload);
  };

  return <Forms onSubmit={handlePostMissions} />;
};

export default MissionList;
