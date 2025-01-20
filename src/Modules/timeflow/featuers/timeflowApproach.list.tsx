import { server } from "../../../api";
import { useProfile } from "../../userManagment";
import { TimeFlowList } from "../components";

const TimeFlowApproachList = () => {
  const { data } = useProfile();

  const img = data?.profile_image;

  const items = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      amount: 8.5, // hours
      image: server + img,
      time: "9:00 AM - 5:30 PM",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      amount: 7.5,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      time: "8:30 AM - 4:00 PM",
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "m.chen@company.com",
      amount: 9,
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      time: "10:00 AM - 7:00 PM",
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma.w@company.com",
      amount: 8,
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      time: "9:30 AM - 5:30 PM",
    },
  ];
  return <TimeFlowList items={items} />;
};

export default TimeFlowApproachList;
