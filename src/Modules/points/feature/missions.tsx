import { useNavigate } from "react-router-dom";
import MissionCard from "../components/mission.card";
import logo from "../../../assets/logo.png";

const Missions = () => {
  const navigate = useNavigate();

  const missions = [
    {
      image: logo,
      pointsType: "Points",
      description: "This is a mission to earn points",
      onNavigate: () => {
        navigate("/");
      },
    },
  ];
  return (
    <div>
      <MissionCard missions={missions} />
      aaaaa
    </div>
  );
};

export default Missions;
