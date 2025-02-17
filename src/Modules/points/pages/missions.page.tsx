import { useNavigate } from "react-router-dom";
import MissionCard from "../feature/Mission/mission.card";
import { useMissions } from "../hooks";
import { server } from "../../../api";

const MissionsPage = () => {
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
          comming_soon: mission.comming_soon,
        }))
      : []),
  ];

  return (
    <div>
      <div>
        <div className="bg-white p-6 ">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            باشگاه مشتریان ایساتیس پویا
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
            شمامی‌توانید در باشگاه مشتریان ایساتیس پویا از طریق کارت‌های ماموریت
            برای خود سکه و بذر جمع‌آوری کرده و در بخش هدایا دارایی خود را به
            جایزه مورد نظر تبدیل کنید
          </p>
        </div>
      </div>
      <MissionCard missions={missionsData} />
    </div>
  );
};

export default MissionsPage;
