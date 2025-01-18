import { useNavigate } from "react-router-dom";
import MissionCard from "../components/mission.card";
import { useMissions } from "../hooks";
import { server } from "../../../api";

const Missions = () => {
  const navigate = useNavigate();

  const { data: missionss } = useMissions.useGetMissions();

  const missionsData = [
    ...(Array.isArray(missionss)
      ? missionss.map((mission) => ({
          point_2: mission.point_2,
          point_1: mission.point_1,
          display_name: mission.display_name || "Default Title",
          description: mission.description,
          onNavigate: () => {
            navigate("/");
          },
          image: server + mission.image,
          link: mission.link, 
          user_attempts: mission.user_attempts,
          id: mission.id,
          status: mission.status,
        }))
      : []),
  ];

  return (
    <div>
      <MissionCard missions={missionsData} />
    </div>
  );
};

export default Missions;
